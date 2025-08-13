import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ServiceCard from "@/components/services/service-card";
import type { Service } from "@shared/schema";

export default function Services() {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  if (error) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center" data-testid="error-services">
          <h2 className="text-2xl font-semibold text-charcoal mb-4">Erreur de chargement</h2>
          <p className="text-charcoal/70">Impossible de charger les prestations. Veuillez réessayer plus tard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Header Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-light text-charcoal mb-6" data-testid="text-services-page-title">
              Mes Prestations
            </h1>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto" data-testid="text-services-page-description">
              Chaque massage est adapté à vos besoins spécifiques pour une expérience unique de détente et de régénération.
            </p>
          </div>
          
          {/* Services Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-offwhite rounded-2xl p-8 shadow-lg" data-testid={`skeleton-service-${i}`}>
                  <Skeleton className="w-full h-48 rounded-xl mb-6" />
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="services-grid">
              {services?.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-br from-lavender/10 to-cream/10 rounded-2xl p-8" data-testid="cta-section">
              <h3 className="text-2xl font-medium text-charcoal mb-4" data-testid="text-cta-title">
                Prêt(e) à réserver votre moment de détente ?
              </h3>
              <p className="text-charcoal/70 mb-6" data-testid="text-cta-description">
                Choisissez votre créneau et profitez d'un massage personnalisé dans un cadre apaisant.
              </p>
              <Link href="/booking" data-testid="button-cta-booking">
                <Button className="bg-sage text-white px-8 py-4 rounded-full hover:bg-sage/90 transform hover:scale-105 transition-all duration-300">
                  Réserver maintenant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
