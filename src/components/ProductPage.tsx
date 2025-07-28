import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Star, Shield, Truck, RotateCcw, Heart, Share2, Minus, Plus } from 'lucide-react';
import { featuredProduct } from '../data/products';

const ProductPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');

  const product = featuredProduct;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative">
            <img 
              src={product.images[currentImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl"
            />
            {product.lowStock && (
              <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                Low Stock Alert
              </Badge>
            )}
          </div>
          
          <div className="flex gap-4 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  currentImage === index ? 'border-petsy-coral' : 'border-border'
                }`}
              >
                <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="font-heading text-4xl font-bold text-petsy-dark mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-petsy-coral">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
            {product.originalPrice && (
              <Badge className="bg-green-100 text-green-800">
                Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
              </Badge>
            )}
          </div>

          {/* USPs */}
          <div className="space-y-3">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-petsy-coral"></div>
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="flex-1 bg-petsy-coral hover:bg-petsy-coral/90 text-white font-heading text-lg"
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 pt-6 border-t">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-5 h-5 text-petsy-coral" />
              <span>1-Year Guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-5 h-5 text-petsy-coral" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="w-5 h-5 text-petsy-coral" />
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-4">Product Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description} Our revolutionary pet hair removal tool uses advanced technology 
                  to effortlessly remove pet hair from any surface. Whether it's your couch, car seats, 
                  clothing, or carpets, the Petsy Pro Hair Remover gets the job done in seconds.
                </p>
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-petsy-coral mt-2"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  {/* Sample reviews */}
                  <div className="border-b pb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="font-semibold">Sarah M.</span>
                      <Badge variant="outline">Verified Purchase</Badge>
                    </div>
                    <p className="text-muted-foreground">
                      "This is amazing! I have two golden retrievers and this tool removes all their hair 
                      from my furniture in seconds. So much better than lint rollers!"
                    </p>
                  </div>
                  
                  <div className="border-b pb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="font-semibold">Mike K.</span>
                      <Badge variant="outline">Verified Purchase</Badge>
                    </div>
                    <p className="text-muted-foreground">
                      "Works exactly as advertised. Easy to clean and reuse. My cat's hair comes right off 
                      everything. Highly recommend!"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="shipping" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-4">Shipping & Returns</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Shipping Information</h4>
                    <p className="text-muted-foreground">
                      Free standard shipping on all orders. Delivery within 3-5 business days.
                      Express shipping available for next-day delivery.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Return Policy</h4>
                    <p className="text-muted-foreground">
                      30-day money-back guarantee. If you're not completely satisfied, 
                      return your item for a full refund within 30 days of purchase.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Warranty</h4>
                    <p className="text-muted-foreground">
                      1-year manufacturer warranty covers all defects and normal wear.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductPage;