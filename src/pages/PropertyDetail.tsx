
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useProperty } from '@/contexts/PropertyContext';
import { useAuth } from '@/contexts/AuthContext';
import { DocumentList } from '@/components/documents/DocumentList';
import { DocumentUploadForm } from '@/components/documents/DocumentUploadForm';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { MapPin, Bed, Bath, Square, Calendar, User, Edit, Trash2, Home, Upload } from 'lucide-react';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPropertyById, deleteProperty } = useProperty();
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const property = getPropertyById(id || '');
  
  if (!property) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Home className="h-16 w-16 mx-auto text-muted-foreground" />
          <h1 className="text-3xl font-bold mt-4 mb-2">Property Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/properties">Back to Properties</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const isOwner = user && user.id === property.sellerId;
  
  const handleDeleteProperty = () => {
    deleteProperty(property.id);
    navigate('/properties');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <Link to="/properties" className="text-estate-navy hover:underline text-sm mb-2 inline-block">
            ← Back to Properties
          </Link>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{property.title}</h1>
              <div className="flex items-center mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.location}</span>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-estate-navy text-right">
                {formatCurrency(property.price)}
              </h2>
              <Badge 
                variant="secondary" 
                className={`mt-2 ${
                  property.status === 'available' ? 'bg-green-600' : 
                  property.status === 'pending' ? 'bg-amber-600' : 
                  'bg-estate-gold'
                } text-white font-semibold capitalize`}
              >
                {property.status}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden h-80 md:h-96 bg-muted">
              <img 
                src={property.images[currentImageIndex]} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
              
              {property.images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {property.images.map((_, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-3 h-3 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} 
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-8">
              <Tabs defaultValue="details">
                <TabsList className="w-full">
                  <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                  <TabsTrigger value="features" className="flex-1">Features</TabsTrigger>
                  <TabsTrigger value="documents" className="flex-1">Documents</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {property.description}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Property Details</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-muted rounded-lg p-4 flex flex-col items-center">
                          <Bed className="h-6 w-6 text-estate-navy mb-2" />
                          <span className="text-lg font-semibold">{property.bedrooms}</span>
                          <span className="text-sm text-muted-foreground">Bedrooms</span>
                        </div>
                        <div className="bg-muted rounded-lg p-4 flex flex-col items-center">
                          <Bath className="h-6 w-6 text-estate-navy mb-2" />
                          <span className="text-lg font-semibold">{property.bathrooms}</span>
                          <span className="text-sm text-muted-foreground">Bathrooms</span>
                        </div>
                        <div className="bg-muted rounded-lg p-4 flex flex-col items-center">
                          <Square className="h-6 w-6 text-estate-navy mb-2" />
                          <span className="text-lg font-semibold">{property.squareFootage}</span>
                          <span className="text-sm text-muted-foreground">Sq Ft</span>
                        </div>
                        <div className="bg-muted rounded-lg p-4 flex flex-col items-center">
                          <Home className="h-6 w-6 text-estate-navy mb-2" />
                          <span className="text-lg font-semibold capitalize">{property.propertyType}</span>
                          <span className="text-sm text-muted-foreground">Type</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-muted-foreground">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Listed on {formatDate(property.createdAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>Listed by {property.sellerName}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="mt-6">
                  {property.features.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No features listed for this property.
                    </p>
                  ) : (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold mb-2">Property Features</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {property.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <span className="h-2 w-2 bg-estate-navy rounded-full mr-2"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="documents" className="mt-6">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Property Documents</h3>
                      {user && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center">
                              <Upload className="h-4 w-4 mr-1" />
                              Upload Document
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Upload Document</DialogTitle>
                            </DialogHeader>
                            <DocumentUploadForm propertyId={property.id} />
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                    
                    <DocumentList propertyId={property.id} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Interested in this property?</h3>
              <div className="space-y-4">
                <Button className="w-full">Schedule a Visit</Button>
                <Button variant="outline" className="w-full">Request Information</Button>
                <Button variant="secondary" className="w-full">
                  <Link to="/calculator" className="flex w-full justify-center">
                    Calculate ROI
                  </Link>
                </Button>
              </div>
            </div>
            
            {isOwner && (
              <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Property Management</h3>
                <div className="space-y-2">
                  <Button 
                    asChild
                    variant="outline" 
                    className="w-full"
                  >
                    <Link to={`/edit-property/${property.id}`} className="flex items-center justify-center">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Property
                    </Link>
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Property
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete your property listing and all associated data.
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteProperty}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )}
            
            <div className="bg-estate-lightblue border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Property Location</h3>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <MapPin className="h-10 w-10 text-estate-navy" />
                <span className="text-muted-foreground ml-2">Map would be displayed here</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {property.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetail;
