import { Button } from "@/components/ui/button";
import type { Service } from "@shared/schema";

interface ServiceCardProps {
  service: Service;
  onBook?: (serviceId: string) => void;
}

export default function ServiceCard({ service, onBook }: ServiceCardProps) {
  return (
    <div className="service-card bg-offwhite rounded-2xl p-6 shadow-lg h-full flex flex-col" data-testid={`card-service-${service.id}`}>
      <img 
        src={service.image} 
        alt={service.name} 
        className="rounded-xl mb-4 w-full h-48 object-cover"
        data-testid={`img-service-${service.id}`}
      />
      
      <h3 className="text-lg font-medium text-charcoal mb-2" data-testid={`text-service-title-${service.id}`}>
        {service.name}
      </h3>
      <p className="text-charcoal/70 mb-4 text-sm leading-relaxed flex-grow" data-testid={`text-service-description-${service.id}`}>
        {service.description}
      </p>
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-sage font-medium" data-testid={`text-service-duration-${service.id}`}>
          {service.duration} min
        </span>
        <span className="text-xl font-semibold text-charcoal" data-testid={`text-service-price-${service.id}`}>
          {service.price}€
        </span>
      </div>

      {onBook && (
        <Button 
          onClick={() => onBook(service.id)}
          className="w-full bg-sage text-white hover:bg-sage/90 transition-colors"
          data-testid={`book-service-${service.id}`}
        >
          Réserver
        </Button>
      )}
    </div>
  );
}
