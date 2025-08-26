import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PricingModal from "@/components/pricing-modal";
import type { Category, SellPrice } from "@shared/schema";

export default function Sell() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<SellPrice | null>(null);

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: sellPrices, isLoading: sellPricesLoading } = useQuery<SellPrice[]>({
    queryKey: ["/api/sell-prices", { category: selectedCategory }],
    queryFn: async () => {
      if (!selectedCategory) return [];
      const response = await fetch(`/api/sell-prices?category=${selectedCategory}`);
      if (!response.ok) throw new Error('Failed to fetch sell prices');
      return response.json();
    },
    enabled: !!selectedCategory,
  });

  const selectedCategoryData = categories?.find(cat => cat.name === selectedCategory);

  return (
    <div className="gradient-dark min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Sell Your <span className="text-electric-yellow">Apple Device</span>
          </h1>
          <p className="text-xl text-gray-300">Get instant quotes for your Apple products</p>
        </div>

        {/* Product Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Select Product Category</h2>
          {categoriesLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="bg-charcoal border-electric-yellow/20">
                  <CardContent className="p-8 text-center">
                    <div className="h-16 w-16 bg-gray-600 rounded mb-4 mx-auto animate-pulse"></div>
                    <div className="h-6 bg-gray-600 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories?.map((category) => (
                <Card
                  key={category.id}
                  className={`bg-charcoal border-electric-yellow/20 cursor-pointer card-hover ${
                    selectedCategory === category.name ? "ring-2 ring-electric-yellow" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                  data-testid={`category-${category.name}`}
                >
                  <CardContent className="p-8 text-center">
                    <i className={`${category.icon} text-4xl text-electric-yellow mb-4`}></i>
                    <h3 className="text-xl font-bold mb-2">{category.displayName}</h3>
                    <p className="text-gray-400">{category.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Product Models */}
        {selectedCategory && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Select Your <span className="text-electric-yellow">{selectedCategoryData?.displayName}</span> Model
              </h2>
              <p className="text-gray-400">Choose your exact model to get an accurate quote</p>
            </div>

            {sellPricesLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="bg-charcoal border-electric-yellow/20">
                    <CardContent className="p-6">
                      <div className="h-6 bg-gray-600 rounded mb-4 animate-pulse"></div>
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                      </div>
                      <div className="h-12 bg-gray-600 rounded animate-pulse"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : sellPrices?.length === 0 ? (
              <Card className="bg-charcoal border-electric-yellow/20">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">💰</div>
                  <h3 className="text-xl font-bold mb-2">No Models Available</h3>
                  <p className="text-gray-400">
                    We don't have pricing for {selectedCategoryData?.displayName} models yet. Contact us for a custom quote.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sellPrices?.map((sellPrice) => (
                  <Card
                    key={sellPrice.id}
                    className="bg-charcoal border-electric-yellow/20 cursor-pointer card-hover"
                    data-testid={`sell-model-${sellPrice.model.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold">{sellPrice.model}</h3>
                        <span className="text-electric-yellow font-bold">
                          Rp {parseInt(sellPrice.fairPrice).toLocaleString()}+
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Excellent Condition:</span>
                          <span className="text-electric-yellow font-semibold">
                            Rp {parseInt(sellPrice.excellentPrice).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Good Condition:</span>
                          <span className="text-electric-yellow font-semibold">
                            Rp {parseInt(sellPrice.goodPrice).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Fair Condition:</span>
                          <span className="text-electric-yellow font-semibold">
                            Rp {parseInt(sellPrice.fairPrice).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-electric-yellow text-black hover:glow-yellow-strong transition-all duration-300"
                        onClick={() => setSelectedModel(sellPrice)}
                        data-testid={`button-get-quote-${sellPrice.model.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        Get Quote
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pricing Modal */}
        {selectedModel && (
          <PricingModal
            sellPrice={selectedModel}
            isOpen={!!selectedModel}
            onClose={() => setSelectedModel(null)}
          />
        )}
      </div>
    </div>
  );
}
