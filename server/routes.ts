import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Cities routes
  app.get("/api/cities", async (req, res) => {
    try {
      const cities = await storage.getCities();
      res.json(cities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cities" });
    }
  });

  app.get("/api/cities/:id", async (req, res) => {
    try {
      const city = await storage.getCityById(req.params.id);
      if (!city) {
        return res.status(404).json({ message: "City not found" });
      }
      res.json(city);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch city" });
    }
  });

  // Categories routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Products routes
  app.get("/api/products", async (req, res) => {
    try {
      const { cityId, category } = req.query;
      
      let products;
      if (cityId) {
        products = await storage.getProductsByCity(cityId as string);
      } else if (category) {
        products = await storage.getProductsByCategory(category as string);
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Sell prices routes
  app.get("/api/sell-prices", async (req, res) => {
    try {
      const { category } = req.query;
      
      let sellPrices;
      if (category) {
        sellPrices = await storage.getSellPricesByCategory(category as string);
      } else {
        sellPrices = await storage.getSellPrices();
      }
      
      res.json(sellPrices);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sell prices" });
    }
  });

  app.get("/api/sell-prices/model/:model", async (req, res) => {
    try {
      const sellPrice = await storage.getSellPriceByModel(req.params.model);
      if (!sellPrice) {
        return res.status(404).json({ message: "Sell price not found" });
      }
      res.json(sellPrice);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sell price" });
    }
  });

  // Stats routes
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
