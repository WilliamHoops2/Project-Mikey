import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import type { SellPrice } from "@shared/schema";

interface PricingModalProps {
  sellPrice: SellPrice;
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ sellPrice, isOpen, onClose }: PricingModalProps) {
  const [storage, setStorage] = useState("128GB");
  const [condition, setCondition] = useState("excellent");

  const getPrice = () => {
    switch (condition) {
      case "excellent":
        return sellPrice.excellentPrice;
      case "good":
        return sellPrice.goodPrice;
      case "fair":
        return sellPrice.fairPrice;
      default:
        return sellPrice.excellentPrice;
    }
  };

  const getConditionDescription = (cond: string) => {
    switch (cond) {
      case "excellent":
        return "Like new, no scratches";
      case "good":
        return "Minor wear, fully functional";
      case "fair":
        return "Visible wear, works well";
      default:
        return "";
    }
  };

  const handleContactUs = () => {
    const message = `Hi! I'd like to sell my ${sellPrice.model} (${storage}, ${condition} condition). My estimated quote is Rp ${parseInt(getPrice()).toLocaleString()}.`;
    const whatsappUrl = `https://wa.me/6282100000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-charcoal border-electric-yellow/20 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center" data-testid="modal-product-title">
            {sellPrice.model}
          </DialogTitle>
          <p className="text-gray-400 text-center">
            Select condition and storage to get your quote
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label className="text-sm font-semibold mb-2 block">Storage Capacity</Label>
            <Select value={storage} onValueChange={setStorage}>
              <SelectTrigger className="bg-dark-gray border-electric-yellow/20" data-testid="select-storage">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="128GB">128GB</SelectItem>
                <SelectItem value="256GB">256GB</SelectItem>
                <SelectItem value="512GB">512GB</SelectItem>
                <SelectItem value="1TB">1TB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-semibold mb-2 block">Condition</Label>
            <RadioGroup value={condition} onValueChange={setCondition} className="space-y-3">
              {[
                { value: "excellent", label: "Excellent", price: sellPrice.excellentPrice },
                { value: "good", label: "Good", price: sellPrice.goodPrice },
                { value: "fair", label: "Fair", price: sellPrice.fairPrice },
              ].map((option) => (
                <div key={option.value}>
                  <Label
                    htmlFor={option.value}
                    className="flex items-center justify-between p-3 bg-dark-gray rounded-lg cursor-pointer border border-electric-yellow/20 hover:bg-electric-yellow/5"
                  >
                    <div className="flex items-center">
                      <RadioGroupItem value={option.value} id={option.value} className="mr-3" />
                      <div>
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-sm text-gray-400">
                          {getConditionDescription(option.value)}
                        </div>
                      </div>
                    </div>
                    <span 
                      className="text-electric-yellow font-bold"
                      data-testid={`price-${option.value}`}
                    >
                      Rp {parseInt(option.price).toLocaleString()}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Card className="bg-electric-yellow/10 border-electric-yellow/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Estimated Quote:</span>
                <span 
                  className="text-2xl font-bold text-electric-yellow"
                  data-testid="estimated-quote"
                >
                  Rp {parseInt(getPrice()).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Final price subject to physical inspection
              </p>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1 border-electric-yellow text-electric-yellow hover:bg-electric-yellow hover:text-black"
              onClick={onClose}
              data-testid="button-cancel-quote"
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-electric-yellow text-black hover:glow-yellow-strong"
              onClick={handleContactUs}
              data-testid="button-contact-whatsapp"
            >
              <i className="fab fa-whatsapp mr-2"></i>Contact Us
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
