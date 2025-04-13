
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Property } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Square, MapPin } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.images[imageIndex]} 
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <Badge 
          variant="secondary" 
          className="absolute top-2 left-2 bg-estate-navy text-white font-semibold capitalize"
        >
          {property.propertyType}
        </Badge>
        <Badge 
          variant="secondary" 
          className={`absolute top-2 right-2 ${
            property.status === 'available' ? 'bg-green-600' : 
            property.status === 'pending' ? 'bg-amber-600' : 
            'bg-estate-gold'
          } text-white font-semibold capitalize`}
        >
          {property.status}
        </Badge>
        <div className="absolute bottom-2 left-2 right-2 flex justify-between">
          {property.images.length > 1 && (
            <div className="flex gap-1">
              {property.images.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setImageIndex(idx)}
                  className={`w-2 h-2 rounded-full ${imageIndex === idx ? 'bg-white' : 'bg-white/50'}`} 
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <CardContent className="flex-1 pt-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg truncate">{property.title}</h3>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="truncate">{property.location}</span>
          </div>
        </div>
        <div className="text-xl font-bold text-estate-navy mb-2">
          {formatCurrency(property.price)}
        </div>
        <div className="flex items-center justify-between mt-2 text-muted-foreground text-sm">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            <span>{property.squareFootage} sqft</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Link 
          to={`/properties/${property.id}`} 
          className="text-estate-navy hover:text-estate-gold font-medium text-sm flex-1 text-center"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};
