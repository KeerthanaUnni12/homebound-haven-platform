
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { useProperty } from '@/contexts/PropertyContext';
import { Home, Search, Calculator, MessageCircle, FileText } from 'lucide-react';

const Index = () => {
  const { properties } = useProperty();
  const featuredProperties = properties.slice(0, 3);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pb-20">
        <div className="bg-estate-navy h-96 md:h-[500px]"></div>
        <div className="absolute top-0 left-0 w-full h-96 md:h-[500px] bg-gradient-to-r from-estate-navy to-estate-navy/80"></div>
        <div className="absolute top-0 left-0 w-full h-96 md:h-[500px] flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Perfect Property</h1>
          <p className="text-lg md:text-xl max-w-3xl mb-8">
            Your trusted platform for buying, selling, and investing in real estate.
            Get expert advice and tools to make informed decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-estate-gold text-estate-navy hover:bg-estate-gold/90">
              <Link to="/properties">Browse Properties</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              <Link to="/register">Join Today</Link>
            </Button>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-estate-lightblue flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-estate-navy" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Search Properties</h3>
                <p className="text-muted-foreground mb-4">Find your dream home with our advanced search filters.</p>
                <Link to="/properties" className="text-estate-navy font-medium hover:underline text-sm">
                  Start Searching →
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-estate-lightblue flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-estate-navy" />
                </div>
                <h3 className="text-lg font-semibold mb-2">ROI Calculator</h3>
                <p className="text-muted-foreground mb-4">Calculate potential returns on your investment properties.</p>
                <Link to="/calculator" className="text-estate-navy font-medium hover:underline text-sm">
                  Calculate Now →
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-estate-lightblue flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-estate-navy" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Chat Assistant</h3>
                <p className="text-muted-foreground mb-4">Get property recommendations and answers to your questions.</p>
                <Link to="/chat" className="text-estate-navy font-medium hover:underline text-sm">
                  Start Chat →
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-estate-lightblue flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-estate-navy" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Document Management</h3>
                <p className="text-muted-foreground mb-4">Securely store and manage your real estate documents.</p>
                <Link to="/documents" className="text-estate-navy font-medium hover:underline text-sm">
                  Manage Documents →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Properties</h2>
          <Link to="/properties" className="text-estate-navy font-medium hover:underline">
            View All Properties →
          </Link>
        </div>
        
        <div className="property-grid">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-estate-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
              <p className="text-lg text-white/80 max-w-2xl">
                Join Homestead Haven today and get access to premium properties, investment tools,
                and personalized recommendations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-estate-gold text-estate-navy hover:bg-estate-gold/90">
                <Link to="/register">Sign Up Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                <Link to="/properties">Browse Properties</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
