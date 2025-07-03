
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Meal } from '../types';

interface MealHistoryProps {
  meals: Meal[];
  onBack: () => void;
}

const MealHistory: React.FC<MealHistoryProps> = ({ meals, onBack }) => {
  const groupMealsByDate = (meals: Meal[]) => {
    const grouped: { [key: string]: Meal[] } = {};
    
    meals.forEach(meal => {
      const date = new Date(meal.timestamp).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(meal);
    });
    
    return grouped;
  };

  const groupedMeals = groupMealsByDate(meals);
  const dates = Object.keys(groupedMeals).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getTotalCaloriesForDate = (meals: Meal[]) => {
    return meals.reduce((total, meal) => total + meal.nutritionalInfo.calories, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pt-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold">Meal History</h1>
          <div className="w-8"></div>
        </div>

        {meals.length === 0 ? (
          <Card className="mt-8">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">📸</div>
              <h2 className="text-xl font-semibold mb-2">No meals logged yet</h2>
              <p className="text-gray-600">Start by taking a photo of your first meal!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {dates.map(date => (
              <Card key={date}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{formatDate(date)}</CardTitle>
                    <span className="text-sm text-gray-600">
                      {getTotalCaloriesForDate(groupedMeals[date])} calories
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {groupedMeals[date]
                      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                      .map(meal => (
                        <div key={meal.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                          {meal.imageUrl && (
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <img 
                                src={meal.imageUrl} 
                                alt={meal.dishName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-medium">{meal.dishName}</h3>
                            <p className="text-sm text-gray-600">
                              {new Date(meal.timestamp).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                              <span>P: {meal.nutritionalInfo.protein}g</span>
                              <span>C: {meal.nutritionalInfo.carbs}g</span>
                              <span>F: {meal.nutritionalInfo.fats}g</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{meal.nutritionalInfo.calories}</p>
                            <p className="text-xs text-gray-600">calories</p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs text-green-600 font-medium">
                                {meal.nutritionalInfo.healthScore}/10
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MealHistory;
