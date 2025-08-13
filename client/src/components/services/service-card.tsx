import type { Service } from "@shared/schema";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="service-card bg-offwhite rounded-2xl p-8 shadow-lg" data-testid={`card-service-${service.id}`}>
      <img 
        src={service.image} 
        alt={service.name} 
        className="rounded-xl mb-6 w-full h-48 object-cover"
        data-testid={`img-service-${service.id}`}
      />
      
      <h3 className="text-xl font-medium text-charcoal mb-3" data-testid={`text-service-title-${service.id}`}>
        {service.name}
      </h3>
      <p className="text-charcoal/70 mb-4 text-sm leading-relaxed" data-testid={`text-service-description-${service.id}`}>
        {service.description}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-sage font-medium" data-testid={`text-service-duration-${service.id}`}>
          {service.duration} min
        </span>
        <span className="text-xl font-semibold text-charcoal" data-testid={`text-service-price-${service.id}`}>
          {service.price}€
        </span>
      </div>
    </div>
  );
}
