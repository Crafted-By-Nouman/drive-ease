import { useState, useEffect } from 'react';
import { Header } from '@/components/Layout/Header';
import { HomePage } from '@/components/Pages/HomePage';
import { CarsPage } from '@/components/Pages/CarsPage';
import { BookingPage } from '@/components/Pages/BookingPage';
import { OwnerPage } from '@/components/Pages/OwnerPage';
import { ProfilePage } from '@/components/Pages/ProfilePage';
import { ContactPage } from '@/components/Pages/ContactPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCarId, setSelectedCarId] = useState<string | undefined>();

  // Handle page changes with optional car ID for booking
  const handlePageChange = (page: string, carId?: string) => {
    setCurrentPage(page);
    setSelectedCarId(carId);
    
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle back button navigation
  useEffect(() => {
    const handlePopState = () => {
      // Simple browser back button handling
      if (currentPage !== 'home') {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage]);

  // Add scroll animations on component mount
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, [currentPage]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={handlePageChange} />;
      case 'cars':
        return <CarsPage onPageChange={handlePageChange} />;
      case 'booking':
        return <BookingPage carId={selectedCarId} onPageChange={handlePageChange} />;
      case 'owner':
        return <OwnerPage onPageChange={handlePageChange} />;
      case 'profile':
        return <ProfilePage onPageChange={handlePageChange} />;
      case 'contact':
        return <ContactPage onPageChange={handlePageChange} />;
      default:
        return <HomePage onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onPageChange={handlePageChange} />
      <main>
        {renderCurrentPage()}
      </main>
      
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-3 bg-gradient-accent text-accent-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
        aria-label="Back to top"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
};

export default Index;
