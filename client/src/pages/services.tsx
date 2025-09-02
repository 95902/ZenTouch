import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ServiceCard from "@/components/services/service-card";
import type { Service } from "@shared/schema";

export default function Services() {
  // Données de services statiques pour le développement
  const staticServices: Service[] = [
    {
      id: "1",
      name: "Chi Nei Tsang",
      description: "Technique ancestrale chinoise de massage abdominal pour libérer les émotions et harmoniser l'énergie vitale.",
      duration: 60,
      price: 85,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      category: "relaxation"
    },
    {
      id: "2",
      name: "Massage du Visage",
      description: "Soin du visage relaxant et anti-âge. Techniques douces pour détendre les muscles faciaux.",
      duration: 45,
      price: 65,
      image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      category: "relaxation"
    },
    {
      id: "3",
      name: "La Trame",
      description: "Technique douce de libération des mémoires corporelles et émotionnelles.",
      duration: 75,
      price: 95,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      category: "relaxation"
    },
    {
      id: "4",
      name: "Massage Thaï Traditionnel",
      description: "Technique ancestrale thaïlandaise combinant acupression, étirements et mobilisations articulaires.",
      duration: 90,
      price: 100,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      category: "thai"
    },
    {
      id: "5",
      name: "Thaï Foot Massage",
      description: "Massage des pieds et jambes selon la tradition thaïlandaise.",
      duration: 60,
      price: 75,
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      category: "thai"
    },
    {
      id: "6",
      name: "Drainage Lymphatique",
      description: "Technique douce de stimulation du système lymphatique pour éliminer les toxines.",
      duration: 60,
      price: 85,
      image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      category: "specialty"
    },
    {
      id: "7",
      name: "Massage Sportif",
      description: "Spécialisé pour les athlètes et sportifs. Optimise la récupération musculaire.",
      duration: 75,
      price: 90,
      image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      category: "specialty"
    },
    {
      id: "8",
      name: "Tête Coup Épaule",
      description: "Massage ciblé sur la nuque, les épaules et le haut du dos pour soulager les tensions.",
      duration: 45,
      price: 70,
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      category: "specialty"
    }
  ];

  // Utiliser les services statiques au lieu de l'API pour le moment
  const services = staticServices;
  const isLoading = false;
  const error = null;

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
