
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search, Calculator, MessageCircle, PlusCircle } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section with Enhanced Background */}
      <section className="relative pb-20">
        <div className="bg-estate-navy h-96 md:h-[500px] bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute top-0 left-0 w-full h-96 md:h-[500px] bg-gradient-to-r from-estate-navy/90 to-estate-navy/70"></div>
        <div className="absolute top-0 left-0 w-full h-96 md:h-[500px] flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-estate-gold drop-shadow-lg">Find Your Perfect Property</h1>
          <p className="text-lg md:text-xl max-w-3xl mb-8 drop-shadow-md">
            Your trusted platform for buying, selling, and investing in real estate across India.
            Get expert advice and tools to make informed decisions.
          </p>
        </div>
        
        {/* Feature Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-t-4 border-t-estate-gold animate-fade-in">
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
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-t-4 border-t-estate-gold animate-fade-in" style={{ animationDelay: '0.2s' }}>
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
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-t-4 border-t-estate-gold animate-fade-in" style={{ animationDelay: '0.3s' }}>
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
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-t-4 border-t-estate-gold animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-estate-lightblue flex items-center justify-center mb-4">
                  <PlusCircle className="h-6 w-6 text-estate-navy" />
                </div>
                <h3 className="text-lg font-semibold mb-2">List Your Property</h3>
                <p className="text-muted-foreground mb-4">Add your property for sale and connect with potential buyers.</p>
                <Link to="/add-property" className="text-estate-navy font-medium hover:underline text-sm">
                  Add Property →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
