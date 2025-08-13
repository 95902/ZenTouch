import { CheckCircle } from "lucide-react";

export default function About() {
  const certifications = [
    "Diplôme École Française de Massage (2018)",
    "Formation Massage Prénatal (2019)",
    "Certification Aromathérapie (2020)",
    "Formation Continue Techniques Ayurvédiques (2022)"
  ];

  return (
    <div className="pt-20">
      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-lavender/10 to-cream/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800" 
                alt="Marie Dubois, masseuse certifiée" 
                className="rounded-2xl shadow-2xl w-full h-auto"
                data-testid="img-about-marie"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-light text-charcoal mb-6" data-testid="text-about-title">
                À propos de Marie
              </h1>
              <div className="space-y-6 text-charcoal/80 leading-relaxed">
                <p data-testid="text-about-paragraph-1">
                  Diplômée de l'École Française de Massage depuis 2018, je me suis spécialisée dans les techniques de relaxation et de bien-être. Ma passion pour le massage est née d'une conviction profonde : chaque personne mérite de prendre soin d'elle-même.
                </p>
                <p data-testid="text-about-paragraph-2">
                  Formée aux techniques suédoises, californiennes et ayurvédiques, j'adapte chaque séance selon vos besoins spécifiques. Mon approche holistique considère la personne dans sa globalité, pour un équilibre retrouvé entre corps et esprit.
                </p>
                <p data-testid="text-about-paragraph-3">
                  Dans mon cabinet chaleureux et apaisant, je vous reçois dans le respect de votre intimité et de votre rythme, pour un moment uniquement dédié à votre bien-être.
                </p>
              </div>
              
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-medium text-charcoal" data-testid="text-certifications-title">Certifications</h3>
                <ul className="space-y-2 text-charcoal/70" data-testid="list-certifications">
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
            <h2 className="text-3xl md:text-4xl font-light text-charcoal mb-6" data-testid="text-philosophy-title">
              Ma Philosophie
            </h2>
            <p className="text-lg text-charcoal/70 max-w-3xl mx-auto leading-relaxed" data-testid="text-philosophy-description">
              Je crois profondément que le bien-être est un droit, pas un luxe. Mon objectif est de créer un espace sûr où vous pouvez vous reconnecter avec votre corps et retrouver votre équilibre naturel.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6" data-testid="card-philosophy-respect">
              <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤲</span>
              </div>
              <h3 className="text-xl font-medium text-charcoal mb-3" data-testid="text-respect-title">Respect</h3>
              <p className="text-charcoal/70" data-testid="text-respect-description">
                Chaque séance respecte votre rythme, vos limites et vos préférences personnelles.
              </p>
            </div>

            <div className="text-center p-6" data-testid="card-philosophy-expertise">
              <div className="w-16 h-16 bg-lavender/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-medium text-charcoal mb-3" data-testid="text-expertise-title">Expertise</h3>
              <p className="text-charcoal/70" data-testid="text-expertise-description">
                Formation continue et techniques adaptées pour vous offrir le meilleur soin possible.
              </p>
            </div>

            <div className="text-center p-6" data-testid="card-philosophy-serenity">
              <div className="w-16 h-16 bg-cream/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧘‍♀️</span>
              </div>
              <h3 className="text-xl font-medium text-charcoal mb-3" data-testid="text-serenity-title">Sérénité</h3>
              <p className="text-charcoal/70" data-testid="text-serenity-description">
                Un environnement paisible et apaisant pour favoriser votre détente complète.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
