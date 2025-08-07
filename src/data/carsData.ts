import sedanImage from '@/assets/car-sedan.jpg';
import suvImage from '@/assets/car-suv.jpg';
import hatchbackImage from '@/assets/car-hatchback.jpg';

export interface Car {
  id: string;
  name: string;
  type: 'sedan' | 'suv' | 'hatchback' | 'luxury';
  image: string;
  rating: number;
  reviews: number;
  pricePerHour: number;
  pricePerDay: number;
  pricePerWeek: number;
  location: string;
  available: boolean;
  features: string[];
  fuel: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatic';
  seats: number;
  year: number;
  brand: string;
  model: string;
}

export const carsData: Car[] = [
  {
    id: '1',
    name: 'BMW 5 Series',
    type: 'luxury',
    image: sedanImage,
    rating: 4.9,
    reviews: 127,
    pricePerHour: 25,
    pricePerDay: 180,
    pricePerWeek: 1100,
    location: 'New York',
    available: true,
    features: ['GPS Navigation', 'Leather Seats', 'Sunroof', 'Premium Audio'],
    fuel: 'petrol',
    transmission: 'automatic',
    seats: 5,
    year: 2023,
    brand: 'BMW',
    model: '5 Series'
  },
  {
    id: '2',
    name: 'Audi Q7',
    type: 'suv',
    image: suvImage,
    rating: 4.8,
    reviews: 89,
    pricePerHour: 30,
    pricePerDay: 220,
    pricePerWeek: 1400,
    location: 'Los Angeles',
    available: true,
    features: ['7 Seats', 'All-Wheel Drive', 'Premium Audio', 'Parking Sensors'],
    fuel: 'petrol',
    transmission: 'automatic',
    seats: 7,
    year: 2023,
    brand: 'Audi',
    model: 'Q7'
  },
  {
    id: '3',
    name: 'Volkswagen Golf',
    type: 'hatchback',
    image: hatchbackImage,
    rating: 4.6,
    reviews: 203,
    pricePerHour: 15,
    pricePerDay: 95,
    pricePerWeek: 550,
    location: 'Chicago',
    available: true,
    features: ['Fuel Efficient', 'Bluetooth', 'Air Conditioning', 'USB Ports'],
    fuel: 'petrol',
    transmission: 'manual',
    seats: 5,
    year: 2022,
    brand: 'Volkswagen',
    model: 'Golf'
  },
  {
    id: '4',
    name: 'Mercedes C-Class',
    type: 'luxury',
    image: sedanImage,
    rating: 4.9,
    reviews: 156,
    pricePerHour: 28,
    pricePerDay: 200,
    pricePerWeek: 1250,
    location: 'Miami',
    available: false,
    features: ['Premium Interior', 'Advanced Safety', 'Wireless Charging', 'Ambient Lighting'],
    fuel: 'petrol',
    transmission: 'automatic',
    seats: 5,
    year: 2023,
    brand: 'Mercedes',
    model: 'C-Class'
  },
  {
    id: '5',
    name: 'Tesla Model Y',
    type: 'suv',
    image: suvImage,
    rating: 4.8,
    reviews: 94,
    pricePerHour: 35,
    pricePerDay: 250,
    pricePerWeek: 1600,
    location: 'San Francisco',
    available: true,
    features: ['Electric', 'Autopilot', 'Supercharging', 'Premium Connectivity'],
    fuel: 'electric',
    transmission: 'automatic',
    seats: 5,
    year: 2023,
    brand: 'Tesla',
    model: 'Model Y'
  },
  {
    id: '6',
    name: 'Honda Civic',
    type: 'sedan',
    image: sedanImage,
    rating: 4.5,
    reviews: 178,
    pricePerHour: 18,
    pricePerDay: 120,
    pricePerWeek: 700,
    location: 'Boston',
    available: true,
    features: ['Reliable', 'Fuel Efficient', 'Safety Features', 'Spacious Interior'],
    fuel: 'petrol',
    transmission: 'automatic',
    seats: 5,
    year: 2022,
    brand: 'Honda',
    model: 'Civic'
  },
  {
    id: '7',
    name: 'Range Rover Evoque',
    type: 'suv',
    image: suvImage,
    rating: 4.7,
    reviews: 67,
    pricePerHour: 40,
    pricePerDay: 300,
    pricePerWeek: 1900,
    location: 'Seattle',
    available: true,
    features: ['Luxury Interior', 'Off-Road Capable', 'Panoramic Roof', 'Premium Sound'],
    fuel: 'petrol',
    transmission: 'automatic',
    seats: 5,
    year: 2023,
    brand: 'Land Rover',
    model: 'Range Rover Evoque'
  },
  {
    id: '8',
    name: 'Mini Cooper',
    type: 'hatchback',
    image: hatchbackImage,
    rating: 4.4,
    reviews: 142,
    pricePerHour: 16,
    pricePerDay: 110,
    pricePerWeek: 650,
    location: 'Austin',
    available: true,
    features: ['Compact Size', 'Fun to Drive', 'Unique Design', 'Good Fuel Economy'],
    fuel: 'petrol',
    transmission: 'manual',
    seats: 4,
    year: 2022,
    brand: 'Mini',
    model: 'Cooper'
  }
];

export const cities = [
  'New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco', 
  'Boston', 'Seattle', 'Austin', 'Denver', 'Atlanta'
];

export const carTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'luxury', label: 'Luxury' }
];