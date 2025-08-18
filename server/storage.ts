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
  private stats: Stats;

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
      this.cities.set(id, { ...city, id });
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
      {
        name: "iPhone 14 Pro Max",
        model: "iPhone 14 Pro Max",
        category: "iphone",
        cityId: cityIds[0],
        price: "18999000",
        condition: "Like New",
        storage: "128GB",
        description: "Latest flagship with Pro camera system",
        imageUrl: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        stock: 5,
        isAvailable: true
      },
      {
        name: "MacBook Pro M2",
        model: "MacBook Pro M2",
        category: "macbook",
        cityId: cityIds[1],
        price: "24999000",
        condition: "Excellent",
        storage: "512GB",
        description: "Powerful laptop for professionals",
        imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        stock: 3,
        isAvailable: true
      },
      {
        name: "iPad Pro 12.9\"",
        model: "iPad Pro 12.9",
        category: "ipad",
        cityId: cityIds[2],
        price: "16999000",
        condition: "Like New",
        storage: "256GB",
        description: "Ultimate creative powerhouse",
        imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        stock: 7,
        isAvailable: true
      }
    ];

    productsData.forEach(product => {
      const id = randomUUID();
      this.products.set(id, { ...product, id });
    });

    // Initialize sell prices
    const sellPricesData: InsertSellPrice[] = [
      {
        model: "iPhone 14 Pro Max",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "17500000",
        goodPrice: "15800000",
        fairPrice: "13200000"
      },
      {
        model: "iPhone 14 Pro",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "15200000",
        goodPrice: "13500000",
        fairPrice: "11800000"
      },
      {
        model: "iPhone 13 Pro Max",
        category: "iphone",
        storage: "128GB",
        excellentPrice: "13200000",
        goodPrice: "11800000",
        fairPrice: "9500000"
      }
    ];

    sellPricesData.forEach(sellPrice => {
      const id = randomUUID();
      this.sellPrices.set(id, { ...sellPrice, id });
    });

    // Initialize stats
    this.stats = {
      id: randomUUID(),
      totalSales: 2500,
      activeCities: 4,
      happyCustomers: 98,
      responseTime: "24h"
    };
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
    const newCity: City = { ...city, id };
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
    const newProduct: Product = { ...product, id };
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
    const newSellPrice: SellPrice = { ...sellPrice, id };
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
