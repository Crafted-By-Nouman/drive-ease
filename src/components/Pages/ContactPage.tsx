import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactPageProps {
  onPageChange: (page: string) => void;
}

export const ContactPage = ({ onPageChange }: ContactPageProps) => {
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Save to localStorage (in a real app, this would be sent to a server)
    const contactSubmission = {
      ...formData,
      id: 'CT' + Date.now().toString().slice(-8),
      submittedAt: new Date().toISOString()
    };

    const existingContacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    existingContacts.push(contactSubmission);
    localStorage.setItem('contactSubmissions', JSON.stringify(existingContacts));

    setShowSuccess(true);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
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
                Message Sent Successfully!
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Thank you for reaching out. Our support team will respond within 24 hours.
              </p>
              
              <div className="bg-primary-light rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-lg mb-2">What happens next?</h3>
                <ul className="text-left space-y-2">
                  <li>• We'll review your message within 2 hours</li>
                  <li>• Our support team will contact you via email</li>
                  <li>• For urgent matters, call us at (555) 123-4567</li>
                  <li>• Check your email for our response</li>
                </ul>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={() => setShowSuccess(false)}
                  className="btn-hero w-full"
                >
                  Send Another Message
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? Need support? We're here to help you 24/7
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-accent rounded-lg">
                      <Phone className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone Support</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-sm text-muted-foreground">Available 24/7</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-accent rounded-lg">
                      <Mail className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Support</h3>
                      <p className="text-muted-foreground">support@driveease.com</p>
                      <p className="text-sm text-muted-foreground">Response within 2 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-accent rounded-lg">
                      <MapPin className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Main Office</h3>
                      <p className="text-muted-foreground">
                        123 Business Ave<br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-accent rounded-lg">
                      <Clock className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 6:00 AM - 10:00 PM<br />
                        Saturday - Sunday: 8:00 AM - 8:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Quick Help</h3>
                <div className="space-y-3">
                  <Card className="car-card cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-medium">How do I cancel my booking?</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        You can cancel your booking from your profile page up to 2 hours before pickup.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="car-card cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-medium">What documents do I need?</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Valid driver's license, credit card, and government-issued ID.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="car-card cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-medium">Is insurance included?</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Yes, all rentals include comprehensive insurance coverage.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="car-card">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="What is this regarding?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Please describe your question or issue in detail..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full btn-hero"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
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