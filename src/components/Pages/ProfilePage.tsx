import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Calendar, MapPin, Star, Car, CreditCard, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalBookings: number;
  totalSpent: number;
}

interface Booking {
  bookingId: string;
  carId: string;
  carName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  rentalPlan: 'hourly' | 'daily' | 'weekly';
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  totalCost: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface ProfilePageProps {
  onPageChange: (page: string) => void;
}

export const ProfilePage = ({ onPageChange }: ProfilePageProps) => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: '2024-01-15',
    totalBookings: 0,
    totalSpent: 0
  });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load user profile from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    // Load bookings from localStorage
    const savedBookings = localStorage.getItem('carBookings');
    if (savedBookings) {
      const allBookings = JSON.parse(savedBookings);
      setBookings(allBookings);
      
      // Calculate total bookings and spent
      const totalBookings = allBookings.length;
      const totalSpent = allBookings.reduce((sum: number, booking: Booking) => sum + booking.totalCost, 0);
      
      setProfile(prev => ({
        ...prev,
        totalBookings,
        totalSpent
      }));
    }
  }, []);

  const handleProfileUpdate = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const cancelBooking = (bookingId: string) => {
    const updatedBookings = bookings.map(booking =>
      booking.bookingId === bookingId
        ? { ...booking, status: 'cancelled' as const }
        : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('carBookings', JSON.stringify(updatedBookings));
    
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'status-available';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'status-rented';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              My Profile
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your account and view your rental history
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile & Stats</TabsTrigger>
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-8">
              {/* Profile Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="car-card text-center">
                  <CardContent className="p-6">
                    <Car className="h-12 w-12 text-accent mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-accent">{profile.totalBookings}</h3>
                    <p className="text-muted-foreground">Total Rentals</p>
                  </CardContent>
                </Card>
                <Card className="car-card text-center">
                  <CardContent className="p-6">
                    <CreditCard className="h-12 w-12 text-accent mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-accent">${profile.totalSpent}</h3>
                    <p className="text-muted-foreground">Total Spent</p>
                  </CardContent>
                </Card>
                <Card className="car-card text-center">
                  <CardContent className="p-6">
                    <Calendar className="h-12 w-12 text-accent mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-accent">{formatDate(profile.joinDate)}</h3>
                    <p className="text-muted-foreground">Member Since</p>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Information */}
              <Card className="car-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile Information
                  </CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="joinDate">Join Date</Label>
                      <Input
                        id="joinDate"
                        type="date"
                        value={profile.joinDate}
                        disabled
                      />
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end">
                      <Button onClick={handleProfileUpdate} className="btn-hero">
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              {bookings.length > 0 ? (
                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <Card key={booking.bookingId} className="car-card">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <h3 className="text-xl font-semibold">{booking.carName}</h3>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                Pickup: {formatDate(booking.pickupDate)} at {booking.pickupTime}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                Dropoff: {formatDate(booking.dropoffDate)} at {booking.dropoffTime}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                Plan: {booking.rentalPlan.charAt(0).toUpperCase() + booking.rentalPlan.slice(1)}
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                Booking ID: {booking.bookingId}
                              </span>
                              <span className="text-lg font-bold text-accent">
                                ${booking.totalCost}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            {booking.status === 'confirmed' && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => cancelBooking(booking.bookingId)}
                              >
                                Cancel Booking
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onPageChange('cars')}
                            >
                              Book Again
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="car-card">
                  <CardContent className="p-12 text-center">
                    <Car className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                    <h3 className="text-xl font-semibold mb-4">No Bookings Yet</h3>
                    <p className="text-muted-foreground mb-6">
                      You haven't made any car reservations yet. Start exploring our amazing fleet!
                    </p>
                    <Button 
                      onClick={() => onPageChange('cars')}
                      className="btn-hero"
                    >
                      Browse Cars
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};