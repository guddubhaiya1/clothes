import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/products-data";
import type { Product } from "@shared/schema";

function getColorHex(color: string): string {
  const colorMap: Record<string, string> = {
    black: "#1a1a1a",
    white: "#f5f5f5",
    navy: "#1e3a5f",
    charcoal: "#36454f",
    forest: "#228b22",
    burgundy: "#722f37",
    slate: "#708090",
  };
  return colorMap[color] || "#888888";
}

export function CartPanel() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getItemCount,
    getSubtotal,
  } = useCart();

  const itemCount = getItemCount();
  const subtotal = getSubtotal(products);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  const getProduct = (productId: string): Product | undefined => {
    return products.find((p) => p.id === productId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={closeCart}
            data-testid="cart-backdrop"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col"
            data-testid="cart-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Your Cart</h2>
                <span className="text-sm text-muted-foreground">
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeCart}
                data-testid="button-close-cart"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                    <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    <span className="font-mono">// No items found</span>
                  </p>
                  <Button onClick={closeCart} data-testid="button-continue-shopping">
                    Continue Shopping
                  </Button>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => {
                    const product = getProduct(item.productId);
                    if (!product) return null;

                    return (
                      <motion.div
                        key={`${item.productId}-${item.size}-${item.color}`}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-4 p-3 rounded-lg bg-background/50 border border-border/50"
                        data-testid={`cart-item-${item.productId}`}
                      >
                        {/* Product Image */}
                        <div className="w-20 h-24 rounded-md overflow-hidden bg-muted/30 flex-shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-medium text-sm line-clamp-1">
                                {product.name}
                              </h4>
                              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                                {product.type}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.productId, item.size, item.color)}
                              data-testid={`button-remove-${item.productId}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Size and Color */}
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                              {item.size}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <div
                                className="w-3.5 h-3.5 rounded-full border border-border"
                                style={{ backgroundColor: getColorHex(item.color) }}
                              />
                              <span className="text-xs text-muted-foreground capitalize">
                                {item.color}
                              </span>
                            </div>
                          </div>

                          {/* Quantity and Price */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-1">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.size,
                                    item.color,
                                    item.quantity - 1
                                  )
                                }
                                data-testid={`button-decrease-${item.productId}`}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.size,
                                    item.color,
                                    item.quantity + 1
                                  )
                                }
                                data-testid={`button-increase-${item.productId}`}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <span className="font-semibold">
                              ${(product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-4 space-y-4 bg-background/50">
                {/* Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-accent">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                  <div className="flex justify-between pt-2 border-t border-border text-base font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout" onClick={closeCart}>
                  <Button
                    className="w-full group"
                    size="lg"
                    data-testid="button-checkout"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                {/* Continue Shopping */}
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={closeCart}
                  data-testid="button-continue-shopping-footer"
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
