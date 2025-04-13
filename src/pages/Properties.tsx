
import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PropertySearchForm } from '@/components/properties/PropertySearchForm';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { useProperty } from '@/contexts/PropertyContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home } from 'lucide-react';

const Properties = () => {
  const { properties, searchProperties, isLoading } = useProperty();
  const [searchResults, setSearchResults] = useState(properties);
  const [sortBy, setSortBy] = useState('newest');
  
  useEffect(() => {
    setSearchResults(properties);
  }, [properties]);
  
  const handleSearch = (filters: any) => {
    const results = searchProperties(filters);
    setSearchResults(results);
  };
  
  const sortProperties = (results: any[]) => {
    const sorted = [...results];
    
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      default:
        break;
    }
    
    return sorted;
  };
  
  const sortedResults = sortProperties(searchResults);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Find Your Perfect Property</h1>
            <p className="text-lg text-muted-foreground">
              Browse our listings and filter by your preferences.
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <PropertySearchForm onSearch={handleSearch} />
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            {searchResults.length} {searchResults.length === 1 ? 'property' : 'properties'} found
          </p>
          
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-pulse">Loading properties...</div>
          </div>
        ) : sortedResults.length === 0 ? (
          <div className="text-center py-12">
            <Home className="h-12 w-12 mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-semibold mt-4">No properties found</h2>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search filters to see more results.
            </p>
            <Button onClick={() => handleSearch({})} className="mt-4">
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="property-grid">
            {sortedResults.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Properties;
