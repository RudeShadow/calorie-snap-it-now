import Hero from '../components/Hero';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Star, ArrowRight, Shield, Truck, RotateCcw } from 'lucide-react';
import { products } from '../data/products';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-petsy-dark mb-4">
              Why Choose Petsy?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Scientifically proven technology meets pet parent needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-petsy-coral/10 flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-petsy-coral" />
                </div>
                <h3 className="font-heading text-xl font-semibold">Vet Approved</h3>
                <p className="text-muted-foreground">
                  Gentle on pet skin and recommended by veterinarians nationwide
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-petsy-blue/10 flex items-center justify-center mx-auto">
                  <Truck className="w-8 h-8 text-petsy-blue" />
                </div>
                <h3 className="font-heading text-xl font-semibold">Works Everywhere</h3>
                <p className="text-muted-foreground">
                  Furniture, clothing, car seats, carpets - one tool for everything
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-petsy-coral/10 flex items-center justify-center mx-auto">
                  <RotateCcw className="w-8 h-8 text-petsy-coral" />
                </div>
                <h3 className="font-heading text-xl font-semibold">Self-Cleaning</h3>
                <p className="text-muted-foreground">
                  No messy disposal - simply rinse and reuse forever
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-petsy-dark mb-4">
              Our Products
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the perfect hair removal solution for your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  {product.originalPrice && (
                    <Badge className="absolute top-4 left-4 bg-green-500 text-white">
                      Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviewCount})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-petsy-coral">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button size="sm" className="bg-petsy-coral hover:bg-petsy-coral/90">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-petsy-coral/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-petsy-dark mb-4">
              Join 50,000+ Happy Pet Parents
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our customers are saying about Petsy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                pet: "Golden Retriever",
                review: "This changed my life! No more hair all over my couch. Works like magic!",
                rating: 5
              },
              {
                name: "Mike K.",
                pet: "Persian Cat",
                review: "Amazing product. So easy to use and clean. My cat doesn't mind it at all.",
                rating: 5
              },
              {
                name: "Jenny L.",
                pet: "German Shepherd",
                review: "Best investment for pet owners. Saves me hours of cleaning every week.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 text-center">
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "{testimonial.review}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.pet} Parent</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-petsy-coral to-petsy-blue text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-heading text-4xl font-bold mb-4">
            Ready to Reclaim Your Home?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied pet parents and say goodbye to pet hair forever
          </p>
          <Button 
            size="lg" 
            className="bg-white text-petsy-coral hover:bg-white/90 font-heading text-lg px-8 py-6"
          >
            Shop Now - Free Shipping
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;