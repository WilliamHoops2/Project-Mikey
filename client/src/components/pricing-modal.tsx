import { useState, useMemo, useCallback, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import type { SellPrice, TypeOption, WarrantyOption } from "@shared/schema";

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

const ramOptions = [
  { value: "fair", label: "8GB RAM", description: "Base RAM configuration" },
  { value: "good", label: "16GB RAM", description: "Upgraded for multitasking" },
  { value: "excellent", label: "32GB RAM", description: "For professional workloads" },
];

const pencilOptions = [
  { value: "fair", label: "No Apple Pencil", description: "Device only, no pencil included" },
  { value: "good", label: "Apple Pencil Gen 2", description: "Includes a used Apple Pencil Gen 2" },
  { value: "excellent", label: "Apple Pencil Pro", description: "Includes the newest Apple Pencil Pro" },
];

interface MappedTypeOption {
  value: string;
  label: string;
  price: number;
}

const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

interface MappedWarrantyOption {
  value: string;
  label: string;
  adjustment: number;
}

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
  const [type, setType] = useState("");
  const [warranty, setWarranty] = useState("");

  const accessoryTypeOptions: MappedTypeOption[] = useMemo(() => {
    if (sellPrice.category === 'accessories' && sellPrice.typeOptions) {
      return sellPrice.typeOptions.map((opt: TypeOption) => ({ value: opt.value, label: opt.value, price: parseFloat(opt.price) }));
    }
    return [];
  }, [sellPrice]);

  const warrantyOptions: MappedWarrantyOption[] = useMemo(() => {
    if (sellPrice.category === 'ipad' && sellPrice.warrantyOptions) {
      return sellPrice.warrantyOptions.map((opt: WarrantyOption) => ({ value: opt.value, label: opt.value, adjustment: opt.adjustment }));
    }
    return [];
  }, [sellPrice]);

  // Reset storage if the selected product changes and the current storage is no longer valid
  useEffect(() => {
    if (isOpen) {
      if (sellPrice.category === 'accessories') {
        setType(accessoryTypeOptions[0]?.value || "");
      } else if (sellPrice.category === 'ipad') {
        setStorage(availableStorageOptions[0]?.value || "");
        setCondition("fair"); // Default to "No Apple Pencil"
        setWarranty(warrantyOptions[0]?.value || "");
      } else {
        setStorage(availableStorageOptions[0]?.value || "");
        setCondition("excellent");
      }
    }
  }, [isOpen, sellPrice, availableStorageOptions, accessoryTypeOptions, warrantyOptions]);

  const getPriceForCondition = (cond: string): number => {
    switch (cond) {
      case "excellent":
        return parseFloat(sellPrice.excellentPrice || "0");
      case "good":
        return parseFloat(sellPrice.goodPrice || "0");
      case "fair":
        return parseFloat(sellPrice.fairPrice || "0");
      default:
        return parseFloat(sellPrice.excellentPrice || "0");
    }
  };

  // Memoize getPriceForCondition to ensure stability
  const getPriceForConditionMemoized = useCallback(getPriceForCondition, [sellPrice]);

  const calculatePrice = useCallback((): number => {
    if (sellPrice.category === 'accessories') {
      return accessoryTypeOptions.find(opt => opt.value === type)?.price ?? 0;
    }
    const basePrice = getPriceForConditionMemoized(condition);
    const storageAdjustment = availableStorageOptions.find(opt => opt.value === storage)?.adjustment ?? 0;
    if (sellPrice.category === 'ipad') {
      const warrantyAdjustment = warrantyOptions.find(opt => opt.value === warranty)?.adjustment ?? 0;
      return basePrice + storageAdjustment + warrantyAdjustment;
    }
    return basePrice + storageAdjustment;
  }, [condition, storage, type, warranty, getPriceForConditionMemoized, availableStorageOptions, sellPrice.category, accessoryTypeOptions, warrantyOptions]);

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
    let message;
    if (sellPrice.category === 'accessories') {
      message = `Hi! I'd like to sell my ${sellPrice.model} (${type}). My estimated quote is Rp ${estimatedQuote.toLocaleString()}.`;
    } else if (sellPrice.category === 'ipad') {
      const pencilLabel = pencilOptions.find(opt => opt.value === condition)?.label || '';
      message = `Hi! I'd like to sell my ${sellPrice.model} (${storage}, ${pencilLabel}, ${warranty}). My estimated quote is Rp ${estimatedQuote.toLocaleString()}.`;
    } else if (sellPrice.category === 'macbook') {
      const ramLabel = ramOptions.find(opt => opt.value === condition)?.label || '';
      message = `Hi! I'd like to sell my ${sellPrice.model} (${storage}, ${ramLabel}). My estimated quote is Rp ${estimatedQuote.toLocaleString()}.`;
    } else {
      message = `Hi! I'd like to sell my ${sellPrice.model} (${storage}, ${condition} condition). My estimated quote is Rp ${estimatedQuote.toLocaleString()}.`;
    }
    const whatsappUrl = `https://wa.me/6285331069777?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const estimatedQuote = useMemo(() => {
    return calculatePrice();
  }, [calculatePrice]);

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
          {sellPrice.category === 'accessories' ? (
            <div>
              <Label className="text-sm font-semibold mb-2 block">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="bg-dark-gray border-electric-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {accessoryTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {`${option.label}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : sellPrice.category === 'ipad' ? (
            <>
              {showStorageSelection && (
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
                <Label className="text-sm font-semibold mb-2 block">Warranty</Label>
                <Select value={warranty} onValueChange={setWarranty}>
                  <SelectTrigger className="bg-dark-gray border-electric-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {warrantyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-semibold mb-2 block">Apple Pencil</Label>
                <RadioGroup value={condition} onValueChange={setCondition} className="space-y-3">
                  {pencilOptions.map((option) => (
                    <Label key={option.value} htmlFor={slugify(option.value)} className="flex items-center justify-between p-3 bg-dark-gray rounded-lg cursor-pointer border border-electric-yellow/20 hover:bg-electric-yellow/5">
                      <div className="flex items-center">
                        <RadioGroupItem value={option.value} id={slugify(option.value)} className="mr-3" />
                        <div>
                          <div className="font-semibold">{option.label}</div>
                          <div className="text-sm text-gray-400">{option.description}</div>
                        </div>
                      </div>
                      <span className="text-electric-yellow font-bold" data-testid={`price-${option.value}`}>
                        Rp {(getPriceForCondition(option.value) + (availableStorageOptions.find(o => o.value === storage)?.adjustment ?? 0) + (warrantyOptions.find(w => w.value === warranty)?.adjustment ?? 0)).toLocaleString()}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            </>
          ) : sellPrice.category === 'macbook' ? (
            <>
              {showStorageSelection && (
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
                <Label className="text-sm font-semibold mb-2 block">RAM</Label>
                <RadioGroup value={condition} onValueChange={setCondition} className="space-y-3">
                  {ramOptions.map((option) => (
                    <Label key={option.value} htmlFor={slugify(option.value)} className="flex items-center justify-between p-3 bg-dark-gray rounded-lg cursor-pointer border border-electric-yellow/20 hover:bg-electric-yellow/5">
                      <div className="flex items-center">
                        <RadioGroupItem value={option.value} id={slugify(option.value)} className="mr-3" />
                        <div>
                          <div className="font-semibold">{option.label}</div>
                          <div className="text-sm text-gray-400">{option.description}</div>
                        </div>
                      </div>
                      <span className="text-electric-yellow font-bold" data-testid={`price-${option.value}`}>
                        Rp {(getPriceForCondition(option.value) + (availableStorageOptions.find(o => o.value === storage)?.adjustment ?? 0)).toLocaleString()}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            </>
          ) : (
            <>
              {showStorageSelection && (
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
                    <Label key={option.value} htmlFor={slugify(option.value)} className="flex items-center justify-between p-3 bg-dark-gray rounded-lg cursor-pointer border border-electric-yellow/20 hover:bg-electric-yellow/5">
                      <div className="flex items-center">
                        <RadioGroupItem value={option.value} id={slugify(option.value)} className="mr-3" />
                        <div>
                          <div className="font-semibold">{option.label}</div>
                          <div className="text-sm text-gray-400">{getConditionDescription(option.value)}</div>
                        </div>
                      </div>
                      <span className="text-electric-yellow font-bold" data-testid={`price-${option.value}`}>
                        Rp {(getPriceForCondition(option.value) + (availableStorageOptions.find(o => o.value === storage)?.adjustment ?? 0)).toLocaleString()}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            </>
          )}

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
