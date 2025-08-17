import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="bg-charcoal border-electric-yellow/20 card-hover">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t"
      />
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-2" data-testid={`product-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mb-2" data-testid={`product-condition-${product.id}`}>
          Condition: {product.condition}
        </p>
        {product.storage && (
          <p className="text-gray-400 text-sm mb-4" data-testid={`product-storage-${product.id}`}>
            Storage: {product.storage}
          </p>
        )}
        <div className="flex justify-between items-center mb-4">
          <span className="text-electric-yellow font-bold text-lg" data-testid={`product-price-${product.id}`}>
            Rp {parseInt(product.price).toLocaleString()}
          </span>
          <Badge 
            variant="secondary" 
            className="bg-electric-yellow/20 text-electric-yellow"
            data-testid={`product-stock-${product.id}`}
          >
            {product.stock} left
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <Button
            size="sm"
            className="bg-electric-yellow text-black hover:glow-yellow-strong transition-all duration-300"
            data-testid={`button-buy-${product.id}`}
          >
            <i className="fas fa-shopping-cart mr-1"></i>Buy
          </Button>
          {product.description && (
            <span className="text-xs text-gray-500 max-w-[60%] truncate">
              {product.description}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
