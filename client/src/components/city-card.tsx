import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { City } from "@shared/schema";

interface CityCardProps {
  city: City;
  isSelected: boolean;
  onClick: () => void;
}

export default function CityCard({ city, isSelected, onClick }: CityCardProps) {
  return (
    <Card
      className={`bg-charcoal border-electric-yellow/20 cursor-pointer card-hover ${
        isSelected ? "ring-2 ring-electric-yellow" : ""
      }`}
      onClick={onClick}
      data-testid={`city-card-${city.name}`}
    >
      <CardContent className="p-8 text-center">
        <img
          src={city.imageUrl}
          alt={`${city.displayName} city landmark`}
          className="w-full h-32 object-cover rounded-xl mb-4"
        />
        <h3 className="text-2xl font-bold mb-2">{city.displayName}</h3>
        <p className="text-gray-400 mb-4" data-testid={`city-product-count-${city.name}`}>
          {city.productCount} Products Available
        </p>
        <Button
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
            isSelected
              ? "bg-electric-yellow text-black"
              : "bg-electric-yellow text-black hover:glow-yellow-strong"
          }`}
          data-testid={`button-select-city-${city.name}`}
        >
          <i className="fas fa-map-marker-alt mr-2"></i>
          {isSelected ? "Selected" : "Select City"}
        </Button>
      </CardContent>
    </Card>
  );
}
