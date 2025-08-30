import { useState, useMemo, useCallback } from "react";
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

const conditionOptions = [
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
];

export default function PricingModal({ sellPrice, isOpen, onClose }: PricingModalProps) {
  // Determine available storage options dynamically based on sellPrice
  const availableStorageOptions = useMemo(() => {
    if (sellPrice.storageOptions && sellPrice.storageOptions.length > 0) {
      return sellPrice.storageOptions.map(opt => ({ value: opt.value, label: opt.value, adjustment: opt.adjustment }));
    } else if (sellPrice.storage) {
      return [{ value: sellPrice.storage, label: sellPrice.storage, adjustment: 0 }];
    }
    return [{ value: "N/A", label: "N/A", adjustment: 0 }]; // Fallback for products without specific storage or accessories
  }, [sellPrice.storageOptions, sellPrice.storage]);

  const [storage, setStorage] = useState(availableStorageOptions[0]?.value || "");
  const [condition, setCondition] = useState("excellent");

  // Reset storage if the selected product changes and the current storage is no longer valid
  useMemo(() => {
    if (availableStorageOptions.length > 0 && !availableStorageOptions.some(opt => opt.value === storage)) {
      setStorage(availableStorageOptions[0].value);
    }
  }, [availableStorageOptions, storage]);

  const getPriceForCondition = (cond: string): number => {
    switch (cond) {
      case "excellent":
        return parseInt(sellPrice.excellentPrice);
      case "good":
        return parseInt(sellPrice.goodPrice);
      case "fair":
        return parseInt(sellPrice.fairPrice);
      default:
        return parseInt(sellPrice.excellentPrice);
    }
  };

  // Memoize getPriceForCondition to ensure stability
  const getPriceForConditionMemoized = useCallback(getPriceForCondition, [sellPrice]);

  const calculatePrice = useCallback((cond: string, selectedStorageValue: string): number => {
    const basePrice = getPriceForConditionMemoized(cond);
    // Find the adjustment for the currently selected storage from the dynamically determined options
    const storageOption = availableStorageOptions.find(opt => opt.value === selectedStorageValue);
    const storageAdjustment = storageOption?.adjustment ?? 0;
    return basePrice + storageAdjustment;
  }, [getPriceForConditionMemoized, availableStorageOptions]);

  /*
  // Original calculatePrice function (without useCallback)
  const calculatePrice = (cond: string, selectedStorage: string): number => {
    const basePrice = getPriceForCondition(cond);
    const storageAdjustment = availableStorageOptions.find(opt => opt.value === selectedStorage)?.adjustment ?? 0;
    return basePrice + storageAdjustment;
  };
  */

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
    const message = `Hi! I'd like to sell my ${sellPrice.model} (${storage}, ${condition} condition). My estimated quote is Rp ${estimatedQuote.toLocaleString()}.`;
    const whatsappUrl = `https://wa.me/6285331069777?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const estimatedQuote = useMemo(() => {
    return calculatePrice(condition, storage);
  }, [condition, storage, calculatePrice]);

  // check if storage selection should be shown
  const showStorageSelection = availableStorageOptions.length > 1 || (availableStorageOptions.length === 1 && availableStorageOptions[0].value !== "N/A");

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
          {showStorageSelection && ( // Conditionally render storage selection
            <div>
              <Label className="text-sm font-semibold mb-2 block">Storage Capacity</Label>
              <Select value={storage} onValueChange={setStorage}>
                <SelectTrigger className="bg-dark-gray border-electric-yellow/20" data-testid="select-storage">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableStorageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label className="text-sm font-semibold mb-2 block">Condition</Label>
            <RadioGroup value={condition} onValueChange={setCondition} className="space-y-3">
              {conditionOptions.map((option) => (
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
                      Rp {calculatePrice(option.value, storage).toLocaleString()}
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
                  Rp {estimatedQuote.toLocaleString()}
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
