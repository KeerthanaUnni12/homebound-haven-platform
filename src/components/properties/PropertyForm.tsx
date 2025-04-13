
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Property } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProperty } from '@/contexts/PropertyContext';

interface PropertyFormProps {
  initialData?: Partial<Property>;
  isEditing?: boolean;
}

export const PropertyForm = ({ initialData = {}, isEditing = false }: PropertyFormProps) => {
  const { addProperty, updateProperty } = useProperty();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    price: initialData.price || 0,
    location: initialData.location || '',
    bedrooms: initialData.bedrooms || 1,
    bathrooms: initialData.bathrooms || 1,
    squareFootage: initialData.squareFootage || 0,
    propertyType: initialData.propertyType || 'house',
    features: initialData.features?.join(', ') || '',
    images: initialData.images || ['/placeholder.svg'],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'bedrooms' || name === 'bathrooms' || name === 'squareFootage'
        ? Number(value)
        : value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const featuresArray = formData.features
        .split(',')
        .map(feature => feature.trim())
        .filter(feature => feature !== '');
      
      const propertyData = {
        ...formData,
        features: featuresArray,
        propertyType: formData.propertyType as any,
      };
      
      if (isEditing && initialData.id) {
        await updateProperty({ id: initialData.id, ...propertyData } as Property);
        navigate(`/properties/${initialData.id}`);
      } else {
        await addProperty(propertyData as any);
        navigate('/my-properties');
      }
    } catch (error) {
      console.error('Failed to save property:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isEditing ? 'Edit Property' : 'Add New Property'}
        </CardTitle>
        <CardDescription>
          {isEditing 
            ? 'Update the details of your property listing.'
            : 'Fill out the form below to list your property on Homestead Haven.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Modern Downtown Apartment"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select 
                name="propertyType" 
                value={formData.propertyType} 
                onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, propertyType: value }))
                }
              >
                <SelectTrigger id="propertyType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your property..."
                className="min-h-32"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="300000"
                min={0}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, State"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleChange}
                min={0}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleChange}
                min={0}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="squareFootage">Square Footage</Label>
              <Input
                id="squareFootage"
                name="squareFootage"
                type="number"
                value={formData.squareFootage}
                onChange={handleChange}
                placeholder="1200"
                min={0}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="features">Features (comma separated)</Label>
              <Input
                id="features"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="Balcony, Hardwood Floors, Fireplace"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label>Images</Label>
              <div className="flex items-center space-x-2">
                <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center flex-1">
                  <p className="text-muted-foreground text-sm mb-2">
                    We're using placeholder images for this demo.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    In a real application, you would be able to upload images here.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting 
                ? isEditing ? 'Updating...' : 'Creating...' 
                : isEditing ? 'Update Property' : 'List Property'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
