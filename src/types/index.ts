
export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // in cm
  weight: number; // in kg
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  dailyCalorieGoal: number;
  createdAt: Date;
}

export interface NutritionalInfo {
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fats: number; // in grams
  healthScore: number; // 1-10
}

export interface Meal {
  id: string;
  userId: string;
  dishName: string;
  imageUrl?: string;
  nutritionalInfo: NutritionalInfo;
  timestamp: Date;
  confidence?: number; // AI confidence level
}
