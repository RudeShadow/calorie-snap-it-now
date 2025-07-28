
import { useState } from 'react';
import Header from '../components/Header';
import Home from './Home';
import ProductPage from '../components/ProductPage';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'product'>('home');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'product':
        return <ProductPage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {renderCurrentView()}
    </div>
  );
};

export default Index;
