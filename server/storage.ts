import { type City, type Category, type Product, type SellPrice, type Stats, type InsertCity, type InsertCategory, type InsertProduct, type InsertSellPrice, type InsertStats } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Cities
  getCities(): Promise<City[]>;
  getCityById(id: string): Promise<City | undefined>;
  createCity(city: InsertCity): Promise<City>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Products
  getProducts(): Promise<Product[]>;
  getProductsByCity(cityId: string): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Sell Prices
  getSellPrices(): Promise<SellPrice[]>;
  getSellPricesByCategory(category: string): Promise<SellPrice[]>;
  getSellPriceByModel(model: string): Promise<SellPrice | undefined>;
  createSellPrice(sellPrice: InsertSellPrice): Promise<SellPrice>;

  // Stats
  getStats(): Promise<Stats>;
  updateStats(stats: InsertStats): Promise<Stats>;
}

export class MemStorage implements IStorage {
  private cities: Map<string, City> = new Map();
  private categories: Map<string, Category> = new Map();
  private products: Map<string, Product> = new Map();
  private sellPrices: Map<string, SellPrice> = new Map();
  private stats: Stats = {
    id: randomUUID(),
    totalSales: 2500,
    activeCities: 4,
    happyCustomers: 98,
    responseTime: "24h"
  };

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize cities
    const citiesData: InsertCity[] = [
      {
        name: "malang",
        displayName: "Malang",
        productCount: 0, // Will be calculated based on product stock
        imageUrl: "/cities/malang.jpeg"
      },
      {
        name: "surabaya",
        displayName: "Surabaya",
        productCount: 0, // Will be calculated based on product stock
        imageUrl: "/cities/surabaya.jpeg"
      },
      {
        name: "bandung",
        displayName: "Bandung",
        productCount: 0, // Will be calculated based on product stock
        imageUrl: "cities/bandung.png"
      },
      {
        name: "jakarta",
        displayName: "Jakarta",
        productCount: 0, // Will be calculated based on product stock
        imageUrl: "/cities/jakarta.jpg"
      }
    ];

    citiesData.forEach(city => {
      const id = randomUUID();
      this.cities.set(id, { ...city, id, productCount: city.productCount || 0 });
    });

    // Initialize categories
    const categoriesData: InsertCategory[] = [
      {
        name: "iphone",
        displayName: "iPhone",
        icon: "fas fa-mobile-alt",
        description: "All iPhone models"
      },
      {
        name: "ipad",
        displayName: "iPad",
        icon: "fas fa-tablet-alt",
        description: "All iPad models"
      },
      {
        name: "macbook",
        displayName: "MacBook",
        icon: "fas fa-laptop",
        description: "All MacBook models"
      },
      {
        name: "accessories",
        displayName: "Accessories",
        icon: "fas fa-headphones",
        description: "AirPods, Watch, etc."
      }
    ];

    categoriesData.forEach(category => {
      const id = randomUUID();
      this.categories.set(id, { ...category, id });
    });

