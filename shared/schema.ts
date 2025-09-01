import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const cities = pgTable("cities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  displayName: text("display_name").notNull(),
  productCount: integer("product_count").notNull().default(0),
  imageUrl: text("image_url").notNull(),
  whatsappNumber: text("whatsapp_number"),
});

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  displayName: text("display_name").notNull(),
  icon: text("icon").notNull(),
  description: text("description").notNull(),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  model: text("model").notNull(),
  category: text("category").notNull(),
  cityId: varchar("city_id").references(() => cities.id),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  condition: text("condition").notNull(),
  storage: text("storage"),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  stock: integer("stock").notNull().default(0),
  isAvailable: boolean("is_available").notNull().default(true),
});

const storageOptionSchema = z.object({
  value: z.string(),
  adjustment: z.number(),
});

const storageOptionsSchema = z.array(storageOptionSchema);

const typeOptionSchema = z.object({
  value: z.string(),
  price: z.string(),
});
const typeOptionsSchema = z.array(typeOptionSchema);

const warrantyOptionSchema = z.object({
  value: z.string(),
  adjustment: z.number(),
});
const warrantyOptionsSchema = z.array(warrantyOptionSchema);

export const sellPrices = pgTable("sell_prices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  model: text("model").notNull(),
  category: text("category").notNull(),
  storage: text("storage"),
  excellentPrice: decimal("excellent_price", { precision: 12, scale: 2 }),
  goodPrice: decimal("good_price", { precision: 12, scale: 2 }),
  fairPrice: decimal("fair_price", { precision: 12, scale: 2 }),
  description: text("description"),
  storageOptions: jsonb("storage_options").$type<z.infer<typeof storageOptionsSchema>>(),
  typeOptions: jsonb("type_options").$type<z.infer<typeof typeOptionsSchema>>(),
  warrantyOptions: jsonb("warranty_options").$type<z.infer<typeof warrantyOptionsSchema>>(),
});

export const stats = pgTable("stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  totalSales: integer("total_sales").notNull().default(0),
  activeCities: integer("active_cities").notNull().default(4),
  happyCustomers: integer("happy_customers").notNull().default(98),
  responseTime: text("response_time").notNull().default("24h"),
});

export const insertCitySchema = createInsertSchema(cities).omit({ id: true });
export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertSellPriceSchema = createInsertSchema(sellPrices, {
  storageOptions: storageOptionsSchema.optional().nullable(),
  typeOptions: typeOptionsSchema.optional().nullable(),
  warrantyOptions: warrantyOptionsSchema.optional().nullable(),
}).omit({ id: true });
export const insertStatsSchema = createInsertSchema(stats).omit({ id: true });

export type City = typeof cities.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type SellPrice = typeof sellPrices.$inferSelect;
export type Stats = typeof stats.$inferSelect;

export type InsertCity = z.infer<typeof insertCitySchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertSellPrice = z.infer<typeof insertSellPriceSchema>;
export type InsertStats = z.infer<typeof insertStatsSchema>;

export type TypeOption = z.infer<typeof typeOptionSchema>;
export type WarrantyOption = z.infer<typeof warrantyOptionSchema>;
