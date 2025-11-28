import { createContext, useContext, useState, useEffect } from "react";
import type { CartItem, Product, Size, Color } from "@shared/schema";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (productId: string, size: Size, color: Color, quantity?: number) => void;
  removeItem: (productId: string, size: Size, color: Color) => void;
  updateQuantity: (productId: string, size: Size, color: Color, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: (products: Product[]) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("codedrip-cart");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return [];
        }
      }
    }
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ id: string } | null>(null);

  // Fetch user and load their cart if logged in
  useEffect(() => {
    const fetchUserAndCart = async () => {
      try {
        const userRes = await fetch("/api/auth/user");
        const userData = await userRes.json();
        
        if (userData?.id) {
          setUser(userData);
          // Load user's cart from database
          const cartRes = await fetch(`/api/cart/user`);
          if (cartRes.ok) {
            const cartData = await cartRes.json();
            if (cartData?.items) {
              setItems(cartData.items);
            }
          }
        } else {
          setUser(null);
          // Load cart from localStorage for guest users
          const stored = localStorage.getItem("codedrip-cart");
          if (stored) {
            try {
              setItems(JSON.parse(stored));
            } catch {
              setItems([]);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch user or cart:", error);
      }
    };

    fetchUserAndCart();
  }, []);

  useEffect(() => {
    if (user?.id) {
      // Save to database if user is logged in
      fetch("/api/cart/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      }).catch(err => console.error("Failed to save cart to database:", err));
    } else {
      // Save to localStorage if user is not logged in
      localStorage.setItem("codedrip-cart", JSON.stringify(items));
    }
  }, [items, user]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addItem = (productId: string, size: Size, color: Color, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === productId && item.size === size && item.color === color
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { productId, size, color, quantity }];
    });
    openCart();
  };

  const removeItem = (productId: string, size: Size, color: Color) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.size === size && item.color === color)
      )
    );
  };

  const updateQuantity = (productId: string, size: Size, color: Color, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId, size, color);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const getItemCount = () => items.reduce((sum, item) => sum + item.quantity, 0);

  const getSubtotal = (products: Product[]) => {
    return items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemCount,
        getSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