    // Initialize featured products
    const cityIds = Array.from(this.cities.keys());
    const productsData: InsertProduct[] = [
      // Jakarta products cityIds[3]
      {
        name: "iPhone 14 Pro Max",
        model: "iPhone 14 Pro Max",
        category: "iphone",
        cityId: cityIds[3],
        price: "18999000",
        condition: "Like New",
        storage: "128GB",
        description: "Latest flagship with Pro camera system",
        imageUrl: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        stock: 5,
        isAvailable: true
      },
      {
        name: "iPhone 13 Pro",
        model: "iPhone 13 Pro",
        category: "iphone",
        cityId: cityIds[3],
        price: "14999000",
        condition: "Excellent",
        storage: "256GB",
        description: "Pro camera with excellent performance",
        imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        stock: 8,
        isAvailable: true
      },
      {
        name: "MacBook Pro M2",
        model: "MacBook Pro M2",
        category: "macbook",
        cityId: cityIds[3],
        price: "24999000",
        condition: "Excellent",
        storage: "512GB",
        description: "Powerful laptop for professionals",
        imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        stock: 3,
        isAvailable: true
      },
      // Surabaya products cityIds[1]
      {
        name: "iPad Pro 12.9\"",
        model: "iPad Pro 12.9",
        category: "ipad",
        cityId: cityIds[1],
        price: "16999000",
        condition: "Like New",
        storage: "256GB",
        description: "Ultimate creative powerhouse",
        imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        stock: 7,
        isAvailable: true
      },
      {
        name: "iPhone 12",
        model: "iPhone 12",
        category: "iphone",
        cityId: cityIds[1],
        price: "9999000",
        condition: "Good",
        storage: "128GB",
        description: "Reliable iPhone with great camera",
        imageUrl: "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        stock: 12,
        isAvailable: true
      },
      // Bandung products cityIds[2]
      {
        name: "MacBook Air M2",
        model: "MacBook Air M2",
        category: "macbook",
        cityId: cityIds[2],
        price: "19999000",
        condition: "Excellent",
        storage: "256GB",
        description: "Lightweight and powerful",
        imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        stock: 6,
        isAvailable: true
      },
      {
        name: "AirPods Pro",
        model: "AirPods Pro",
        category: "accessories",
        cityId: cityIds[2],
        price: "3999000",
        condition: "Like New",
        storage: null,
        description: "Premium wireless earbuds",
        imageUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        stock: 15,
        isAvailable: true
      },
      // Malang products cityIds[0]
      {
        name: "iPad Air",
        model: "iPad Air",
        category: "ipad",
        cityId: cityIds[0],
        price: "8999000",
        condition: "Good",
        storage: "64GB",
        description: "Perfect for work and play",
        imageUrl: "https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        stock: 4,
        isAvailable: true
      },
      {
        name: "iPhone 11",
        model: "iPhone 11",
        category: "iphone",
        cityId: cityIds[0],
        price: "6999000",
        condition: "Good",
        storage: "128GB",
        description: "Great value iPhone",
        imageUrl: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        stock: 9,
        isAvailable: true
      }
    ];

    productsData.forEach(product => {
      const id = randomUUID();
      this.products.set(id, { 
        ...product, 
        id,
        description: product.description || null,
        cityId: product.cityId || null,
        storage: product.storage || null,
        stock: product.stock || 0,
        isAvailable: product.isAvailable !== false
      });
    });

    // calculate units per city
    const cityStockCount = new Map<string, number>();
    this.products.forEach(product => {
      if (product.cityId) {
        const currentStock = cityStockCount.get(product.cityId) || 0;
        cityStockCount.set(product.cityId, currentStock + product.stock);
      }
    });

    // update product count in citeis
    this.cities.forEach(city => {
      city.productCount = cityStockCount.get(city.id) || 0;
    });

