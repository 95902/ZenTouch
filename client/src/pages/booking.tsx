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
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Calendar from "@/components/booking/calendar";
import { CalendarIcon, Clock } from "lucide-react";

export default function Booking() {
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
      serviceId: "",
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
      // Invalidate availability query to refresh available slots
      queryClient.invalidateQueries({ queryKey: ["/api/appointments/availability"] });
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
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-light text-charcoal mb-6" data-testid="text-booking-title">
              Réserver votre séance
            </h1>
            <p className="text-lg text-charcoal/70" data-testid="text-booking-description">
              Choisissez votre créneau et votre prestation en quelques clics
            </p>
          </div>

          <div className="bg-offwhite rounded-2xl p-8 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Calendar and Time Selection */}
              <div>
                <h3 className="text-xl font-medium text-charcoal mb-4 flex items-center" data-testid="text-calendar-title">
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
                    <h3 className="text-xl font-medium text-charcoal mb-4 flex items-center" data-testid="text-timeslots-title">
                      <Clock className="mr-2" size={20} />
                      Créneaux disponibles
                    </h3>
                    {availabilityLoading ? (
                      <div className="text-charcoal/60" data-testid="loading-timeslots">Chargement des créneaux...</div>
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
                            data-testid={`button-timeslot-${time.replace(':', '')}`}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    )}
                    {availability?.availableSlots.length === 0 && (
                      <p className="text-charcoal/60" data-testid="text-no-slots">
                        Aucun créneau disponible pour cette date.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Booking form */}
              <div>
                <h3 className="text-xl font-medium text-charcoal mb-4" data-testid="text-booking-form-title">
                  Vos informations
                </h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="form-booking">
                    <FormField
                      control={form.control}
                      name="serviceId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prestation</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-service">
                                <SelectValue placeholder="Choisissez une prestation" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services?.map((service) => (
                                <SelectItem 
                                  key={service.id} 
                                  value={service.id}
                                  data-testid={`option-service-${service.id}`}
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
                                data-testid="input-booking-first-name"
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
                                data-testid="input-booking-last-name"
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
                              data-testid="input-booking-email"
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
                              data-testid="input-booking-phone"
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
                              data-testid="textarea-booking-comments"
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
                      data-testid="button-confirm-booking"
                    >
                      {bookingMutation.isPending ? "Confirmation en cours..." : "Confirmer le rendez-vous"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
