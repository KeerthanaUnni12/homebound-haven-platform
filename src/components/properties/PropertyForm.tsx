
import React, { useState, useRef, useEffect } from 'react';
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
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface PropertyFormProps {
  initialData?: Partial<Property>;
  isEditing?: boolean;
}

export const PropertyForm = ({ initialData = {}, isEditing = false }: PropertyFormProps) => {
  const { addProperty, updateProperty } = useProperty();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    price: initialData.price || 0,
    location: initialData.location || '',
    address: initialData.address || '',
    bedrooms: initialData.bedrooms || 1,
    bathrooms: initialData.bathrooms || 1,
    squareFootage: initialData.squareFootage || 0,
    propertyType: initialData.propertyType || 'house',
    features: initialData.features?.join(', ') || '',
    images: initialData.images || ['/placeholder.svg'],
  });
  
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  
  useEffect(() => {
    // Initialize preview images with existing images when editing
    if (initialData.images && initialData.images.length > 0 && initialData.images[0] !== '/placeholder.svg') {
      setPreviewImages([...initialData.images]);
    }
  }, [initialData.images]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'bedrooms' || name === 'bathrooms' || name === 'squareFootage'
        ? Number(value)
        : value,
    }));
  };
  
  const handlePropertyTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      propertyType: value as 'house' | 'apartment' | 'land',
    }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const maxFileSizeMB = 5; // 5MB max file size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    
    Array.from(files).forEach(file => {
      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not a supported image format. Please use JPG, PNG, GIF, or WebP.`,
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: `${file.name} exceeds the ${maxFileSizeMB}MB limit.`,
          variant: "destructive",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Update both uploadedImages (for form submission) and previewImages (for UI)
        setUploadedImages(prev => [...prev, base64String]);
        setPreviewImages(prev => [...prev, base64String]);
      };
      reader.readAsDataURL(file);
    });
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const removeImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const featuresArray = formData.features
        .split(',')
        .map(feature => feature.trim())
        .filter(feature => feature !== '');
      
      // Use the uploaded images or placeholders if none
      const imagesToUse = previewImages.length > 0 
        ? previewImages 
        : ['/placeholder.svg'];
      
      const propertyData = {
        ...formData,
        features: featuresArray,
        images: imagesToUse,
      };
      
      if (isEditing && initialData.id) {
        await updateProperty({ id: initialData.id, ...propertyData } as Property);
        toast({
          title: "Success",
          description: "Property updated successfully",
        });
        navigate(`/properties/${initialData.id}`);
      } else {
        await addProperty(propertyData as any);
        toast({
          title: "Success",
          description: "Property listed successfully",
        });
        navigate('/my-properties');
      }
    } catch (error) {
      console.error('Failed to save property:', error);
      toast({
        title: "Error",
        description: "Failed to save property",
        variant: "destructive",
      });
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
            : 'Fill out the form below to list your property on Smart Homi.'}
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
                onValueChange={handlePropertyTypeChange}
              >
                <SelectTrigger id="propertyType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
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
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="5000000"
                min={0}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">City, State</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Mumbai, Maharashtra"
                required
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Complete Address</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Street Name, Locality, City, State, PIN Code"
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
              <div className="border border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg, image/png, image/gif, image/webp"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                {previewImages.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {previewImages.map((img, index) => (
                        <div key={index} className="relative aspect-video rounded-md overflow-hidden border border-gray-200 group">
                          <img 
                            src={img} 
                            alt={`Property image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors">
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 p-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full max-w-xs"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Add More Images
                      </Button>
                    </div>
                    <p className="text-xs text-center text-muted-foreground">
                      Max 5MB per image. JPG, PNG, GIF, WebP formats supported.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ImageIcon className="mx-auto h-16 w-16 text-gray-300" />
                    <div className="mt-4 flex flex-col items-center">
                      <h3 className="text-sm font-medium text-gray-900">Upload Property Images</h3>
                      <p className="mt-1 text-xs text-gray-500">
                        Drag and drop or click to upload
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-4"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Select Images
                      </Button>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Max 5MB per image. JPG, PNG, GIF, WebP formats supported.
                      </p>
                    </div>
                  </div>
                )}
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
