import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-light text-charcoal mb-6 leading-tight" data-testid="text-hero-title">
              Retrouvez votre <span className="text-sage font-medium">équilibre</span> intérieur
            </h1>
            <p className="text-lg text-charcoal/70 mb-8 leading-relaxed" data-testid="text-hero-description">
              Masseuse professionnelle certifiée, je vous accompagne dans votre quête de bien-être à travers des massages personnalisés dans un cadre apaisant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking" data-testid="button-book-appointment">
                <Button className="bg-sage text-white px-8 py-4 rounded-full hover:bg-sage/90 transition-all duration-300 transform hover:scale-105">
                  Prendre rendez-vous
                </Button>
              </Link>
              <Link href="/services" data-testid="button-discover-services">
                <Button variant="outline" className="border-sage text-sage px-8 py-4 rounded-full hover:bg-sage hover:text-white transition-all duration-300">
                  Découvrir mes prestations
                </Button>
              </Link>
            </div>
          </div>
          <div className="animate-slide-up">
            <img 
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Marie Dubois, masseuse professionnelle" 
              className="rounded-2xl shadow-2xl w-full h-auto"
              data-testid="img-hero"
            />
          </div>
        </div>
      </section>

      {/* Quick Services Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-charcoal mb-6" data-testid="text-services-title">
              Prestations Populaires
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto" data-testid="text-services-description">
              Découvrez mes massages les plus demandés pour votre bien-être
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="service-card bg-offwhite rounded-2xl p-8 shadow-lg" data-testid="card-massage-relaxant">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" 
                alt="Massage relaxant" 
                className="rounded-xl mb-6 w-full h-48 object-cover"
                data-testid="img-massage-relaxant"
              />
              <h3 className="text-xl font-medium text-charcoal mb-3" data-testid="text-massage-relaxant-title">Massage Relaxant</h3>
              <p className="text-charcoal/70 mb-4 text-sm leading-relaxed" data-testid="text-massage-relaxant-description">
                Un moment de pure détente pour relâcher les tensions du quotidien.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sage font-medium" data-testid="text-massage-relaxant-duration">60 min</span>
                <span className="text-xl font-semibold text-charcoal" data-testid="text-massage-relaxant-price">75€</span>
              </div>
            </div>

            <div className="service-card bg-offwhite rounded-2xl p-8 shadow-lg" data-testid="card-massage-therapeutique">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" 
                alt="Massage thérapeutique" 
                className="rounded-xl mb-6 w-full h-48 object-cover"
                data-testid="img-massage-therapeutique"
              />
              <h3 className="text-xl font-medium text-charcoal mb-3" data-testid="text-massage-therapeutique-title">Massage Thérapeutique</h3>
              <p className="text-charcoal/70 mb-4 text-sm leading-relaxed" data-testid="text-massage-therapeutique-description">
                Ciblé sur les zones de tension chroniques pour un soulagement durable.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sage font-medium" data-testid="text-massage-therapeutique-duration">75 min</span>
                <span className="text-xl font-semibold text-charcoal" data-testid="text-massage-therapeutique-price">95€</span>
              </div>
            </div>

            <div className="service-card bg-offwhite rounded-2xl p-8 shadow-lg" data-testid="card-massage-pierres">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" 
                alt="Massage aux pierres chaudes" 
                className="rounded-xl mb-6 w-full h-48 object-cover"
                data-testid="img-massage-pierres"
              />
              <h3 className="text-xl font-medium text-charcoal mb-3" data-testid="text-massage-pierres-title">Massage aux Pierres Chaudes</h3>
              <p className="text-charcoal/70 mb-4 text-sm leading-relaxed" data-testid="text-massage-pierres-description">
                L'alliance parfaite entre chaleur et massage pour une détente profonde.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sage font-medium" data-testid="text-massage-pierres-duration">90 min</span>
                <span className="text-xl font-semibold text-charcoal" data-testid="text-massage-pierres-price">110€</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/services" data-testid="button-view-all-services">
              <Button className="bg-sage text-white px-8 py-4 rounded-full hover:bg-sage/90">
                Voir toutes les prestations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
