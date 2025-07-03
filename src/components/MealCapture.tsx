
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

  // Enhanced food recognition database with more variety
  const foodDatabase = [
    {
      keywords: ['salad', 'green', 'lettuce', 'vegetables', 'leafy', 'tomato', 'cucumber'],
      dishName: 'Mixed Green Salad',
      nutritionalInfo: { calories: 150, protein: 8, carbs: 12, fats: 9, healthScore: 9 }
    },
    {
      keywords: ['pasta', 'spaghetti', 'noodles', 'sauce', 'italian', 'red sauce'],
      dishName: 'Spaghetti Bolognese',
      nutritionalInfo: { calories: 520, protein: 25, carbs: 65, fats: 18, healthScore: 6 }
    },
    {
      keywords: ['chicken', 'breast', 'grilled', 'white meat', 'poultry'],
      dishName: 'Grilled Chicken Breast',
      nutritionalInfo: { calories: 280, protein: 35, carbs: 2, fats: 12, healthScore: 8 }
    },
    {
      keywords: ['burger', 'hamburger', 'beef', 'bun', 'patty', 'sandwich'],
      dishName: 'Beef Burger',
      nutritionalInfo: { calories: 650, protein: 28, carbs: 45, fats: 38, healthScore: 4 }
    },
    {
      keywords: ['pizza', 'cheese', 'dough', 'round', 'slice', 'italian'],
      dishName: 'Margherita Pizza',
      nutritionalInfo: { calories: 450, protein: 18, carbs: 55, fats: 16, healthScore: 5 }
    },
    {
      keywords: ['rice', 'bowl', 'asian', 'grain', 'white rice', 'brown rice'],
      dishName: 'Chicken Rice Bowl',
      nutritionalInfo: { calories: 420, protein: 30, carbs: 48, fats: 12, healthScore: 7 }
    },
    {
      keywords: ['fish', 'salmon', 'seafood', 'fillet', 'pink', 'omega'],
      dishName: 'Grilled Salmon',
      nutritionalInfo: { calories: 350, protein: 39, carbs: 0, fats: 20, healthScore: 9 }
    },
    {
      keywords: ['soup', 'broth', 'liquid', 'bowl', 'hot', 'vegetable'],
      dishName: 'Vegetable Soup',
      nutritionalInfo: { calories: 120, protein: 4, carbs: 18, fats: 3, healthScore: 8 }
    },
    {
      keywords: ['sandwich', 'bread', 'turkey', 'deli', 'meat', 'sliced'],
      dishName: 'Turkey Sandwich',
      nutritionalInfo: { calories: 380, protein: 25, carbs: 35, fats: 15, healthScore: 7 }
    },
    {
      keywords: ['egg', 'scrambled', 'fried', 'breakfast', 'yellow', 'protein'],
      dishName: 'Scrambled Eggs',
      nutritionalInfo: { calories: 220, protein: 18, carbs: 2, fats: 16, healthScore: 7 }
    },
    {
      keywords: ['fruit', 'apple', 'banana', 'berry', 'healthy', 'sweet'],
      dishName: 'Fresh Fruit Bowl',
      nutritionalInfo: { calories: 180, protein: 2, carbs: 45, fats: 1, healthScore: 10 }
    },
    {
      keywords: ['yogurt', 'granola', 'berry', 'parfait', 'breakfast', 'creamy'],
      dishName: 'Greek Yogurt Parfait',
      nutritionalInfo: { calories: 250, protein: 15, carbs: 35, fats: 8, healthScore: 8 }
    }
  ];

  // Simulate more sophisticated image analysis
  const analyzeImageContent = async (imageData: string): Promise<string[]> => {
    // In a real app, this would use an AI vision API
    // For MVP, we'll simulate analysis by extracting some "features"
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple heuristic: analyze image properties to suggest keywords
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    return new Promise((resolve) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        // Get image data for basic color analysis
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData?.data || [];
        
        let redSum = 0, greenSum = 0, blueSum = 0;
        for (let i = 0; i < data.length; i += 4) {
          redSum += data[i];
          greenSum += data[i + 1];
          blueSum += data[i + 2];
        }
        
        const pixelCount = data.length / 4;
        const avgRed = redSum / pixelCount;
        const avgGreen = greenSum / pixelCount;
        const avgBlue = blueSum / pixelCount;
        
        // Basic color-based food detection
        const detectedFeatures: string[] = [];
        
        if (avgGreen > avgRed && avgGreen > avgBlue) {
          detectedFeatures.push('green', 'vegetables', 'leafy', 'salad');
        }
        
        if (avgRed > 150 && avgGreen < 100) {
          detectedFeatures.push('red sauce', 'tomato', 'pasta');
        }
        
        if (avgRed > 200 && avgGreen > 150 && avgBlue < 100) {
          detectedFeatures.push('cheese', 'yellow', 'egg');
        }
        
        if (avgRed > 120 && avgGreen > 80 && avgBlue > 60) {
          detectedFeatures.push('meat', 'chicken', 'beef');
        }
        
        if (avgBlue > avgRed && avgBlue > avgGreen) {
          detectedFeatures.push('fish', 'seafood', 'blue');
        }
        
        // If no specific colors detected, add general features
        if (detectedFeatures.length === 0) {
          detectedFeatures.push('food', 'meal', 'dish');
        }
        
        resolve(detectedFeatures);
      };
      
      img.src = imageData;
    });
  };

  const findBestMatch = (detectedFeatures: string[]): typeof foodDatabase[0] => {
    let bestMatch = foodDatabase[0];
    let highestScore = 0;
    
    for (const food of foodDatabase) {
      let score = 0;
      for (const keyword of food.keywords) {
        if (detectedFeatures.includes(keyword)) {
          score += 1;
        }
        // Partial matches for better recognition
        for (const feature of detectedFeatures) {
          if (keyword.includes(feature) || feature.includes(keyword)) {
            score += 0.5;
          }
        }
      }
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = food;
      }
    }
    
    // If no good match found, return a random item (fallback)
    if (highestScore === 0) {
      const randomIndex = Math.floor(Math.random() * foodDatabase.length);
      return foodDatabase[randomIndex];
    }
    
    return bestMatch;
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
    
    try {
      // Analyze the image content
      const detectedFeatures = await analyzeImageContent(capturedImage);
      console.log('Detected features:', detectedFeatures);
      
      // Find the best matching food
      const result = findBestMatch(detectedFeatures);
      console.log('Best match:', result.dishName);
      
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Fallback to random selection
      const randomIndex = Math.floor(Math.random() * foodDatabase.length);
      setAnalysisResult(foodDatabase[randomIndex]);
    }
    
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
                  <p className="text-sm text-gray-400 mt-1">Detecting food type and calculating nutrition</p>
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