    // set sell prices
    const sellPricesData: InsertSellPrice[] = [
      // iPhone
      {
        model: "iPhone 16 Pro Max",
        category: "iphone",
        storage: "256GB",
        excellentPrice: "19000000",
        goodPrice: "17500000",
        fairPrice: "17000000",
        storageOptions: [{ value: "256GB", adjustment: 0 }, { value: "512GB", adjustment: 2000000 }, { value: "1TB", adjustment: 4000000 }]
      },
      {
        model: "iPhone 16 Pro",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "16000000",
        goodPrice: "14500000",
        fairPrice: "14000000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1500000 }, { value: "512GB", adjustment: 3000000 }, { value: "1TB", adjustment: 4500000 }]
      },
      {
        model: "iPhone 16 Plus",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "12500000",
        goodPrice: "12000000",
        fairPrice: "12000000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1500000 }, { value: "512GB", adjustment: 3000000 }]
      },
      {
        model: "iPhone 16",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "11500000",
        goodPrice: "11000000",
        fairPrice: "11000000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1500000 }, { value: "512GB", adjustment: 3000000 }]
      },
      {
        model: "iPhone 15 Pro Max",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "12500000",
        goodPrice: "12200000",
        fairPrice: "12000000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1500000 }, { value: "512GB", adjustment: 3000000 }, { value: "1TB", adjustment: 4500000 }]
      },
      {
        model: "iPhone 15 Pro",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "12500000",
        goodPrice: "12200000",
        fairPrice: "12000000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1500000 }, { value: "512GB", adjustment: 3000000 }, { value: "1TB", adjustment: 4500000 }]
      },
      {
        model: "iPhone 15 Plus",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "9500000",
        goodPrice: "9000000",
        fairPrice: "9000000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1500000 }, { value: "512GB", adjustment: 3000000 }]
      },
      {
        model: "iPhone 15",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "8500000",
        goodPrice: "8000000",
        fairPrice: "8000000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1500000 }, { value: "512GB", adjustment: 3000000 }]
      },
      {
        model: "iPhone 14 Pro Max",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "9500000",
        goodPrice: "9500000",
        fairPrice: "9500000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1500000 }, { value: "512GB", adjustment: 3000000 }, { value: "1TB", adjustment: 4500000 }]
      },
      {
        model: "iPhone 14 Pro",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "9000000",
        goodPrice: "9000000",
        fairPrice: "9000000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1500000 }, { value: "512GB", adjustment: 3000000 }, { value: "1TB", adjustment: 4500000 }]
      },
      {
        model: "iPhone 14",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "7000000",
        goodPrice: "6500000",
        fairPrice: "6000000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1500000 }, { value: "512GB", adjustment: 3000000 }]
      },
      {
        model: "iPhone 13 Pro Max",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "8500000",
        goodPrice: "8000000",
        fairPrice: "8000000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1500000 }, { value: "512GB", adjustment: 3000000 }, { value: "1TB", adjustment: 4500000 }]
      },
      {
        model: "iPhone 13 Pro",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "800000",
        goodPrice: "7500000",
        fairPrice: "7500000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1500000 }, { value: "512GB", adjustment: 3000000 }, { value: "1TB", adjustment: 4500000 }]
      },
      {
        model: "iPhone 13",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "6300000",
        goodPrice: "5700000",
        fairPrice: "5500000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1500000 }, { value: "512GB", adjustment: 3000000 }]
      },
      {
        model: "iPhone 12 Pro Max",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "6000000",
        goodPrice: "6000000",
        fairPrice: "6000000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1000000 }, { value: "512GB", adjustment: 2000000 }]
      },
      {
        model: "iPhone 12 Pro",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "5300000",
        goodPrice: "5300000",
        fairPrice: "5000000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1000000 }, { value: "512GB", adjustment: 2000000 }]
      },
      {
        model: "iPhone 12 Mini",
        category: "iphone",
        storage: "64GB",
        excellentPrice: "3500000",
        goodPrice: "3500000",
        fairPrice: "3500000",
        storageOptions: [{ value: "64GB", adjustment: 0 }, { value: "128GB", adjustment: 800000 }, { value: "256GB", adjustment: 1600000 }]
      },
      {
        model: "iPhone 12",
        category: "iphone",
        storage: "64GB",
        excellentPrice: "4700000",
        goodPrice: "4300000",
        fairPrice: "4000000",
        storageOptions: [{ value: "64GB", adjustment: 0 }, { value: "128GB", adjustment: 800000 }, { value: "256GB", adjustment: 1600000 }]
      },
      {
        model: "iPhone 11",
        category: "iphone",
        storage: "64GB",
        excellentPrice: "4300000",
        goodPrice: "4000000",
        fairPrice: "3500000",
        storageOptions: [{ value: "64GB", adjustment: 0 }, { value: "128GB", adjustment: 700000 }, { value: "256GB", adjustment: 1400000 }]
      },
      {
        model: "iPhone XR",
        category: "iphone",
        storage: "64GB",
        excellentPrice: "2700000",
        goodPrice: "2500000",
        fairPrice: "2300000",
        storageOptions: [{ value: "64GB", adjustment: 0 }, { value: "128GB", adjustment: 600000 }, { value: "256GB", adjustment: 1200000 }]
      },
      {
        model: "iPhone XS Max",
        category: "iphone",
        storage: "64GB",
        excellentPrice: "3000000",
        goodPrice: "2500000",
        fairPrice: "2300000",
        storageOptions: [{ value: "64GB", adjustment: 0 }, { value: "256GB", adjustment: 1500000 }, { value: "512GB", adjustment: 3000000 }]
      },
      {
        model: "iPhone XS",
        category: "iphone",
        storage: "64GB",
        excellentPrice: "2300000",
        goodPrice: "2000000",
        fairPrice: "1900000",
        storageOptions: [{ value: "64GB", adjustment: 0 }, { value: "256GB", adjustment: 500000 }, { value: "512GB", adjustment: 1000000 }]
      },
      {
        model: "iPhone X",
        category: "iphone",
        storage: "64GB",
        excellentPrice: "1500000",
        goodPrice: "1300000",
        fairPrice: "1200000",
        storageOptions: [{ value: "64GB", adjustment: 0 }, { value: "128GB", adjustment: 400000 }, { value: "256GB", adjustment: 800000 }]
      },
      // iPad
      {
        model: "iPad Pro M4",
        category: "ipad",
        storage: "256GB",
        excellentPrice: "12400000",
        goodPrice: "12200000",
        fairPrice: "11500000",
        storageOptions: [{ value: "256GB", adjustment: 0 }]
      },
      {
        model: "iPad Pro M2",
        category: "ipad",
        storage: "128GB",
        excellentPrice: "8900000",
        goodPrice: "8700000",
        fairPrice: "8000000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1000000 }]
      },
      {
        model: "iPad Pro M1",
        category: "ipad",
        storage: "128GB",
        excellentPrice: "7900000",
        goodPrice: "7700000",
        fairPrice: "7000000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1000000 }]
      },
      {
        model: "iPad Air 6",
        category: "ipad",
        storage: "128GB",
        excellentPrice: "6700000",
        goodPrice: "6500000",
        fairPrice: "5800000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1000000 }]
      },
      {
        model: "iPad Air 5",
        category: "ipad",
        storage: "64GB",
        excellentPrice: "5700000",
        goodPrice: "5500000",
        fairPrice: "4800000",
        storageOptions: [{ value: "64GB", adjustment: 0 }, { value: "256GB", adjustment: 1000000 }]
      },
      {
        model: "iPad Mini 7",
        category: "ipad",
        storage: "128GB",
        excellentPrice: "6400000",
        goodPrice: "6200000",
        fairPrice: "5500000",
        storageOptions: [{ value: "128GB", adjustment: 0 }, { value: "256GB", adjustment: 1000000 }]
      },
      {
        model: "iPad Mini 6",
        category: "ipad",
        storage: "64GB",
        excellentPrice: "4900000",
        goodPrice: "4700000",
        fairPrice: "4000000",
        storageOptions: [{ value: "64GB", adjustment: 0 }, { value: "256GB", adjustment: 1000000 }]
      },
      {
        model: "iPad 11",
        category: "ipad",
        storage: "64GB",
        excellentPrice: "4900000",
        goodPrice: "3700000",
        fairPrice: "4000000",
        storageOptions: [{ value: "64GB", adjustment: 0 }, { value: "128GB", adjustment: 400000 }, { value: "256GB", adjustment: 800000 }]
      },
      {
        model: "iPad 10",
        category: "ipad",
        storage: "64GB",
        excellentPrice: "3900000",
        goodPrice: "3700000",
        fairPrice: "3000000",
        storageOptions: [{ value: "64GB", adjustment: 0 }, { value: "128GB", adjustment: 400000 }, { value: "256GB", adjustment: 800000 }]
      },
      {
        model: "iPad 9",
        category: "ipad",
        storage: "64GB",
        excellentPrice: "2900000",
        goodPrice: "2700000",
        fairPrice: "2000000",
        storageOptions: [{ value: "64GB", adjustment: 0 }, { value: "256GB", adjustment: 1000000 }]
      },
      // MacBook
      {
        model: "MacBook Air M2",
        category: "macbook",
        storage: "256GB",
        excellentPrice: "21500000",
        goodPrice: "18800000",
        fairPrice: "9500000",
        storageOptions: [{ value: "512GB", adjustment: 0 }, { value: "1TB", adjustment: 3000000 }, { value: "2TB", adjustment: 6000000 }]
      },
      {
        model: "MacBook Air M2",
        category: "macbook",
        storage: "256GB",
        excellentPrice: "16800000",
        goodPrice: "14500000",
        fairPrice: "6500000",
        storageOptions: [{ value: "256GB", adjustment: 0 }, { value: "512GB", adjustment: 2500000 }, { value: "1TB", adjustment: 5000000 }]
      },
      // Accessories
      {
        model: "AirPods Pro",
        category: "accessories",
        storage: null,
        excellentPrice: "3200000",
        goodPrice: "2800000",
        fairPrice: "2200000",
        storageOptions: [{ value: "N/A", adjustment: 0 }]
      },
      {
        model: "AirPods Max",
        category: "accessories",
        storage: null,
        excellentPrice: "7500000",
        goodPrice: "6500000",
        fairPrice: "5200000",
        storageOptions: [{ value: "N/A", adjustment: 0 }]
      },
      {
        model: "Apple Watch Series 8",
        category: "accessories",
        storage: null,
        excellentPrice: "5800000",
        goodPrice: "4800000",
        fairPrice: "3800000",
        storageOptions: [{ value: "N/A", adjustment: 0 }]
      }
    ];

