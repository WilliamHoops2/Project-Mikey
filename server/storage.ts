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
        productCount: 15,
        imageUrl: "/cities/malang.jpeg"
      },
      {
        name: "surabaya",
        displayName: "Surabaya",
        productCount: 23,
        imageUrl: "/cities/surabaya.jpeg"
      },
      {
        name: "bandung",
        displayName: "Bandung",
        productCount: 18,
        imageUrl: "cities/bandung.png"
      },
      {
        name: "jakarta",
        displayName: "Jakarta",
        productCount: 32,
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

    // Initialize sell prices
    const sellPricesData: InsertSellPrice[] = [
      // iPhone models
      {
        model: "iPhone 14 Pro Max",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "17500000",
        goodPrice: "15800000",
        fairPrice: "13200000"
      },
      {
        model: "iPhone 13 Pro Max",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "13200000",
        goodPrice: "11800000",
        fairPrice: "9500000"
      },
      {
        model: "iPhone 13 Pro",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "11800000",
        goodPrice: "10200000",
        fairPrice: "8500000"
      },
      {
        model: "iPhone 12",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "8500000",
        goodPrice: "7200000",
        fairPrice: "5800000"
      },
      {
        model: "iPhone 11",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "5800000",
        goodPrice: "4800000",
        fairPrice: "3800000"
      },
      // iPad models
      {
        model: "iPad Pro 12.9",
        category: "ipad",
        storage: "256GB",
        excellentPrice: "14500000",
        goodPrice: "12800000",
        fairPrice: "10500000"
      },
      {
        model: "iPad Air",
        category: "ipad",
        storage: "64GB",
        excellentPrice: "7500000",
        goodPrice: "6200000",
        fairPrice: "4800000"
      },
      {
        model: "iPad Pro 11",
        category: "ipad",
        storage: "128GB",
        excellentPrice: "9800000",
        goodPrice: "8200000",
        fairPrice: "6500000"
      },
      // MacBook models
      {
        model: "MacBook Pro M2",
        category: "macbook",
        storage: "512GB",
        excellentPrice: "21500000",
        goodPrice: "18800000",
        fairPrice: "15200000"
      },
      {
        model: "MacBook Air M2",
        category: "macbook",
        storage: "256GB",
        excellentPrice: "16800000",
        goodPrice: "14500000",
        fairPrice: "11800000"
      },
      {
        model: "MacBook Pro M1",
        category: "macbook",
        storage: "512GB",
        excellentPrice: "18500000",
        goodPrice: "15800000",
        fairPrice: "12800000"
      },
      // Accessories
      {
        model: "AirPods Pro",
        category: "accessories",
        storage: null,
        excellentPrice: "3200000",
        goodPrice: "2800000",
        fairPrice: "2200000"
      },
      {
        model: "AirPods Max",
        category: "accessories",
        storage: null,
        excellentPrice: "7500000",
        goodPrice: "6500000",
        fairPrice: "5200000"
      },
      {
        model: "Apple Watch Series 8",
        category: "accessories",
        storage: null,
        excellentPrice: "5800000",
        goodPrice: "4800000",
        fairPrice: "3800000"
      }
    ];

    sellPricesData.forEach(sellPrice => {
      const id = randomUUID();
      this.sellPrices.set(id, { 
        ...sellPrice, 
        id,
        storage: sellPrice.storage || null
      });
    });

    // Stats are already initialized in the property declaration
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
    const newSellPrice: SellPrice = { ...sellPrice, id, storage: sellPrice.storage ?? null };
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
