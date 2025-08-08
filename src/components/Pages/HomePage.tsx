import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, Shield, Clock, DollarSign, Star, MapPin, Search } from 'lucide-react';
import heroImage from '@/assets/hero-cars.jpg';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export const HomePage = ({ onPageChange }: HomePageProps) => {
  const [searchCity, setSearchCity] = useState('');
  const [searchType, setSearchType] = useState('');

  const features = [
    {
      icon: Car,
      title: 'Wide Selection',
      description: 'Choose from luxury sedans, SUVs, hatchbacks, and more'
    },
    {
      icon: Shield,
      title: 'Fully Insured',
      description: 'Complete insurance coverage for peace of mind'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance'
    },
    {
      icon: DollarSign,
      title: 'Best Prices',
      description: 'Competitive rates with transparent pricing'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Fantastic service! The car was pristine and booking was incredibly easy.',
      location: 'New York'
    },
    {
      name: 'Mike Chen',
      rating: 5,
      comment: 'Best car rental experience I\'ve had. Highly recommend DriveEase!',
      location: 'San Francisco'
    },
    {
      name: 'Emma Wilson',
      rating: 5,
      comment: 'Great value for money and excellent customer support throughout.',
      location: 'Los Angeles'
    }
  ];

  const handleSearch = () => {
    onPageChange('cars');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 hero-gradient opacity-80"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in">
            Rent a Car in
            <span className="block text-transparent bg-clip-text bg-gradient-accent">
              Seconds
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto opacity-90 animate-slide-up">
            Experience premium car rental with transparent pricing, 
            real-time availability, and 24/7 support.
          </p>

          {/* Search Bar */}
          <div className="glass rounded-2xl p-6 md:p-8 max-w-4xl mx-auto mb-8 animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Enter city or location"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="pl-10 h-12 bg-background/50 backdrop-blur-sm border-white/20"
                />
              </div>
              
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="h-12 bg-background/50 backdrop-blur-sm border-white/20">
                  <SelectValue placeholder="Car type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="date"
                className="h-12 bg-background/50 backdrop-blur-sm border-white/20"
              />

              <Button 
                onClick={handleSearch}
                className="h-12 btn-hero"
              >
                <Search className="h-5 w-5 mr-2" />
                Search Cars
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onPageChange('cars')}
              className="btn-hero text-lg px-8 py-4"
            >
              Browse All Cars
            </Button>
            <Button 
              variant="outline"
              onClick={() => onPageChange('owner')}
              className="btn-outline text-lg px-8 py-4"
            >
              List Your Car
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Why Choose DriveEase?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide the best car rental experience with premium vehicles and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-accent rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust DriveEase for their transportation needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="car-card text-center"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg mb-6 italic">"{testimonial.comment}"</p>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to Hit the Road?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Book your perfect car today and experience the freedom of premium car rental.
          </p>
          <Button 
            onClick={() => onPageChange('cars')}
            className="btn-hero text-lg px-12 py-4"
          >
            Start Booking Now
          </Button>
        </div>
      </section>
    </div>
  );
};