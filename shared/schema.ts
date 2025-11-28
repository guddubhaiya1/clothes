import { z } from "zod";

export const categories = ["developer", "medical", "engineering", "designer"] as const;
export type Category = typeof categories[number];

export const sizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export type Size = typeof sizes[number];

export const colors = ["black", "white", "navy", "charcoal", "forest", "burgundy", "slate"] as const;
export type Color = typeof colors[number];

export const productTypes = ["t-shirt", "hoodie", "sweatshirt", "long-sleeve", "jacket"] as const;
export type ProductType = typeof productTypes[number];

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
