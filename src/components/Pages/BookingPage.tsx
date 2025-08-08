import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, Users, Fuel, Settings, Calendar, Clock, CreditCard, CheckCircle } from 'lucide-react';
import { carsData, type Car } from '@/data/carsData';
import { useToast } from '@/hooks/use-toast';

interface BookingPageProps {
  carId?: string;
  onPageChange: (page: string) => void;
}

interface BookingData {
  carId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  rentalPlan: 'hourly' | 'daily' | 'weekly';
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  totalCost: number;
  bookingId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export const BookingPage = ({ carId, onPageChange }: BookingPageProps) => {
  const { toast } = useToast();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    rentalPlan: 'daily' as 'hourly' | 'daily' | 'weekly',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: ''
  });
  const [totalCost, setTotalCost] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    if (carId) {
      const car = carsData.find(c => c.id === carId);
      setSelectedCar(car || null);
    } else {
      setSelectedCar(null);
    }
  }, [carId]);

  useEffect(() => {
    calculateTotalCost();
  }, [formData, selectedCar]);

  const calculateTotalCost = () => {
    if (!selectedCar || !formData.pickupDate || !formData.dropoffDate) {
      setTotalCost(0);
      return;
    }

    const pickup = new Date(`${formData.pickupDate}T${formData.pickupTime || '00:00'}`);
    const dropoff = new Date(`${formData.dropoffDate}T${formData.dropoffTime || '23:59'}`);
    
    if (dropoff <= pickup) {
      setTotalCost(0);
      return;
    }

    let cost = 0;
    switch (formData.rentalPlan) {
      case 'hourly':
        const hours = Math.ceil((dropoff.getTime() - pickup.getTime()) / (1000 * 60 * 60));
        cost = hours * selectedCar.pricePerHour;
        break;
      case 'daily':
        const days = Math.ceil((dropoff.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));
        cost = days * selectedCar.pricePerDay;
        break;
      case 'weekly':
        const weeks = Math.ceil((dropoff.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24 * 7));
        cost = weeks * selectedCar.pricePerWeek;
        break;
    }

    setTotalCost(cost);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCar) return;

    // Validate form
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone ||
        !formData.pickupDate || !formData.pickupTime || !formData.dropoffDate || !formData.dropoffTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Generate booking ID
    const newBookingId = 'BK' + Date.now().toString().slice(-8);
    setBookingId(newBookingId);

    // Create booking data
    const bookingData: BookingData = {
      carId: selectedCar.id,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      rentalPlan: formData.rentalPlan,
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
      dropoffDate: formData.dropoffDate,
      dropoffTime: formData.dropoffTime,
      totalCost,
      bookingId: newBookingId,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingBookings = JSON.parse(localStorage.getItem('carBookings') || '[]');
    existingBookings.push(bookingData);
    localStorage.setItem('carBookings', JSON.stringify(existingBookings));

    // Show confirmation
    setShowConfirmation(true);

    toast({
      title: "Booking Confirmed!",
      description: `Your booking #${newBookingId} has been confirmed.`,
    });
  };

  if (!selectedCar && carId) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Car not found</h2>
          <Button onClick={() => onPageChange('cars')}>
            Browse Cars
          </Button>
        </div>
      </div>
    );
  }

  if (!selectedCar) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please select a car to book</h2>
          <Button onClick={() => onPageChange('cars')}>
            Browse Cars
          </Button>
        </div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="car-card text-center">
            <CardContent className="pt-12 pb-12">
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
              <h1 className="text-3xl font-display font-bold mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Your booking has been successfully confirmed.
              </p>
              
              <div className="bg-accent-light rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-lg mb-2">Booking Details</h3>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span>Booking ID:</span>
                    <span className="font-mono font-semibold">{bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Car:</span>
                    <span>{selectedCar.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Cost:</span>
                    <span className="font-semibold text-accent">${totalCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pickup:</span>
                    <span>{formData.pickupDate} at {formData.pickupTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dropoff:</span>
                    <span>{formData.dropoffDate} at {formData.dropoffTime}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={() => onPageChange('profile')}
                  className="btn-hero w-full"
                >
                  View My Bookings
                </Button>
                <Button 
                  onClick={() => onPageChange('cars')}
                  variant="outline"
                  className="w-full"
                >
                  Book Another Car
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Complete Your Booking
            </h1>
            <p className="text-xl text-muted-foreground">
              You're one step away from your perfect ride
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Car Details */}
            <div>
              <Card className="car-card mb-6">
                <CardContent className="p-6">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img 
                      src={selectedCar.image} 
                      alt={selectedCar.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="status-available">Available</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold">{selectedCar.name}</h3>
                    <p className="text-muted-foreground">{selectedCar.brand} {selectedCar.model} • {selectedCar.year}</p>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                        {selectedCar.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        {selectedCar.seats} seats
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1">{selectedCar.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <Fuel className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="capitalize">{selectedCar.fuel}</span>
                      </div>
                      <div className="flex items-center">
                        <Settings className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="capitalize">{selectedCar.transmission}</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-border">
                      <div className="flex justify-between">
                        <span>Hourly Rate:</span>
                        <span className="font-semibold">${selectedCar.pricePerHour}/hr</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Daily Rate:</span>
                        <span className="font-semibold">${selectedCar.pricePerDay}/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weekly Rate:</span>
                        <span className="font-semibold text-accent">${selectedCar.pricePerWeek}/week</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <div>
              <Card className="car-card">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Customer Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="customerName">Full Name *</Label>
                          <Input
                            id="customerName"
                            value={formData.customerName}
                            onChange={(e) => handleInputChange('customerName', e.target.value)}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="customerEmail">Email Address *</Label>
                          <Input
                            id="customerEmail"
                            type="email"
                            value={formData.customerEmail}
                            onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="customerPhone">Phone Number *</Label>
                          <Input
                            id="customerPhone"
                            type="tel"
                            value={formData.customerPhone}
                            onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Rental Details */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Rental Details</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="rentalPlan">Rental Plan</Label>
                          <Select value={formData.rentalPlan} onValueChange={(value: 'hourly' | 'daily' | 'weekly') => handleInputChange('rentalPlan', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2" />
                                  Hourly (${selectedCar.pricePerHour}/hr)
                                </div>
                              </SelectItem>
                              <SelectItem value="daily">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Daily (${selectedCar.pricePerDay}/day)
                                </div>
                              </SelectItem>
                              <SelectItem value="weekly">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Weekly (${selectedCar.pricePerWeek}/week)
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="pickupDate">Pickup Date *</Label>
                            <Input
                              id="pickupDate"
                              type="date"
                              value={formData.pickupDate}
                              onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="pickupTime">Pickup Time *</Label>
                            <Input
                              id="pickupTime"
                              type="time"
                              value={formData.pickupTime}
                              onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="dropoffDate">Dropoff Date *</Label>
                            <Input
                              id="dropoffDate"
                              type="date"
                              value={formData.dropoffDate}
                              onChange={(e) => handleInputChange('dropoffDate', e.target.value)}
                              min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="dropoffTime">Dropoff Time *</Label>
                            <Input
                              id="dropoffTime"
                              type="time"
                              value={formData.dropoffTime}
                              onChange={(e) => handleInputChange('dropoffTime', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cost Summary */}
                    {totalCost > 0 && (
                      <div className="bg-accent-light rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Cost Summary</h4>
                        <div className="flex justify-between items-center">
                          <span>Total Cost:</span>
                          <span className="text-2xl font-bold text-accent">${totalCost}</span>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full btn-hero"
                      disabled={totalCost <= 0}
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Confirm Booking (${totalCost})
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};