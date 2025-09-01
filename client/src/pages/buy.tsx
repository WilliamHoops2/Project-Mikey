import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CityCard from "@/components/city-card";
import ProductCard from "@/components/product-card";
import type { City, Product } from "@shared/schema";

export default function Buy() {
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("price-asc");

  const { data: cities, isLoading: citiesLoading } = useQuery<City[]>({
    queryKey: ["/api/cities"],
  });

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { cityId: selectedCityId }],
    queryFn: async () => {
      if (!selectedCityId) return [];
      const response = await fetch(`/api/products?cityId=${selectedCityId}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    },
    enabled: !!selectedCityId,
  });

  const selectedCity = cities?.find(city => city.id === selectedCityId);

  const filteredProducts = products?.filter(product => {
    if (categoryFilter === "all") return true;
    return product.category === categoryFilter;
  });

  const sortedProducts = filteredProducts?.sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return parseInt(a.price) - parseInt(b.price);
      case "price-desc":
        return parseInt(b.price) - parseInt(a.price);
      default:
        return 0;
    }
  });

  return (
    <div className="gradient-dark min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Buy <span className="text-electric-yellow">Apple Products</span>
          </h1>
          <p className="text-xl text-gray-300">Choose your city to view available products</p>
        </div>

        {/* City Selection */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Select Your City</h2>
          {citiesLoading ? (
            <div className="grid md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="bg-charcoal border-electric-yellow/20">
                  <CardContent className="p-8 text-center">
                    <div className="h-32 bg-gray-600 rounded-xl mb-4 animate-pulse"></div>
                    <div className="h-6 bg-gray-600 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-600 rounded mb-4 animate-pulse"></div>
                    <div className="h-10 bg-gray-600 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-6">
              {cities?.map((city) => (
                <CityCard
                  key={city.id}
                  city={city}
                  isSelected={selectedCityId === city.id}
                  onClick={() => setSelectedCityId(city.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Catalog */}
        {selectedCityId && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-3xl font-bold">
                Products in <span className="text-electric-yellow">{selectedCity?.displayName}</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-charcoal border-electric-yellow/20">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="iphone">iPhone</SelectItem>
                    <SelectItem value="ipad">iPad</SelectItem>
                    <SelectItem value="macbook">MacBook</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-charcoal border-electric-yellow/20">
                    <SelectValue placeholder="Sort by Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {productsLoading ? (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="bg-charcoal border-electric-yellow/20">
                    <div className="h-48 bg-gray-600 rounded-t animate-pulse"></div>
                    <CardContent className="p-6">
                      <div className="h-6 bg-gray-600 rounded mb-2 animate-pulse"></div>
                      <div className="h-4 bg-gray-600 rounded mb-4 animate-pulse"></div>
                      <div className="flex justify-between">
                        <div className="h-6 bg-gray-600 rounded w-1/2 animate-pulse"></div>
                        <div className="h-8 bg-gray-600 rounded w-1/4 animate-pulse"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : sortedProducts?.length === 0 ? (
              <Card className="bg-charcoal border-electric-yellow/20">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <h3 className="text-xl font-bold mb-2">No Products Found</h3>
                  <p className="text-gray-400">
                    {categoryFilter === "all" 
                      ? "No products available in this city yet."
                      : `No ${categoryFilter} products available in this city.`
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedProducts?.map((product) => (
                  <ProductCard key={product.id} product={product} city={selectedCity} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
