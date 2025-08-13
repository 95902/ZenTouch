import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema } from "@shared/schema";
import type { InsertContactMessage } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message envoyé",
        description: "Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "15 rue de la Paix\n75001 Paris",
      testId: "contact-address"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "01 42 86 17 25",
      testId: "contact-phone"
    },
    {
      icon: Mail,
      title: "Email",
      content: "marie.dubois@massage-paris.fr",
      testId: "contact-email"
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Lun - Ven: 9h00 - 19h00\nSamedi: 9h00 - 16h00\nDimanche: Fermé",
      testId: "contact-hours"
    }
  ];

  return (
    <div className="pt-20">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-br from-sage/5 to-lavender/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-light text-charcoal mb-6" data-testid="text-contact-title">Contact</h1>
            <p className="text-lg text-charcoal/70" data-testid="text-contact-description">N'hésitez pas à me contacter pour toute question</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg" data-testid="card-contact-info">
                <h3 className="text-xl font-medium text-charcoal mb-6" data-testid="text-practical-info-title">Informations pratiques</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start" data-testid={info.testId}>
                      <info.icon className="text-sage text-xl mr-4 mt-1" size={20} />
                      <div>
                        <p className="font-medium text-charcoal" data-testid={`${info.testId}-title`}>{info.title}</p>
                        <p className="text-charcoal/70 whitespace-pre-line" data-testid={`${info.testId}-content`}>{info.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-lg" data-testid="card-contact-form">
                <h3 className="text-xl font-medium text-charcoal mb-6" data-testid="text-contact-form-title">Envoyez-moi un message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="form-contact">
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
                                data-testid="input-first-name"
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
                                data-testid="input-last-name"
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
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sujet</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Sujet de votre message" 
                              {...field}
                              data-testid="input-subject"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Votre message"
                              className="h-32 resize-none"
                              {...field}
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-sage text-white hover:bg-sage/90 transition-colors"
                      disabled={contactMutation.isPending}
                      data-testid="button-submit-contact"
                    >
                      {contactMutation.isPending ? "Envoi en cours..." : "Envoyer le message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl p-8 shadow-lg" data-testid="card-map">
              <h3 className="text-xl font-medium text-charcoal mb-6" data-testid="text-map-title">Localisation</h3>
              <div className="bg-sage/10 rounded-xl h-96 flex items-center justify-center text-charcoal/60" data-testid="map-placeholder">
                <div className="text-center">
                  <MapPin className="text-4xl text-sage mb-4 mx-auto" size={48} />
                  <p data-testid="text-map-label">Plan Google Maps</p>
                  <p className="text-sm mt-2" data-testid="text-map-address">15 rue de la Paix, 75001 Paris</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <a 
                  href="https://maps.google.com/?q=15+rue+de+la+paix+paris" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sage hover:text-sage/80 transition-colors"
                  data-testid="link-google-maps"
                >
                  <ExternalLink className="mr-2" size={16} />
                  Ouvrir dans Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
