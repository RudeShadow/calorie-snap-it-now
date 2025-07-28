import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, ShoppingCart, Search, User, Heart } from 'lucide-react';

const Header = () => {
  const [cartItems] = useState(2); // Mock cart items

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="font-heading text-2xl font-bold text-petsy-coral">
              Petsy
            </h1>
            <span className="ml-2 text-sm text-muted-foreground hidden sm:block">
              Love your pets, not their hair
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-petsy-coral transition-colors">
              Home
            </a>
            <a href="#products" className="text-foreground hover:text-petsy-coral transition-colors">
              Products
            </a>
            <a href="#reviews" className="text-foreground hover:text-petsy-coral transition-colors">
              Reviews
            </a>
            <a href="#blog" className="text-foreground hover:text-petsy-coral transition-colors">
              Blog
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Search className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Heart className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <User className="w-4 h-4" />
            </Button>

            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="w-4 h-4" />
              {cartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-petsy-coral">
                  {cartItems}
                </Badge>
              )}
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-6 mt-8">
                  <a href="#home" className="text-lg font-heading hover:text-petsy-coral transition-colors">
                    Home
                  </a>
                  <a href="#products" className="text-lg font-heading hover:text-petsy-coral transition-colors">
                    Products
                  </a>
                  <a href="#reviews" className="text-lg font-heading hover:text-petsy-coral transition-colors">
                    Reviews
                  </a>
                  <a href="#blog" className="text-lg font-heading hover:text-petsy-coral transition-colors">
                    Blog
                  </a>
                  <div className="pt-6 border-t space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Heart className="w-4 h-4 mr-2" />
                      Wishlist
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Account
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Free shipping banner */}
      <div className="bg-petsy-coral text-white text-center py-2 text-sm font-medium">
        🚚 Free shipping on all orders over $35 - Limited time offer!
      </div>
    </header>
  );
};

export default Header;