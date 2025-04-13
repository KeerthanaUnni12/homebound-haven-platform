
import { Layout } from '@/components/layout/Layout';
import { PropertyForm } from '@/components/properties/PropertyForm';

const AddProperty = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-8">Add New Property</h1>
        <PropertyForm />
      </div>
    </Layout>
  );
};

export default AddProperty;
