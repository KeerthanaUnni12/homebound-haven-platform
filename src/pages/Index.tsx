
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { useProperty } from '@/contexts/PropertyContext';
import { Home, Search, Calculator, MessageCircle, FileText, PlusCircle, Mail, Phone } from 'lucide-react';

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
            Your trusted platform for buying, selling, and investing in real estate across India.
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
      
      {/* Contact and User Options Section */}
      <section className="bg-estate-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Details */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-3" />
                  <span>contact@homesteadhaven.com</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-3" />
                  <span>+91 98765 43210</span>
                </li>
              </ul>
              <div className="mt-6">
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-3 py-2 rounded-md text-black text-sm focus:outline-none flex-1"
                  />
                  <Button 
                    type="submit"
                    className="bg-estate-gold text-estate-navy hover:bg-estate-gold/90"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
            
            {/* For Buyers */}
            <div>
              <h2 className="text-2xl font-bold mb-6">For Buyers</h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/properties" className="flex items-center text-white hover:text-estate-gold transition-colors">
                    <Search className="h-4 w-4 mr-2" />
                    <span>Find Properties</span>
                  </Link>
                </li>
                <li>
                  <Link to="/calculator" className="flex items-center text-white hover:text-estate-gold transition-colors">
                    <Calculator className="h-4 w-4 mr-2" />
                    <span>Calculate Investment ROI</span>
                  </Link>
                </li>
                <li>
                  <Link to="/chat" className="flex items-center text-white hover:text-estate-gold transition-colors">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    <span>Get Recommendations</span>
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="flex items-center text-white hover:text-estate-gold transition-colors">
                    <Home className="h-4 w-4 mr-2" />
                    <span>Create Buyer Account</span>
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* For Sellers */}
            <div>
              <h2 className="text-2xl font-bold mb-6">For Sellers</h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/add-property" className="flex items-center text-white hover:text-estate-gold transition-colors">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    <span>List Your Property</span>
                  </Link>
                </li>
                <li>
                  <Link to="/my-properties" className="flex items-center text-white hover:text-estate-gold transition-colors">
                    <Home className="h-4 w-4 mr-2" />
                    <span>Manage Your Listings</span>
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="flex items-center text-white hover:text-estate-gold transition-colors">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Create Seller Account</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
