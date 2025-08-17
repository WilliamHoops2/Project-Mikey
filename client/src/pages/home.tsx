import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import type { Stats, Product } from "@shared/schema";

export default function Home() {
  const { data: stats, isLoading: statsLoading } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  const { data: featuredProducts, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="gradient-dark min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Premium <span className="text-electric-yellow">Apple</span> Products
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Your trusted marketplace for authentic Apple devices across Indonesia. Buy and sell with confidence.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/buy">
                  <Button
                    size="lg"
                    className="bg-electric-yellow text-black hover:glow-yellow-strong transition-all duration-300"
                    data-testid="button-shop-now"
                  >
                    <i className="fas fa-shopping-cart mr-2"></i>Shop Now
                  </Button>
                </Link>
                <Link href="/sell">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-electric-yellow text-electric-yellow hover:bg-electric-yellow hover:text-black transition-all duration-300"
                    data-testid="button-sell-device"
                  >
                    <i className="fas fa-dollar-sign mr-2"></i>Sell Device
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Modern electronics store interior"
                className="rounded-2xl shadow-2xl glow-yellow"
              />
              <div className="absolute -bottom-6 -right-6 bg-electric-yellow text-black p-4 rounded-xl font-bold">
                <i className="fas fa-shield-alt mr-2"></i>
                100% Authentic
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="bg-charcoal py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Trusted by <span className="text-electric-yellow">Thousands</span>
          </h2>
          {statsLoading ? (
            <div className="grid md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="bg-dark-gray border-electric-yellow/20 card-hover">
                  <CardContent className="p-8 text-center">
                    <div className="h-12 bg-gray-600 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-8">
              <Card className="bg-dark-gray border-electric-yellow/20 card-hover">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold text-electric-yellow mb-2" data-testid="stat-total-sales">
                    {stats?.totalSales.toLocaleString()}+
                  </div>
                  <div className="text-gray-300">Devices Sold</div>
                </CardContent>
              </Card>
              <Card className="bg-dark-gray border-electric-yellow/20 card-hover">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold text-electric-yellow mb-2" data-testid="stat-cities">
                    {stats?.activeCities}
                  </div>
                  <div className="text-gray-300">Cities Covered</div>
                </CardContent>
              </Card>
              <Card className="bg-dark-gray border-electric-yellow/20 card-hover">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold text-electric-yellow mb-2" data-testid="stat-customers">
                    {stats?.happyCustomers}%
                  </div>
                  <div className="text-gray-300">Happy Customers</div>
                </CardContent>
              </Card>
              <Card className="bg-dark-gray border-electric-yellow/20 card-hover">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold text-electric-yellow mb-2" data-testid="stat-response-time">
                    {stats?.responseTime}
                  </div>
                  <div className="text-gray-300">Response Time</div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-black py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Featured <span className="text-electric-yellow">Products</span>
          </h2>
          {productsLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-charcoal border-electric-yellow/20">
                  <div className="h-64 bg-gray-600 rounded-t animate-pulse"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-600 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-600 rounded mb-4 animate-pulse"></div>
                    <div className="flex justify-between">
                      <div className="h-6 bg-gray-600 rounded w-1/3 animate-pulse"></div>
                      <div className="h-6 bg-gray-600 rounded w-1/4 animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredProducts?.slice(0, 3).map((product) => (
                <Card key={product.id} className="bg-charcoal border-electric-yellow/20 card-hover">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-t"
                  />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2" data-testid={`product-name-${product.id}`}>
                      {product.name}
                    </h3>
                    <p className="text-gray-400 mb-4" data-testid={`product-description-${product.id}`}>
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-electric-yellow" data-testid={`product-price-${product.id}`}>
                        Rp {parseInt(product.price).toLocaleString()}
                      </span>
                      <span className="bg-electric-yellow/20 text-electric-yellow px-3 py-1 rounded-full text-sm" data-testid={`product-stock-${product.id}`}>
                        {product.stock} Available
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
