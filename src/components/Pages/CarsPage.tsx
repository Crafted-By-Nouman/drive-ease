import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Users, Fuel, Settings, Filter, Search, Car as CarIcon } from 'lucide-react';
import { carsData, carTypes, cities, type Car } from '@/data/carsData';

interface CarsPageProps {
  onPageChange: (page: string, carId?: string) => void;
}

export const CarsPage = ({ onPageChange }: CarsPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const filteredCars = useMemo(() => {
    return carsData.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.model.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCity = selectedCity === 'all' || car.location === selectedCity;
      const matchesType = selectedType === 'all' || car.type === selectedType;
      const matchesAvailability = availabilityFilter === 'all' || 
                                 (availabilityFilter === 'available' && car.available) ||
                                 (availabilityFilter === 'rented' && !car.available);
      
      let matchesPrice = true;
      if (priceRange !== 'all') {
        switch (priceRange) {
          case 'budget':
            matchesPrice = car.pricePerDay < 150;
            break;
          case 'standard':
            matchesPrice = car.pricePerDay >= 150 && car.pricePerDay < 250;
            break;
          case 'premium':
            matchesPrice = car.pricePerDay >= 250;
            break;
        }
      }

      return matchesSearch && matchesCity && matchesType && matchesPrice && matchesAvailability;
    });
  }, [searchTerm, selectedCity, selectedType, priceRange, availabilityFilter]);

  const CarCard = ({ car }: { car: Car }) => (
    <div className="car-card group">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img 
          src={car.image} 
          alt={car.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          {car.available ? (
            <Badge className="status-available">Available</Badge>
          ) : (
            <Badge className="status-rented">Rented</Badge>
          )}
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-black/50 text-white border-0">
            {car.type.charAt(0).toUpperCase() + car.type.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-semibold text-card-foreground">{car.name}</h3>
          <p className="text-muted-foreground">{car.brand} {car.model} • {car.year}</p>
        </div>

        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {car.location}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {car.seats} seats
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <Fuel className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="capitalize">{car.fuel}</span>
          </div>
          <div className="flex items-center">
            <Settings className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="capitalize">{car.transmission}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="font-medium">{car.rating}</span>
            <span className="text-muted-foreground">({car.reviews})</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Hourly:</span>
            <span className="font-semibold">${car.pricePerHour}/hr</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Daily:</span>
            <span className="font-semibold">${car.pricePerDay}/day</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Weekly:</span>
            <span className="font-semibold text-accent">${car.pricePerWeek}/week</span>
          </div>
        </div>

        <Button 
          onClick={() => onPageChange('booking', car.id)}
          className="w-full btn-hero"
          disabled={!car.available}
        >
          {car.available ? 'Book Now' : 'Not Available'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Find Your Perfect Car
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our premium collection of vehicles for your next journey
          </p>
        </div>

        {/* Filters */}
        <div className="filter-grid mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search cars, brands, models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Car type" />
            </SelectTrigger>
            <SelectContent>
              {carTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder="Price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="budget">Budget (&lt; $150/day)</SelectItem>
              <SelectItem value="standard">Standard ($150-250/day)</SelectItem>
              <SelectItem value="premium">Premium ($250+/day)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Additional Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger className="w-auto">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cars</SelectItem>
              <SelectItem value="available">Available Only</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
            </SelectContent>
          </Select>

          <div className="text-sm text-muted-foreground flex items-center">
            Showing {filteredCars.length} of {carsData.length} cars
          </div>
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="car-grid">
            {filteredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <CarIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No cars found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters to see more options
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCity('all');
                  setSelectedType('all');
                  setPriceRange('all');
                  setAvailabilityFilter('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};