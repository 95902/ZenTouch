import { useState } from "react";
import ServiceCard from "./service-card";
import type { Service } from "@shared/schema";

interface ServicesCarouselProps {
  services: Service[];
  categories: {
    id: string;
    name: string;
    description: string;
  }[];
  onBook?: (serviceId: string) => void;
}

export default function ServicesCarousel({ services, categories, onBook }: ServicesCarouselProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "");

  // Filter services by active category
  const filteredServices = services.filter(service => service.category === activeCategory);

  return (
    <div className="w-full" data-testid="services-carousel">
      {/* Category Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full p-2 shadow-lg">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full mx-1 transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-sage text-white shadow-md"
                  : "text-charcoal hover:text-sage hover:bg-sage/10"
              }`}
              data-testid={`category-${category.id}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category Description */}
      <div className="text-center mb-8">
        <p className="text-lg text-charcoal/70 max-w-2xl mx-auto" data-testid="category-description">
          {categories.find(cat => cat.id === activeCategory)?.description}
        </p>
      </div>

      {/* Services Grid - Desktop */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="services-grid">
        {filteredServices.map((service) => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            onBook={onBook}
          />
        ))}
      </div>

      {/* Services Carousel - Mobile */}
      <div className="md:hidden" data-testid="services-carousel-mobile">
        <div className="flex flex-col space-y-6 max-h-[70vh] overflow-y-auto snap-y snap-mandatory scrollbar-hide">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="snap-center flex-shrink-0 px-2"
              data-testid={`mobile-service-${service.id}`}
            >
              <ServiceCard 
                service={service} 
                onBook={onBook}
              />
            </div>
          ))}
        </div>
        
        {/* Mobile scroll indicator */}
        {filteredServices.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {filteredServices.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-sage/30"
                data-testid={`mobile-indicator-${index}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}