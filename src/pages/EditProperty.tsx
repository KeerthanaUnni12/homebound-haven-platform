
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PropertyForm } from '@/components/properties/PropertyForm';
import { useProperty } from '@/contexts/PropertyContext';
import { Button } from '@/components/ui/button';

const EditProperty = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPropertyById } = useProperty();
  
  const property = getPropertyById(id || '');
  
  if (!property) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8">
            The property you're trying to edit doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/properties')}>
            Back to Properties
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-8">Edit Property</h1>
        <PropertyForm initialData={property} isEditing />
      </div>
    </Layout>
  );
};

export default EditProperty;
