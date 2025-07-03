
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera } from 'lucide-react';
import { User, Meal } from '../types';
import MealCapture from './MealCapture';

interface DashboardProps {
  user: User | null;
  meals: Meal[];
  onMealLogged: (meal: Meal) => void;
  onViewHistory: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, meals, onMealLogged, onViewHistory }) => {
  const [showCamera, setShowCamera] = useState(false);

  if (!user) return null;

  const todaysMeals = meals.filter(meal => {
    const today = new Date();
    const mealDate = new Date(meal.timestamp);
    return mealDate.toDateString() === today.toDateString();
  });

  const todaysCalories = todaysMeals.reduce((total, meal) => total + meal.nutritionalInfo.calories, 0);
  const calorieProgress = (todaysCalories / user.dailyCalorieGoal) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {showCamera ? (
        <MealCapture 
          onMealCaptured={onMealLogged}
          onClose={() => setShowCamera(false)}
          userId={user.id}
        />
      ) : (
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="text-center pt-8 pb-4">
            <h1 className="text-2xl font-bold text-gray-800">Hello, {user.name}!</h1>
            <p className="text-gray-600">Ready to track your meals?</p>
          </div>

          {/* Daily Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Calories</span>
                    <span>{todaysCalories} / {user.dailyCalorieGoal}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(calorieProgress, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-500">
                      {todaysMeals.reduce((total, meal) => total + meal.nutritionalInfo.protein, 0)}g
                    </p>
                    <p className="text-sm text-gray-600">Protein</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-500">
                      {todaysMeals.reduce((total, meal) => total + meal.nutritionalInfo.carbs, 0)}g
                    </p>
                    <p className="text-sm text-gray-600">Carbs</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-500">
                      {todaysMeals.reduce((total, meal) => total + meal.nutritionalInfo.fats, 0)}g
                    </p>
                    <p className="text-sm text-gray-600">Fats</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Snap Meal Button */}
          <div className="flex justify-center">
            <Button
              onClick={() => setShowCamera(true)}
              className="w-40 h-40 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center"
            >
              <Camera size={48} className="mb-2" />
              <span className="text-lg font-semibold">Snap Meal</span>
            </Button>
          </div>

          {/* Recent Meals */}
          {todaysMeals.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Today's Meals</CardTitle>
                <Button variant="outline" size="sm" onClick={onViewHistory}>
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaysMeals.slice(0, 3).map((meal) => (
                    <div key={meal.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{meal.dishName}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(meal.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{meal.nutritionalInfo.calories} cal</p>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 mr-1">Health:</span>
                          <span className="text-sm font-medium text-green-600">
                            {meal.nutritionalInfo.healthScore}/10
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
