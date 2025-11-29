import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Package, Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

interface OrderItem {
  productId: string;
  quantity: number;
  size: string;
  color: string;
}

interface UserOrder {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  items: OrderItem[];
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
  status: string;
  createdAt: string;
}

export default function OrderHistory() {
  const { toast } = useToast();
  const { data: orders = [], isLoading, error } = useQuery<UserOrder[]>({
    queryKey: ["/api/user/orders"],
    retry: 1,
  });

  // Debug: Log auth errors
  if (error) {
    console.error("Order history error:", error);
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return `₹${numPrice.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-700 dark:text-green-400";
      case "shipped":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-400";
      case "delivered":
        return "bg-purple-500/20 text-purple-700 dark:text-purple-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Order History</h1>
          </div>
          <p className="text-muted-foreground">
            <span className="font-mono text-primary">{"//"}</span> Track and manage your purchases
          </p>
        </motion.div>

        {error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <Package className="w-12 h-12 text-destructive mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Authentication Required</h3>
            <p className="text-muted-foreground mb-6">
              Please log in to view your order history.
            </p>
            <Link href="/login">
              <Button variant="default" data-testid="button-login-to-view">
                Login
              </Button>
            </Link>
          </motion.div>
        ) : isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">Loading your orders...</div>
          </div>
        ) : (orders as UserOrder[]).length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Link href="/shop">
              <Button variant="default" data-testid="button-start-shopping">
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {(orders as UserOrder[]).map((order: UserOrder, index: number) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="p-6 hover-elevate cursor-pointer" data-testid={`card-order-${order.id}`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg" data-testid={`text-order-id-${order.id}`}>
                          Order #{order.id}
                        </h3>
                        <Badge className={getStatusColor(order.status)} data-testid={`badge-status-${order.id}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span data-testid={`text-date-${order.id}`}>{formatDate(order.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span data-testid={`text-location-${order.id}`}>
                            {order.city}, {order.state}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary" data-testid={`text-total-${order.id}`}>
                        {formatPrice(order.total)}
                      </p>
                      <p className="text-sm text-muted-foreground">{order.items.length} item(s)</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t border-border pt-4 mb-4">
                    <div className="space-y-2">
                      {order.items.map((item: OrderItem, idx: number) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground" data-testid={`text-item-${idx}`}>
                            {item.productId} - Qty: {item.quantity}
                          </span>
                          <span>
                            Size: {item.size} | Color: {item.color}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-muted/30 rounded-lg p-3 text-sm space-y-1 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span data-testid={`text-subtotal-${order.id}`}>{formatPrice(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span data-testid={`text-shipping-${order.id}`}>{formatPrice(order.shipping)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (18% GST):</span>
                      <span data-testid={`text-tax-${order.id}`}>{formatPrice(order.tax)}</span>
                    </div>
                    <div className="border-t border-border pt-1 mt-1 flex justify-between font-semibold">
                      <span>Total:</span>
                      <span data-testid={`text-final-total-${order.id}`}>{formatPrice(order.total)}</span>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-2">Shipping To:</p>
                    <p data-testid={`text-address-${order.id}`}>
                      {order.firstName} {order.lastName}
                    </p>
                    <p>{order.address}</p>
                    <p>
                      {order.city}, {order.state} {order.zipCode}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
