import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle, MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import ServicesCarousel from "@/components/services/services-carousel";
import BookingModal from "@/components/booking/booking-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactMessageSchema } from "@shared/schema";
import type { InsertContactMessage, Service } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>();
  const { toast } = useToast();

  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const categories = [
    {
      id: "relaxation",
      name: "Relaxation",
      description: "Massages doux et apaisants pour une détente profonde et la libération du stress quotidien."
    },
    {
      id: "therapeutic", 
      name: "Thérapeutique",
      description: "Soins spécialisés pour soulager les douleurs, tensions chroniques et améliorer la mobilité."
    },
    {
      id: "specialty",
      name: "Spécialisés",
      description: "Techniques traditionnelles et adaptées aux besoins spécifiques de chaque client."
    }
  ];

  const certifications = [
    "Diplôme École Française de Massage (2018)",
    "Formation Massage Prénatal (2019)",
    "Certification Aromathérapie (2020)",
    "Formation Continue Techniques Ayurvédiques (2022)"
  ];

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

  const onContactSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  const handleBookService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Listen for booking events from header
  useEffect(() => {
    const handleOpenBooking = () => {
      setIsBookingOpen(true);
    };

    window.addEventListener('openBooking', handleOpenBooking);
    return () => window.removeEventListener('openBooking', handleOpenBooking);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section id="accueil" className="min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-light text-charcoal mb-6 leading-tight" data-testid="hero-title">
              Retrouvez votre <span className="text-sage font-medium">équilibre</span> intérieur
            </h1>
            <p className="text-lg text-charcoal/70 mb-8 leading-relaxed" data-testid="hero-description">
              Masseuse professionnelle certifiée, je vous accompagne dans votre quête de bien-être à travers des massages personnalisés dans un cadre apaisant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-sage text-white px-8 py-4 rounded-full hover:bg-sage/90 transition-all duration-300 transform hover:scale-105"
                data-testid="hero-book-button"
              >
                Prendre rendez-vous
              </Button>
              <Button 
                variant="outline" 
                onClick={() => scrollToSection('prestations')}
                className="border-sage text-sage px-8 py-4 rounded-full hover:bg-sage hover:text-white transition-all duration-300"
                data-testid="hero-services-button"
              >
                Découvrir mes prestations
              </Button>
            </div>
          </div>
          <div className="animate-slide-up">
            <img 
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Marie Dubois, masseuse professionnelle" 
              className="rounded-2xl shadow-2xl w-full h-auto"
              data-testid="hero-image"
            />
          </div>
        </div>
      </section>

      {/* Services Section with Carousel */}
      <section id="prestations" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-charcoal mb-6" data-testid="services-title">
              Mes Prestations
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto" data-testid="services-description">
              Chaque massage est adapté à vos besoins spécifiques pour une expérience unique de détente et de régénération.
            </p>
          </div>
          
          {servicesLoading ? (
            <div className="text-center text-charcoal/60" data-testid="services-loading">
              Chargement des prestations...
            </div>
          ) : services ? (
            <ServicesCarousel 
              services={services} 
              categories={categories}
              onBook={handleBookService}
            />
          ) : (
            <div className="text-center text-charcoal/60" data-testid="services-error">
              Erreur lors du chargement des prestations
            </div>
          )}

          <div className="text-center mt-12">
            <Button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-sage text-white px-8 py-4 rounded-full hover:bg-sage/90 transform hover:scale-105 transition-all duration-300"
              data-testid="services-book-button"
            >
              Réserver maintenant
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="a-propos" className="py-20 bg-gradient-to-br from-lavender/10 to-cream/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800" 
                alt="Marie Dubois, masseuse certifiée" 
                className="rounded-2xl shadow-2xl w-full h-auto"
                data-testid="about-image"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-charcoal mb-6" data-testid="about-title">
                À propos de Marie
              </h2>
              <div className="space-y-6 text-charcoal/80 leading-relaxed">
                <p data-testid="about-paragraph-1">
                  Diplômée de l'École Française de Massage depuis 2018, je me suis spécialisée dans les techniques de relaxation et de bien-être. Ma passion pour le massage est née d'une conviction profonde : chaque personne mérite de prendre soin d'elle-même.
                </p>
                <p data-testid="about-paragraph-2">
                  Formée aux techniques suédoises, californiennes et ayurvédiques, j'adapte chaque séance selon vos besoins spécifiques. Mon approche holistique considère la personne dans sa globalité, pour un équilibre retrouvé entre corps et esprit.
                </p>
                <p data-testid="about-paragraph-3">
                  Dans mon cabinet chaleureux et apaisant, je vous reçois dans le respect de votre intimité et de votre rythme, pour un moment uniquement dédié à votre bien-être.
                </p>
              </div>
              
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-medium text-charcoal" data-testid="certifications-title">Certifications</h3>
                <ul className="space-y-2 text-charcoal/70" data-testid="certifications-list">
                  {certifications.map((cert, index) => (
                    <li key={index} className="flex items-center" data-testid={`certification-${index}`}>
                      <CheckCircle className="text-sage mr-3" size={20} />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-charcoal mb-6" data-testid="philosophy-title">
              Ma Philosophie
            </h2>
            <p className="text-lg text-charcoal/70 max-w-3xl mx-auto leading-relaxed" data-testid="philosophy-description">
              Je crois profondément que le bien-être est un droit, pas un luxe. Mon objectif est de créer un espace sûr où vous pouvez vous reconnecter avec votre corps et retrouver votre équilibre naturel.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6" data-testid="philosophy-respect">
              <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤲</span>
              </div>
              <h3 className="text-xl font-medium text-charcoal mb-3" data-testid="respect-title">Respect</h3>
              <p className="text-charcoal/70" data-testid="respect-description">
                Chaque séance respecte votre rythme, vos limites et vos préférences personnelles.
              </p>
            </div>

            <div className="text-center p-6" data-testid="philosophy-expertise">
              <div className="w-16 h-16 bg-lavender/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-medium text-charcoal mb-3" data-testid="expertise-title">Expertise</h3>
              <p className="text-charcoal/70" data-testid="expertise-description">
                Formation continue et techniques adaptées pour vous offrir le meilleur soin possible.
              </p>
            </div>

            <div className="text-center p-6" data-testid="philosophy-serenity">
              <div className="w-16 h-16 bg-cream/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧘‍♀️</span>
              </div>
              <h3 className="text-xl font-medium text-charcoal mb-3" data-testid="serenity-title">Sérénité</h3>
              <p className="text-charcoal/70" data-testid="serenity-description">
                Un environnement paisible et apaisant pour favoriser votre détente complète.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-sage/5 to-lavender/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-charcoal mb-6" data-testid="contact-title">Contact</h2>
            <p className="text-lg text-charcoal/70" data-testid="contact-description">N'hésitez pas à me contacter pour toute question</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg" data-testid="contact-info-card">
                <h3 className="text-xl font-medium text-charcoal mb-6" data-testid="contact-info-title">Informations pratiques</h3>
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
              <div className="bg-white rounded-2xl p-8 shadow-lg" data-testid="contact-form-card">
                <h3 className="text-xl font-medium text-charcoal mb-6" data-testid="contact-form-title">Envoyez-moi un message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onContactSubmit)} className="space-y-4" data-testid="contact-form">
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
                                data-testid="contact-first-name"
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
                                data-testid="contact-last-name"
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
                              data-testid="contact-email-input"
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
                              data-testid="contact-subject"
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
                              data-testid="contact-message"
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
                      data-testid="contact-submit"
                    >
                      {contactMutation.isPending ? "Envoi en cours..." : "Envoyer le message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl p-8 shadow-lg" data-testid="map-card">
              <h3 className="text-xl font-medium text-charcoal mb-6" data-testid="map-title">Localisation</h3>
              <div className="bg-sage/10 rounded-xl h-96 flex items-center justify-center text-charcoal/60" data-testid="map-placeholder">
                <div className="text-center">
                  <MapPin className="text-4xl text-sage mb-4 mx-auto" size={48} />
                  <p data-testid="map-label">Plan Google Maps</p>
                  <p className="text-sm mt-2" data-testid="map-address">15 rue de la Paix, 75001 Paris</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <a 
                  href="https://maps.google.com/?q=15+rue+de+la+paix+paris" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sage hover:text-sage/80 transition-colors"
                  data-testid="google-maps-link"
                >
                  <ExternalLink className="mr-2" size={16} />
                  Ouvrir dans Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedServiceId(undefined);
        }}
        preselectedServiceId={selectedServiceId}
      />
    </div>
  );
}
