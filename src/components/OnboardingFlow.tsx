
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '../types';

interface OnboardingFlowProps {
  onUserCreated: (user: User) => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onUserCreated }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: ''
  });

  const calculateDailyCalorieGoal = (weight: number, height: number, age: number, gender: string, activityLevel: string) => {
    // Harris-Benedict Equation
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    return Math.round(bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers]);
  };

  const handleSubmit = () => {
    const dailyCalorieGoal = calculateDailyCalorieGoal(
      parseInt(formData.weight),
      parseInt(formData.height),
      parseInt(formData.age),
      formData.gender,
      formData.activityLevel
    );

    const user: User = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      age: parseInt(formData.age),
      gender: formData.gender as 'male' | 'female' | 'other',
      height: parseInt(formData.height),
      weight: parseInt(formData.weight),
      activityLevel: formData.activityLevel as User['activityLevel'],
      dailyCalorieGoal,
      createdAt: new Date()
    };

    onUserCreated(user);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">📸</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Welcome to CalorieSnap
          </CardTitle>
          <p className="text-gray-600">Step {step} of 3</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter your email"
                />
              </div>
              <Button 
                onClick={nextStep} 
                className="w-full bg-green-500 hover:bg-green-600"
                disabled={!formData.name || !formData.email}
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    placeholder="25"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select onValueChange={(value) => setFormData({...formData, gender: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                    placeholder="170"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    placeholder="70"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={prevStep} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={nextStep} 
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  disabled={!formData.age || !formData.gender || !formData.height || !formData.weight}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <Label>Activity Level</Label>
                <Select onValueChange={(value) => setFormData({...formData, activityLevel: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                    <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="very_active">Very Active (very hard exercise, physical job)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={prevStep} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  disabled={!formData.activityLevel}
                >
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
