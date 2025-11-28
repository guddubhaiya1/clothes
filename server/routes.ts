import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { addToCartSchema, orderInfoSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ============== PRODUCT ROUTES ==============
  
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const { category, featured, new: isNew } = req.query;
      
      let products;
      
      if (featured === "true") {
        products = await storage.getFeaturedProducts();
      } else if (isNew === "true") {
        products = await storage.getNewProducts();
      } else if (category && typeof category === "string") {
        products = await storage.getProductsByCategory(category);
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get single product by ID
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // ============== CART ROUTES ==============
  
  // Create new cart
  app.post("/api/cart", async (req, res) => {
    try {
      const cart = await storage.createCart();
      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to create cart" });
    }
  });

  // Get cart by ID
  app.get("/api/cart/:cartId", async (req, res) => {
    try {
      const cart = await storage.getCart(req.params.cartId);
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  // Add item to cart
  app.post("/api/cart/:cartId/items", async (req, res) => {
    try {
      const result = addToCartSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid cart item data", details: result.error.issues });
      }

      const cart = await storage.addToCart(req.params.cartId, result.data);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to add item to cart" });
    }
  });

  // Update cart item quantity
  app.patch("/api/cart/:cartId/items", async (req, res) => {
    try {
      const { productId, size, color, quantity } = req.body;
      
      if (!productId || !size || !color || quantity === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const cart = await storage.updateCartItem(
        req.params.cartId,
        productId,
        size,
        color,
        quantity
      );
      res.json(cart);
    } catch (error: any) {
      if (error.message === "Cart not found" || error.message === "Item not found in cart") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  // Remove item from cart
  app.delete("/api/cart/:cartId/items", async (req, res) => {
    try {
      const { productId, size, color } = req.body;
      
      if (!productId || !size || !color) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const cart = await storage.removeFromCart(
        req.params.cartId,
        productId,
        size,
        color
      );
      res.json(cart);
    } catch (error: any) {
      if (error.message === "Cart not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to remove item from cart" });
    }
  });

  // Clear cart
  app.delete("/api/cart/:cartId", async (req, res) => {
    try {
      const cart = await storage.clearCart(req.params.cartId);
      res.json(cart);
    } catch (error: any) {
      if (error.message === "Cart not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  // ============== ORDER ROUTES ==============
  
  // Create order (checkout)
  app.post("/api/orders", async (req, res) => {
    try {
      const { items, customerInfo, subtotal, shipping, total } = req.body;
      
      // Validate customer info
      const customerResult = orderInfoSchema.safeParse(customerInfo);
      if (!customerResult.success) {
        return res.status(400).json({ 
          error: "Invalid customer information", 
          details: customerResult.error.issues 
        });
      }

      // Validate items
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Order must have at least one item" });
      }

      // Validate totals
      if (typeof subtotal !== "number" || typeof shipping !== "number" || typeof total !== "number") {
        return res.status(400).json({ error: "Invalid order totals" });
      }

      const order = await storage.createOrder({
        items,
        customerInfo: customerResult.data,
        subtotal,
        shipping,
        total,
      });

      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  // Get order by ID
  app.get("/api/orders/:orderId", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  return httpServer;
}
