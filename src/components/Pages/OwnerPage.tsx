import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Car, Upload, DollarSign, MapPin, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cities, carTypes } from '@/data/carsData';

interface OwnerPageProps {
  onPageChange: (page: string) => void;
}

interface VehicleData {
  id: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  vehicleName: string;
  brand: string;
  model: string;
  year: number;
  type: 'sedan' | 'suv' | 'hatchback' | 'luxury';
  city: string;
  pricePerHour: number;
  pricePerDay: number;
  pricePerWeek: number;
  fuel: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatic';
  seats: number;
  features: string[];
  description: string;
  imageUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export const OwnerPage = ({ onPageChange }: OwnerPageProps) => {
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    vehicleName: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    type: 'sedan' as 'sedan' | 'suv' | 'hatchback' | 'luxury',
    city: '',
    pricePerHour: 0,
    pricePerDay: 0,
    pricePerWeek: 0,
    fuel: 'petrol' as 'petrol' | 'diesel' | 'electric' | 'hybrid',
    transmission: 'automatic' as 'manual' | 'automatic',
    seats: 5,
    features: [] as string[],
    description: '',
    imageUrl: ''
  });

  const availableFeatures = [
    'GPS Navigation', 'Leather Seats', 'Sunroof', 'Premium Audio',
    'All-Wheel Drive', 'Parking Sensors', 'Bluetooth', 'Air Conditioning',
    'USB Ports', 'Wireless Charging', 'Ambient Lighting', 'Safety Features',
    'Fuel Efficient', 'Spacious Interior', 'Off-Road Capable', 'Panoramic Roof'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server
      // For this demo, we'll just use a placeholder
      const mockUrl = URL.createObjectURL(file);
      handleInputChange('imageUrl', mockUrl);
      toast({
        title: "Image uploaded",
        description: "Your vehicle image has been uploaded successfully.",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const requiredFields = ['ownerName', 'ownerEmail', 'ownerPhone', 'vehicleName', 'brand', 'model', 'city'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (formData.pricePerDay <= 0) {
      toast({
        title: "Invalid Pricing",
        description: "Please set a valid daily rental price.",
        variant: "destructive"
      });
      return;
    }

    // Create vehicle data
    const vehicleData: VehicleData = {
      ...formData,
      id: 'VH' + Date.now().toString().slice(-8),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingVehicles = JSON.parse(localStorage.getItem('ownerVehicles') || '[]');
    existingVehicles.push(vehicleData);
    localStorage.setItem('ownerVehicles', JSON.stringify(existingVehicles));

    setShowSuccess(true);
    toast({
      title: "Vehicle Submitted!",
      description: "Your vehicle has been submitted for review.",
    });
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="car-card text-center">
            <CardContent className="pt-12 pb-12">
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
              <h1 className="text-3xl font-display font-bold mb-4">
                Vehicle Submitted Successfully!
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Thank you for joining our platform. Your vehicle will be reviewed within 24 hours.
              </p>
              
              <div className="bg-primary-light rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-lg mb-2">What's Next?</h3>
                <ul className="text-left space-y-2">
                  <li>• Our team will review your vehicle details</li>
                  <li>• You'll receive an email confirmation within 24 hours</li>
                  <li>• Once approved, your car will be live on our platform</li>
                  <li>• Start earning money from rentals immediately</li>
                </ul>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={() => setShowSuccess(false)}
                  className="btn-hero w-full"
                >
                  Submit Another Vehicle
                </Button>
                <Button 
                  onClick={() => onPageChange('home')}
                  variant="outline"
                  className="w-full"
                >
                  Back to Home
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              List Your Vehicle
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start earning money by renting out your car to trusted drivers
            </p>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="car-card text-center">
              <CardContent className="p-6">
                <DollarSign className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Earn Extra Income</h3>
                <p className="text-muted-foreground">Make money from your idle vehicle</p>
              </CardContent>
            </Card>
            <Card className="car-card text-center">
              <CardContent className="p-6">
                <Car className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Easy Management</h3>
                <p className="text-muted-foreground">Simple booking and rental process</p>
              </CardContent>
            </Card>
            <Card className="car-card text-center">
              <CardContent className="p-6">
                <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Full Insurance</h3>
                <p className="text-muted-foreground">Complete coverage for your vehicle</p>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <Card className="car-card">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Owner Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-6">Owner Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="ownerName">Full Name *</Label>
                      <Input
                        id="ownerName"
                        value={formData.ownerName}
                        onChange={(e) => handleInputChange('ownerName', e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="ownerEmail">Email Address *</Label>
                      <Input
                        id="ownerEmail"
                        type="email"
                        value={formData.ownerEmail}
                        onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="ownerPhone">Phone Number *</Label>
                      <Input
                        id="ownerPhone"
                        type="tel"
                        value={formData.ownerPhone}
                        onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Vehicle Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-6">Vehicle Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label htmlFor="vehicleName">Vehicle Name *</Label>
                      <Input
                        id="vehicleName"
                        value={formData.vehicleName}
                        onChange={(e) => handleInputChange('vehicleName', e.target.value)}
                        placeholder="e.g., BMW 5 Series"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="brand">Brand *</Label>
                      <Input
                        id="brand"
                        value={formData.brand}
                        onChange={(e) => handleInputChange('brand', e.target.value)}
                        placeholder="e.g., BMW, Audi, Toyota"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="model">Model *</Label>
                      <Input
                        id="model"
                        value={formData.model}
                        onChange={(e) => handleInputChange('model', e.target.value)}
                        placeholder="e.g., 5 Series, Q7, Camry"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        type="number"
                        value={formData.year}
                        onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                        min="2000"
                        max={new Date().getFullYear() + 1}
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Vehicle Type</Label>
                      <Select value={formData.type} onValueChange={(value: any) => handleInputChange('type', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {carTypes.filter(type => type.value !== 'all').map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Select value={formData.city} onValueChange={(value) => handleInputChange('city', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="fuel">Fuel Type</Label>
                      <Select value={formData.fuel} onValueChange={(value: any) => handleInputChange('fuel', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="petrol">Petrol</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="transmission">Transmission</Label>
                      <Select value={formData.transmission} onValueChange={(value: any) => handleInputChange('transmission', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automatic">Automatic</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="seats">Number of Seats</Label>
                      <Input
                        id="seats"
                        type="number"
                        value={formData.seats}
                        onChange={(e) => handleInputChange('seats', parseInt(e.target.value))}
                        min="2"
                        max="8"
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div>
                  <h3 className="text-xl font-semibold mb-6">Pricing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="pricePerHour">Price per Hour ($)</Label>
                      <Input
                        id="pricePerHour"
                        type="number"
                        value={formData.pricePerHour}
                        onChange={(e) => handleInputChange('pricePerHour', parseFloat(e.target.value))}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pricePerDay">Price per Day ($) *</Label>
                      <Input
                        id="pricePerDay"
                        type="number"
                        value={formData.pricePerDay}
                        onChange={(e) => handleInputChange('pricePerDay', parseFloat(e.target.value))}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pricePerWeek">Price per Week ($)</Label>
                      <Input
                        id="pricePerWeek"
                        type="number"
                        value={formData.pricePerWeek}
                        onChange={(e) => handleInputChange('pricePerWeek', parseFloat(e.target.value))}
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-6">Vehicle Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {availableFeatures.map(feature => (
                      <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.features.includes(feature)}
                          onChange={() => toggleFeature(feature)}
                          className="rounded border-border"
                        />
                        <span className="text-sm">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your vehicle, its condition, and any special notes..."
                    rows={4}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <Label htmlFor="image">Vehicle Image</Label>
                  <div className="mt-2">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full btn-hero text-lg py-4"
                >
                  Submit Vehicle for Review
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};