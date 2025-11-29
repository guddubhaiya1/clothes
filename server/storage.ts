import { randomUUID } from "crypto";
import type { 
  Product, 
  Cart, 
  CartItem, 
  Order, 
  OrderInfo,
  UploadProductInput,
  InsertSubscriber
} from "@shared/schema";
import { db } from "./db";
import { subscribersTable } from "@shared/schema";
import { eq } from "drizzle-orm";

const products: Product[] = [
  {
    id: "committed-hoodie",
    name: "Committed",
    tagline: "// git commit -m \"to you forever\"",
    description: "For those who commit to their code and their relationships. Premium cotton blend hoodie that's as reliable as your version control. Because real developers know that the best commits are the ones you never revert.",
    price: 89.99,
    originalPrice: 109.99,
    category: "developer",
    type: "hoodie",
    colors: ["black", "charcoal", "navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/products/black-hoodie.png"],
    featured: true,
    new: true,
    inStock: true,
  },
  {
    id: "404-not-found-tee",
    name: "404: Sleep Not Found",
    tagline: "// Error: REM_CYCLE_UNDEFINED",
    description: "The official uniform for debugging at 3 AM. When your sleep pattern returns null and your coffee dependency is critical. Made from ultra-soft cotton that feels like the cloud services you can't afford.",
    price: 49.99,
    category: "developer",
    type: "t-shirt",
    colors: ["white", "black", "charcoal"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: ["/products/white-tshirt.png"],
    featured: true,
    new: false,
    inStock: true,
  },
  {
    id: "merge-conflict-crew",
    name: "Merge Conflict",
    tagline: "// HEAD -> main | relationship -> complicated",
    description: "When your code conflicts but your style doesn't. This premium crewneck celebrates the beautiful chaos of collaborative development. Soft, comfortable, and unlike your git history, always clean.",
    price: 74.99,
    originalPrice: 84.99,
    category: "developer",
    type: "sweatshirt",
    colors: ["navy", "charcoal", "black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/products/navy-sweatshirt.png"],
    featured: true,
    new: false,
    inStock: true,
  },
  {
    id: "query-everything-tee",
    name: "Query Everything",
    tagline: "// SELECT * FROM life WHERE meaning IS NOT NULL",
    description: "For database enthusiasts who question everything. This shirt runs faster than your unindexed queries. Premium fabric that won't normalize your style but will definitely structure your look.",
    price: 44.99,
    category: "developer",
    type: "t-shirt",
    colors: ["charcoal", "white", "black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: ["/products/gray-tshirt.png"],
    featured: false,
    new: true,
    inStock: true,
  },
  {
    id: "on-call-hoodie-med",
    name: "On Call",
    tagline: "// status: ALWAYS_AVAILABLE",
    description: "For medical professionals who never truly clock out. Comfortable enough for 24-hour shifts, stylish enough for rounds. The pager may be gone, but the commitment remains. Premium heavyweight cotton for those cold hospital nights.",
    price: 94.99,
    category: "medical",
    type: "hoodie",
    colors: ["forest", "navy", "black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/products/green-hoodie.png"],
    featured: true,
    new: true,
    inStock: true,
  },
  {
    id: "stat-order-tee",
    name: "STAT Order",
    tagline: "// priority: CRITICAL | eta: NOW",
    description: "When everything is urgent but you still have style. For healthcare heroes who run toward emergencies in comfort. Premium quick-dry fabric because you're already running.",
    price: 49.99,
    category: "medical",
    type: "t-shirt",
    colors: ["white", "forest", "navy"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: ["/products/white-tshirt.png"],
    featured: false,
    new: false,
    inStock: true,
  },
  {
    id: "over-engineered-longsleeve",
    name: "Over Engineered",
    tagline: "// complexity: O(n!) | style: O(1)",
    description: "For engineers who always find the most elegant solution, eventually. This long-sleeve is structurally sound and aesthetically optimized. Premium construction that could survive a peer review.",
    price: 59.99,
    category: "engineering",
    type: "long-sleeve",
    colors: ["burgundy", "charcoal", "navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/products/burgundy-shirt.png"],
    featured: true,
    new: false,
    inStock: true,
  },
  {
    id: "under-pressure-tee",
    name: "Under Pressure",
    tagline: "// psi: HIGH | composure: HIGHER",
    description: "When deadlines compress but your style expands. For engineers who thrive under stress and always deliver. Premium fabric that handles pressure better than most project managers.",
    price: 44.99,
    category: "engineering",
    type: "t-shirt",
    colors: ["black", "charcoal", "white"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: ["/products/gray-tshirt.png"],
    featured: false,
    new: true,
    inStock: true,
  },
  {
    id: "pixel-perfect-hoodie",
    name: "Pixel Perfect",
    tagline: "// margin: 0 | padding: immaculate",
    description: "For designers who obsess over every detail. When your mockups are flawless and your hoodie should be too. Premium cotton that's as smooth as your gradients and as consistent as your design system.",
    price: 89.99,
    category: "designer",
    type: "hoodie",
    colors: ["black", "white", "charcoal"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/products/black-hoodie.png"],
    featured: false,
    new: true,
    inStock: true,
  },
  {
    id: "undefined-behavior-tee",
    name: "Undefined Behavior",
    tagline: "// result: ¯\\_(ツ)_/¯",
    description: "For those moments when the code works but nobody knows why. Embrace the chaos with this premium tee. Soft cotton that's more predictable than your legacy codebase.",
    price: 44.99,
    category: "developer",
    type: "t-shirt",
    colors: ["black", "charcoal", "navy"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: ["/products/black-hoodie.png"],
    featured: false,
    new: false,
    inStock: true,
  },
  {
    id: "coffee-dependency-crew",
    name: "Coffee Dependency",
    tagline: "// import { sanity } from 'caffeine'",
    description: "Required for all builds. This crewneck understands that coffee isn't a want, it's a core dependency. Premium warmth for those long compilation times.",
    price: 74.99,
    category: "developer",
    type: "sweatshirt",
    colors: ["charcoal", "black", "navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/products/navy-sweatshirt.png"],
    featured: false,
    new: false,
    inStock: true,
  },
  {
    id: "first-do-no-harm-tee",
    name: "First, Do No Harm",
    tagline: "// except to disease | error_handling: aggressive",
    description: "The original code of conduct. For medical professionals who took an oath and take it seriously. Premium comfort for those who comfort others.",
    price: 49.99,
    category: "medical",
    type: "t-shirt",
    colors: ["white", "navy", "forest"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: ["/products/white-tshirt.png"],
    featured: false,
    new: false,
    inStock: true,
  },
];

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getNewProducts(): Promise<Product[]>;
  createProduct(productData: UploadProductInput): Promise<Product>;
  
  getCart(cartId: string): Promise<Cart | undefined>;
  createCart(): Promise<Cart>;
  addToCart(cartId: string, item: CartItem): Promise<Cart>;
  updateCartItem(cartId: string, productId: string, size: string, color: string, quantity: number): Promise<Cart>;
  removeFromCart(cartId: string, productId: string, size: string, color: string): Promise<Cart>;
  clearCart(cartId: string): Promise<Cart>;
  
  getUserCart(userId: string): Promise<CartItem[] | undefined>;
  saveUserCart(userId: string, items: CartItem[]): Promise<CartItem[]>;
  
  createOrder(orderData: { items: CartItem[]; customerInfo: OrderInfo; subtotal: number; shipping: number; total: number }): Promise<Order>;
  getOrder(orderId: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private carts: Map<string, Cart>;
  private orders: Map<string, Order>;
  private dynamicProducts: Product[];
  private userCarts: Map<string, CartItem[]>;

  constructor() {
    this.carts = new Map();
    this.orders = new Map();
    this.dynamicProducts = [];
    this.userCarts = new Map();
  }

  async getProducts(): Promise<Product[]> {
    return [...products, ...this.dynamicProducts];
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return products.find((p) => p.id === id) || this.dynamicProducts.find((p) => p.id === id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const allProducts = [...products, ...this.dynamicProducts];
    if (category === "all") return allProducts;
    return allProducts.filter((p) => p.category === category);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const allProducts = [...products, ...this.dynamicProducts];
    return allProducts.filter((p) => p.featured);
  }

  async getNewProducts(): Promise<Product[]> {
    const allProducts = [...products, ...this.dynamicProducts];
    return allProducts.filter((p) => p.new);
  }

  async createProduct(productData: UploadProductInput): Promise<Product> {
    const newProduct: Product = {
      id: productData.id || `product-${Date.now()}`,
      name: productData.name,
      tagline: productData.tagline,
      description: productData.description,
      price: productData.price,
      originalPrice: productData.originalPrice,
      category: productData.category,
      type: productData.type,
      colors: productData.colors,
      sizes: productData.sizes,
      images: productData.images,
      featured: productData.featured || false,
      new: productData.new || true,
      inStock: productData.inStock || true,
    };
    this.dynamicProducts.push(newProduct);
    return newProduct;
  }

  async getCart(cartId: string): Promise<Cart | undefined> {
    return this.carts.get(cartId);
  }

  async createCart(): Promise<Cart> {
    const cart: Cart = {
      id: randomUUID(),
      items: [],
    };
    this.carts.set(cart.id, cart);
    return cart;
  }

  async addToCart(cartId: string, item: CartItem): Promise<Cart> {
    let cart = this.carts.get(cartId);
    if (!cart) {
      cart = await this.createCart();
    }

    const existingIndex = cart.items.findIndex(
      (i) => i.productId === item.productId && i.size === item.size && i.color === item.color
    );

    if (existingIndex !== -1) {
      cart.items[existingIndex].quantity += item.quantity;
    } else {
      cart.items.push(item);
    }

    this.carts.set(cart.id, cart);
    return cart;
  }

  async updateCartItem(
    cartId: string,
    productId: string,
    size: string,
    color: string,
    quantity: number
  ): Promise<Cart> {
    const cart = this.carts.get(cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }

    const itemIndex = cart.items.findIndex(
      (i) => i.productId === productId && i.size === size && i.color === color
    );

    if (itemIndex === -1) {
      throw new Error("Item not found in cart");
    }

    if (quantity < 1) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    this.carts.set(cart.id, cart);
    return cart;
  }

  async removeFromCart(cartId: string, productId: string, size: string, color: string): Promise<Cart> {
    const cart = this.carts.get(cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.items = cart.items.filter(
      (i) => !(i.productId === productId && i.size === size && i.color === color)
    );

    this.carts.set(cart.id, cart);
    return cart;
  }

  async clearCart(cartId: string): Promise<Cart> {
    const cart = this.carts.get(cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.items = [];
    this.carts.set(cart.id, cart);
    return cart;
  }

  async createOrder(orderData: {
    items: CartItem[];
    customerInfo: OrderInfo;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  }): Promise<Order> {
    const orderId = `CD-${Date.now().toString(36).toUpperCase()}`;
    const createdAt = new Date().toISOString();
    
    try {
      // Save to Neon database
      const productIds = orderData.items.map(item => item.productId);
      
      await db.insert(ordersTable).values({
        id: orderId,
        email: orderData.customerInfo.email,
        firstName: orderData.customerInfo.firstName,
        lastName: orderData.customerInfo.lastName,
        address: orderData.customerInfo.address,
        city: orderData.customerInfo.city,
        state: orderData.customerInfo.state,
        zipCode: orderData.customerInfo.zipCode,
        country: orderData.customerInfo.country,
        phone: orderData.customerInfo.phone,
        productIds,
        items: orderData.items,
        subtotal: orderData.subtotal.toString(),
        shipping: orderData.shipping.toString(),
        tax: orderData.tax.toString(),
        total: orderData.total.toString(),
        status: "confirmed",
        createdAt,
      });
    } catch (error) {
      console.error("Database error saving order:", error);
    }

    // Always return order (in case DB fails, it's still saved in memory)
    const order: Order = {
      id: orderId,
      items: orderData.items,
      customerInfo: orderData.customerInfo,
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      total: orderData.total,
      status: "confirmed",
      createdAt,
    };

    this.orders.set(order.id, order);
    return order;
  }

  async getOrder(orderId: string): Promise<Order | undefined> {
    return this.orders.get(orderId);
  }

  async getUserCart(userId: string): Promise<CartItem[] | undefined> {
    return this.userCarts.get(userId);
  }

  async saveUserCart(userId: string, items: CartItem[]): Promise<CartItem[]> {
    this.userCarts.set(userId, items);
    return items;
  }

  async subscribe(email: string): Promise<{ id: string; email: string; createdAt: string }> {
    try {
      // Check if email already exists
      const existing = await db
        .select()
        .from(subscribersTable)
        .where(eq(subscribersTable.email, email));

      if (existing.length > 0) {
        throw new Error("Email already subscribed");
      }

      const subscriber = {
        id: randomUUID(),
        email,
        createdAt: new Date().toISOString(),
      };

      await db.insert(subscribersTable).values(subscriber);
      return subscriber;
    } catch (error: any) {
      if (error.message === "Email already subscribed") {
        throw error;
      }
      // If database fails, fall back to in-memory for development
      console.error("Database error:", error);
      throw new Error("Failed to subscribe");
    }
  }

  async getSubscribers(): Promise<Array<{ id: string; email: string; createdAt: string }>> {
    try {
      const subscribers = await db
        .select()
        .from(subscribersTable)
        .orderBy(subscribersTable.createdAt);
      
      return subscribers.map(s => ({
        id: s.id,
        email: s.email,
        createdAt: s.createdAt,
      }));
    } catch (error) {
      console.error("Database error:", error);
      return [];
    }
  }
}

export const storage = new MemStorage();
