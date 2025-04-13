
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { useProperty } from '@/contexts/PropertyContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Home, PlusCircle } from 'lucide-react';

const MyProperties = () => {
  const { userProperties, isLoading } = useProperty();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user && user.role !== 'seller') {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Properties</h1>
            <p className="text-lg text-muted-foreground">
              Manage your property listings.
            </p>
          </div>
          <Button asChild>
            <Link to="/add-property" className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Property
            </Link>
          </Button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-pulse">Loading your properties...</div>
          </div>
        ) : userProperties.length === 0 ? (
          <div className="text-center py-12">
            <Home className="h-12 w-12 mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-semibold mt-4">No properties yet</h2>
            <p className="text-muted-foreground mt-2">
              You haven't listed any properties yet.
            </p>
            <Button asChild className="mt-4">
              <Link to="/add-property">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Your First Property
              </Link>
            </Button>
          </div>
        ) : (
          <div className="property-grid">
            {userProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyProperties;