    sellPricesData.forEach(sellPrice => {
      const id = randomUUID();
      this.sellPrices.set(id, { 
        ...sellPrice, 
        id, // Ensure id is always set
        storage: sellPrice.storage || null, // Keep existing storage field
        storageOptions: sellPrice.storageOptions ?? null // Use null to match the schema type
      });
    });

  }

  // Cities
  async getCities(): Promise<City[]> {
    return Array.from(this.cities.values());
  }

  async getCityById(id: string): Promise<City | undefined> {
    return this.cities.get(id);
  }

  async createCity(city: InsertCity): Promise<City> {
    const id = randomUUID();
    const newCity: City = { ...city, id, productCount: city.productCount ?? 0 };
    this.cities.set(id, newCity);
    return newCity;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const newCategory: Category = { ...category, id };
    this.categories.set(id, newCategory);
    return newCategory;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCity(cityId: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.cityId === cityId);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const newProduct: Product = { 
      ...product, 
      id,
      storage: product.storage ?? null,
      cityId: product.cityId ?? null,
      description: product.description ?? null,
      stock: product.stock ?? 0,
      isAvailable: product.isAvailable !== false
    };
    this.products.set(id, newProduct);
    return newProduct;
  }

  // Sell Prices
  async getSellPrices(): Promise<SellPrice[]> {
    return Array.from(this.sellPrices.values());
  }

  async getSellPricesByCategory(category: string): Promise<SellPrice[]> {
    return Array.from(this.sellPrices.values()).filter(price => price.category === category);
  }

  async getSellPriceByModel(model: string): Promise<SellPrice | undefined> {
    return Array.from(this.sellPrices.values()).find(price => price.model === model);
  }

  async createSellPrice(sellPrice: InsertSellPrice): Promise<SellPrice> {
    const id = randomUUID();
    const newSellPrice: SellPrice = { 
      ...sellPrice, 
      id, 
      storage: sellPrice.storage ?? null,
      storageOptions: sellPrice.storageOptions ?? null
    };
    this.sellPrices.set(id, newSellPrice);
    return newSellPrice;
  }

  // Stats
  async getStats(): Promise<Stats> {
    return this.stats;
  }

  async updateStats(stats: InsertStats): Promise<Stats> {
    this.stats = { ...this.stats, ...stats };
    return this.stats;
  }
}

export const storage = new MemStorage();
