import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, Shield, Truck } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-petsy-coral/20 to-petsy-blue/20 flex items-center">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <Badge className="bg-petsy-coral/10 text-petsy-coral border-petsy-coral/20">
              <Star className="w-4 h-4 mr-2 fill-current" />
              Loved by 50,000+ pet parents
            </Badge>
            
            <div className="space-y-6">
              <h1 className="font-heading text-5xl lg:text-6xl font-bold text-petsy-dark leading-tight">
                Tired of fur-covered 
                <span className="text-petsy-coral"> everything?</span>
              </h1>
              
              <p className="text-xl text-muted-foreground font-body">
                Reclaim your home in 30 seconds with our revolutionary pet hair removal tool. 
                Love your pets, not their hair.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-petsy-coral hover:bg-petsy-coral/90 text-white font-heading text-lg px-8 py-6">
                Shop Now - $49.99
              </Button>
              <Button variant="outline" size="lg" className="border-petsy-coral text-petsy-coral hover:bg-petsy-coral hover:text-white font-heading text-lg px-8 py-6">
                Watch Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 pt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-5 h-5 text-petsy-coral" />
                <span>1-Year Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="w-5 h-5 text-petsy-coral" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="w-5 h-5 text-petsy-coral fill-current" />
                <span>4.8/5 Stars (2,847 reviews)</span>
              </div>
            </div>
          </div>

          {/* Product showcase */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop"
                alt="Petsy Pro Hair Remover in action"
                className="w-full h-auto rounded-2xl"
              />
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                Low Stock!
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm">
                Last purchased 12 minutes ago
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute -z-10 top-8 left-8 w-full h-full bg-petsy-blue/20 rounded-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;