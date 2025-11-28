import { z } from "zod";
import { pgTable, text, varchar, numeric, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const categories = ["developer", "medical", "engineering", "designer"] as const;
export type Category = typeof categories[number];

export const sizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export type Size = typeof sizes[number];

export const colors = ["black", "white", "navy", "charcoal", "forest", "burgundy", "slate"] as const;
export type Color = typeof colors[number];

export const productTypes = ["t-shirt", "hoodie", "sweatshirt", "long-sleeve", "jacket"] as const;
export type ProductType = typeof productTypes[number];

// Drizzle ORM Product Table
export const productsTable = pgTable("products", {
  id: varchar("id").primaryKey(),
  name: varchar("name").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: numeric("original_price", { precision: 10, scale: 2 }),
  category: varchar("category").notNull(),
  type: varchar("type").notNull(),
  colors: json("colors").$type<Color[]>().notNull(),
  sizes: json("sizes").$type<Size[]>().notNull(),
  images: json("images").$type<string[]>().notNull(),
  featured: boolean("featured").notNull().default(false),
  new: boolean("new").notNull().default(false),
  inStock: boolean("in_stock").notNull().default(true),
});

export const productInsertSchema = createInsertSchema(productsTable);
export type InsertProduct = z.infer<typeof productInsertSchema>;

// Legacy Product Interface (for backwards compatibility)
export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  type: ProductType;
  colors: Color[];
  sizes: Size[];
  images: string[];
  featured: boolean;
  new: boolean;
  inStock: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  size: Size;
  color: Color;
}

export interface Cart {
  id: string;
  items: CartItem[];
}

export interface OrderInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: OrderInfo;
  subtotal: number;
  shipping: number;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: string;
}

export const orderInfoSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Valid zip code required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(10, "Valid phone number required"),
});

export type InsertOrderInfo = z.infer<typeof orderInfoSchema>;

export const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
  size: z.enum(sizes),
  color: z.enum(colors),
});

export type InsertCartItem = z.infer<typeof addToCartSchema>;

export const uploadProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  tagline: z.string().min(1, "Tagline is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  originalPrice: z.number().min(0, "Original price must be positive").optional(),
  category: z.enum(categories),
  type: z.enum(productTypes),
  colors: z.array(z.enum(colors)).min(1, "At least one color required"),
  sizes: z.array(z.enum(sizes)).min(1, "At least one size required"),
  images: z.array(z.string().url()).min(1, "At least one image required"),
  featured: z.boolean().optional().default(false),
  new: z.boolean().optional().default(true),
  inStock: z.boolean().optional().default(true),
});

export type UploadProductInput = z.infer<typeof uploadProductSchema>;
