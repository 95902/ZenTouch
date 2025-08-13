import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAppointmentSchema } from "@shared/schema";
import type { InsertAppointment, Service } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Calendar from "./calendar";
import { CalendarIcon, Clock, X } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export default function BookingModal({ isOpen, onClose, preselectedServiceId }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: availability, isLoading: availabilityLoading } = useQuery<{ availableSlots: string[] }>({
    queryKey: ["/api/appointments/availability", selectedDate],
    enabled: !!selectedDate,
  });

  const form = useForm<InsertAppointment>({
    resolver: zodResolver(insertAppointmentSchema),
    defaultValues: {
      serviceId: preselectedServiceId || "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      comments: null,
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: InsertAppointment) => {
      return await apiRequest("POST", "/api/appointments", data);
    },
    onSuccess: () => {
      toast({
        title: "Rendez-vous confirmé",
        description: "Votre rendez-vous a été confirmé avec succès. Vous recevrez un email de confirmation.",
      });
      form.reset();
      setSelectedDate("");
      setSelectedTime("");
      queryClient.invalidateQueries({ queryKey: ["/api/appointments/availability"] });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la réservation.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertAppointment) => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez sélectionner une date et un créneau horaire.",
        variant: "destructive",
      });
      return;
    }

    const bookingData = {
      ...data,
      date: selectedDate,
      time: selectedTime,
    };

    bookingMutation.mutate(bookingData);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime("");
    form.setValue("date", date);
    form.setValue("time", "");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    form.setValue("time", time);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="booking-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-charcoal" data-testid="booking-modal-title">
            Réserver votre séance
          </DialogTitle>
          <DialogDescription data-testid="booking-modal-description">
            Choisissez votre créneau et votre prestation en quelques clics
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar and Time Selection */}
          <div>
            <h3 className="text-xl font-medium text-charcoal mb-4 flex items-center" data-testid="calendar-section-title">
              <CalendarIcon className="mr-2" size={20} />
              Choisir une date
            </h3>
            <Calendar 
              selectedDate={selectedDate} 
              onDateSelect={handleDateSelect} 
            />

            {/* Time slots */}
            {selectedDate && (
              <div className="mt-6">
                <h3 className="text-xl font-medium text-charcoal mb-4 flex items-center" data-testid="timeslots-section-title">
                  <Clock className="mr-2" size={20} />
                  Créneaux disponibles
                </h3>
                {availabilityLoading ? (
                  <div className="text-charcoal/60" data-testid="loading-availability">Chargement des créneaux...</div>
                ) : (
                  <div className="grid grid-cols-3 gap-2" data-testid="timeslots-grid">
                    {availability?.availableSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => handleTimeSelect(time)}
                        className={`text-sm ${
                          selectedTime === time 
                            ? "bg-sage text-white" 
                            : "border-sage/30 hover:bg-sage hover:text-white"
                        }`}
                        data-testid={`timeslot-${time.replace(':', '')}`}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}
                {availability?.availableSlots.length === 0 && (
                  <p className="text-charcoal/60" data-testid="no-slots-message">
                    Aucun créneau disponible pour cette date.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Booking form */}
          <div>
            <h3 className="text-xl font-medium text-charcoal mb-4" data-testid="form-section-title">
              Vos informations
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="booking-form">
                <FormField
                  control={form.control}
                  name="serviceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prestation</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="service-select">
                            <SelectValue placeholder="Choisissez une prestation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services?.map((service) => (
                            <SelectItem 
                              key={service.id} 
                              value={service.id}
                              data-testid={`service-option-${service.id}`}
                            >
                              {service.name} ({service.price}€)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Votre prénom" 
                            {...field}
                            data-testid="first-name-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Votre nom" 
                            {...field}
                            data-testid="last-name-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="votre@email.com" 
                          {...field}
                          data-testid="email-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel"
                          placeholder="06 12 34 56 78" 
                          {...field}
                          data-testid="phone-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commentaires (optionnel)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Précisions, allergies, préférences..."
                          className="h-20 resize-none"
                          {...field}
                          value={field.value || ""}
                          data-testid="comments-textarea"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-sage text-white hover:bg-sage/90 transition-colors"
                  disabled={bookingMutation.isPending || !selectedDate || !selectedTime}
                  data-testid="confirm-booking-button"
                >
                  {bookingMutation.isPending ? "Confirmation en cours..." : "Confirmer le rendez-vous"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}