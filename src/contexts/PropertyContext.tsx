import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';

// Mock property data with Indian locations
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'A beautiful modern apartment in the heart of downtown with amazing city views.',
    price: 5500000,
    location: 'Mumbai, Maharashtra',
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1200,
    images: ['/placeholder.svg', '/placeholder.svg'],
    features: ['Balcony', 'Hardwood Floors', 'Stainless Steel Appliances'],
    sellerId: '123',
    sellerName: 'John Doe',
    createdAt: new Date().toISOString(),
    status: 'available',
    propertyType: 'apartment',
  },
  {
    id: '2',
    title: 'Suburban Family Home',
    description: 'Spacious family home in a quiet suburban neighborhood with a large backyard.',
    price: 8500000,
    location: 'Bangalore, Karnataka',
    bedrooms: 4,
    bathrooms: 3,
    squareFootage: 2400,
    images: ['/placeholder.svg', '/placeholder.svg'],
    features: ['Swimming Pool', 'Garage', 'Garden'],
    sellerId: '456',
    sellerName: 'Jane Smith',
    createdAt: new Date().toISOString(),
    status: 'available',
    propertyType: 'house',
  },
  {
    id: '3',
    title: 'Luxury Beachfront Villa',
    description: 'Stunning beachfront villa with panoramic ocean views and private access to the beach.',
    price: 22000000,
    location: 'Goa, India',
    bedrooms: 5,
    bathrooms: 4,
    squareFootage: 3500,
    images: ['/placeholder.svg', '/placeholder.svg'],
    features: ['Beach Access', 'Swimming Pool', 'Home Theater', 'Wine Cellar'],
    sellerId: '789',
    sellerName: 'Robert Johnson',
    createdAt: new Date().toISOString(),
    status: 'available',
    propertyType: 'house',
  },
  {
    id: '4',
    title: 'Urban Loft Apartment',
    description: 'Stylish loft apartment in a converted industrial building with original features.',
    price: 6250000,
    location: 'Delhi, India',
    bedrooms: 1,
    bathrooms: 2,
    squareFootage: 1100,
    images: ['/placeholder.svg', '/placeholder.svg'],
    features: ['High Ceilings', 'Exposed Brick', 'Open Layout'],
    sellerId: '101',
    sellerName: 'Emily Wilson',
    createdAt: new Date().toISOString(),
    status: 'available',
    propertyType: 'apartment',
  },
];

interface PropertyContextType {
  properties: Property[];
  userProperties: Property[];
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'status'>) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: string) => void;
  getPropertyById: (id: string) => Property | undefined;
  searchProperties: (filters: any) => Property[];
  isLoading: boolean;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Load mock data or fetch from API in a real application
    setProperties(mockProperties);
    setIsLoading(false);
  }, []);

  const userProperties = user?.role === 'seller' 
    ? properties.filter(property => property.sellerId === user.id)
    : [];
    
  const addProperty = (propertyData: Omit<Property, 'id' | 'createdAt' | 'status'>) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to add a property',
        variant: 'destructive',
      });
      return;
    }
    
    const newProperty: Property = {
      ...propertyData,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      status: 'available',
      sellerId: user.id,
      sellerName: user.name,
    };
    
    setProperties([...properties, newProperty]);
    toast({
      title: 'Property Added',
      description: 'Your property has been successfully listed on Smart Homi',
    });
  };
  
  const updateProperty = (updatedProperty: Property) => {
    setProperties(
      properties.map(property => property.id === updatedProperty.id ? updatedProperty : property)
    );
    
    toast({
      title: 'Property Updated',
      description: 'Your property has been successfully updated',
    });
  };
  
  const deleteProperty = (id: string) => {
    setProperties(properties.filter(property => property.id !== id));
    
    toast({
      title: 'Property Removed',
      description: 'Your property has been successfully removed',
    });
  };
  
  const getPropertyById = (id: string) => {
    return properties.find(property => property.id === id);
  };
  
  const searchProperties = (filters: any) => {
    let filtered = [...properties];
    
    if (filters.location) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= filters.minPrice);
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= filters.maxPrice);
    }
    
    if (filters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= filters.bedrooms);
    }
    
    if (filters.propertyType && filters.propertyType !== 'all') {
      filtered = filtered.filter(property => property.propertyType === filters.propertyType);
    }
    
    return filtered;
  };
  
  return (
    <PropertyContext.Provider 
      value={{ 
        properties, 
        userProperties,
        addProperty, 
        updateProperty, 
        deleteProperty, 
        getPropertyById, 
        searchProperties,
        isLoading 
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};
