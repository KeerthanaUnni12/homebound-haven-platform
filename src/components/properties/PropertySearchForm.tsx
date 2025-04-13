
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface PropertySearchFormProps {
  onSearch: (filters: any) => void;
}

export const PropertySearchForm = ({ onSearch }: PropertySearchFormProps) => {
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [bedrooms, setBedrooms] = useState<number | undefined>(undefined);
  const [propertyType, setPropertyType] = useState('all');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      location,
      minPrice,
      maxPrice,
      bedrooms,
      propertyType
    });
  };
  
  const handleReset = () => {
    setLocation('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setBedrooms(undefined);
    setPropertyType('all');
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative mt-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="City, neighborhood, or ZIP"
                className="pl-8"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="property-type">Property Type</Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger id="property-type" className="mt-1">
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any type</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex space-x-2">
            <Button type="submit" className="flex-1">
              Search
            </Button>
            <Button type="button" variant="outline" onClick={handleReset} className="px-3">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center">
          <Button
            type="button"
            variant="ghost"
            className="p-0 h-auto text-sm font-medium text-estate-navy flex items-center"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <SlidersHorizontal className="mr-1 h-3 w-3" />
            {showAdvanced ? 'Hide filters' : 'More filters'}
          </Button>
        </div>
        
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <Label>Price Range</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Input
                  type="number"
                  placeholder="Min"
                  min={0}
                  value={minPrice || ''}
                  onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                />
                <span>to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  min={0}
                  value={maxPrice || ''}
                  onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label>Bedrooms (min)</Label>
                <span className="text-sm font-medium">{bedrooms || 'Any'}</span>
              </div>
              <Slider
                className="mt-6"
                defaultValue={[0]}
                min={0}
                max={5}
                step={1}
                value={bedrooms !== undefined ? [bedrooms] : [0]}
                onValueChange={(value) => setBedrooms(value[0])}
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Any</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5+</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};
