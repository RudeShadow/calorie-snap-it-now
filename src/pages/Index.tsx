
import React, { useState, useEffect } from 'react';
import OnboardingFlow from '../components/OnboardingFlow';
import Dashboard from '../components/Dashboard';
import MealHistory from '../components/MealHistory';
import { User, Meal } from '../types';

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'onboarding' | 'dashboard' | 'history'>('onboarding');
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    // Check for existing user data
    const savedUser = localStorage.getItem('calorieSnapUser');
    const savedMeals = localStorage.getItem('calorieSnapMeals');
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setCurrentView('dashboard');
    }
    
    if (savedMeals) {
      setMeals(JSON.parse(savedMeals));
    }
  }, []);

  const handleUserCreated = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('calorieSnapUser', JSON.stringify(user));
    setCurrentView('dashboard');
  };

  const handleMealLogged = (meal: Meal) => {
    const updatedMeals = [meal, ...meals];
    setMeals(updatedMeals);
    localStorage.setItem('calorieSnapMeals', JSON.stringify(updatedMeals));
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'onboarding':
        return <OnboardingFlow onUserCreated={handleUserCreated} />;
      case 'dashboard':
        return (
          <Dashboard 
            user={currentUser}
            meals={meals}
            onMealLogged={handleMealLogged}
            onViewHistory={() => setCurrentView('history')}
          />
        );
      case 'history':
        return (
          <MealHistory 
            meals={meals}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      default:
        return <OnboardingFlow onUserCreated={handleUserCreated} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentView()}
    </div>
  );
};

export default Index;
