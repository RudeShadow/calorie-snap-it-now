
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, X, RefreshCw } from 'lucide-react';
import { Meal, NutritionalInfo } from '../types';

interface MealCaptureProps {
  onMealCaptured: (meal: Meal) => void;
  onClose: () => void;
  userId: string;
}

const MealCapture: React.FC<MealCaptureProps> = ({ onMealCaptured, onClose, userId }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    dishName: string;
    nutritionalInfo: NutritionalInfo;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated food recognition database
  const foodDatabase = [
    {
      keywords: ['salad', 'green', 'lettuce', 'vegetables'],
      dishName: 'Mixed Green Salad',
      nutritionalInfo: { calories: 150, protein: 8, carbs: 12, fats: 9, healthScore: 9 }
    },
    {
      keywords: ['pasta', 'spaghetti', 'noodles'],
      dishName: 'Spaghetti Bolognese',
      nutritionalInfo: { calories: 520, protein: 25, carbs: 65, fats: 18, healthScore: 6 }
    },
    {
      keywords: ['chicken', 'breast', 'grilled'],
      dishName: 'Grilled Chicken Breast',
      nutritionalInfo: { calories: 280, protein: 35, carbs: 2, fats: 12, healthScore: 8 }
    },
    {
      keywords: ['burger', 'hamburger', 'beef'],
      dishName: 'Beef Burger',
      nutritionalInfo: { calories: 650, protein: 28, carbs: 45, fats: 38, healthScore: 4 }
    },
    {
      keywords: ['pizza', 'cheese', 'tomato'],
      dishName: 'Margherita Pizza',
      nutritionalInfo: { calories: 450, protein: 18, carbs: 55, fats: 16, healthScore: 5 }
    },
    {
      keywords: ['rice', 'bowl', 'asian'],
      dishName: 'Chicken Rice Bowl',
      nutritionalInfo: { calories: 420, protein: 30, carbs: 48, fats: 12, healthScore: 7 }
    }
  ];

  const simulateFoodRecognition = (): typeof foodDatabase[0] => {
    // For MVP, randomly select a food item to simulate AI recognition
    const randomIndex = Math.floor(Math.random() * foodDatabase.length);
    return foodDatabase[randomIndex];
  };

  const handleImageCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);
    
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = simulateFoodRecognition();
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const confirmMeal = () => {
    if (!analysisResult) return;

    const meal: Meal = {
      id: Date.now().toString(),
      userId,
      dishName: analysisResult.dishName,
      imageUrl: capturedImage || undefined,
      nutritionalInfo: analysisResult.nutritionalInfo,
      timestamp: new Date(),
      confidence: Math.random() * 0.3 + 0.7 // Simulate 70-100% confidence
    };

    onMealCaptured(meal);
    onClose();
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 text-white">
        <h2 className="text-lg font-semibold">Snap Your Meal</h2>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-gray-800">
          <X size={24} />
        </Button>
      </div>

      {/* Camera/Image Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {!capturedImage ? (
          <div className="w-full max-w-sm">
            <div className="aspect-square bg-gray-800 rounded-lg border-2 border-dashed border-gray-600 flex flex-col items-center justify-center">
              <Camera size={64} className="text-gray-400 mb-4" />
              <p className="text-gray-400 text-center mb-4">Take a photo of your meal</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageCapture}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-green-500 hover:bg-green-600"
              >
                <Camera size={20} className="mr-2" />
                Take Photo
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-sm space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img 
                src={capturedImage} 
                alt="Captured meal" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {isAnalyzing && (
              <Card className="bg-gray-800 text-white">
                <CardContent className="p-4 text-center">
                  <RefreshCw className="animate-spin mx-auto mb-2" size={24} />
                  <p>Analyzing your meal...</p>
                  <p className="text-sm text-gray-400 mt-1">This may take a moment</p>
                </CardContent>
              </Card>
            )}

            {analysisResult && !isAnalyzing && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">{analysisResult.dishName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {analysisResult.nutritionalInfo.calories}
                      </p>
                      <p className="text-sm text-gray-600">Calories</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        {analysisResult.nutritionalInfo.healthScore}/10
                      </p>
                      <p className="text-sm text-gray-600">Health Score</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <p className="font-semibold text-blue-500">
                        {analysisResult.nutritionalInfo.protein}g
                      </p>
                      <p className="text-gray-600">Protein</p>
                    </div>
                    <div>
                      <p className="font-semibold text-orange-500">
                        {analysisResult.nutritionalInfo.carbs}g
                      </p>
                      <p className="text-gray-600">Carbs</p>
                    </div>
                    <div>
                      <p className="font-semibold text-purple-500">
                        {analysisResult.nutritionalInfo.fats}g
                      </p>
                      <p className="text-gray-600">Fats</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={retakePhoto} className="flex-1">
                Retake
              </Button>
              {!analysisResult && !isAnalyzing && (
                <Button onClick={analyzeImage} className="flex-1 bg-blue-500 hover:bg-blue-600">
                  Analyze
                </Button>
              )}
              {analysisResult && !isAnalyzing && (
                <Button onClick={confirmMeal} className="flex-1 bg-green-500 hover:bg-green-600">
                  Log Meal
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealCapture;
