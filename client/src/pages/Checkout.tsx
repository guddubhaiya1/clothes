import { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Check, CreditCard, Lock, Package, Truck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/products-data";
import { orderInfoSchema, type InsertOrderInfo } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const steps = [
  { id: 1, name: "Shipping", icon: Truck },
  { id: 2, name: "Payment", icon: CreditCard },
  { id: 3, name: "Confirmation", icon: Check },
];

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "India",
];

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

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const { items, getSubtotal, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const customerInfoRef = useRef<InsertOrderInfo | null>(null);

  const subtotal = getSubtotal(products);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const form = useForm<InsertOrderInfo>({
    resolver: zodResolver(orderInfoSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
    },
  });

  const getProduct = (productId: string) => {
    return products.find((p) => p.id === productId);
  };

  const handleShippingSubmit = async (data: InsertOrderInfo) => {
    customerInfoRef.current = data;
    setCurrentStep(2);
  };

  const handlePaymentSubmit = async () => {
    if (!customerInfoRef.current) {
      toast({
        title: "Error",
        description: "Please complete shipping information first.",
        variant: "destructive",
      });
      setCurrentStep(1);
      return;
    }

    setIsProcessing(true);
    
    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        customerInfo: customerInfoRef.current,
        subtotal,
        shipping,
        total,
      };

      const response = await apiRequest("POST", "/api/orders", orderData);
      const order = response as { id: string };
      
      setOrderNumber(order.id);
      setOrderComplete(true);
      setCurrentStep(3);
      clearCart();
      
      toast({
        title: "Order Confirmed!",
        description: `Your order ${order.id} has been placed successfully.`,
      });
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "There was an issue processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <main className="min-h-screen pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Package className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
            <p className="text-muted-foreground font-mono mb-6">
              // Nothing to checkout
            </p>
            <Link href="/shop">
              <Button data-testid="button-shop-now">
                Shop Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  if (orderComplete) {
    return (
      <main className="min-h-screen pt-20 md:pt-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6"
            >
              <Check className="h-10 w-10 text-accent" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-2">
              Thank you for your purchase
            </p>
            <p className="font-mono text-primary text-lg mb-8">
              Order #{orderNumber}
            </p>

            <div className="p-6 rounded-lg bg-card border border-card-border text-left mb-8">
              <h3 className="font-semibold mb-4">What's next?</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-accent mt-0.5" />
                  You'll receive an order confirmation email shortly
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-accent mt-0.5" />
                  We'll notify you when your order ships
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-accent mt-0.5" />
                  Estimated delivery: 3-5 business days
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button data-testid="button-continue-shopping">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" data-testid="button-back-home">
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 md:pt-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/shop">
            <Button variant="ghost" size="sm" className="group -ml-2" data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Shop
            </Button>
          </Link>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    currentStep >= step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <step.icon className="h-4 w-4" />
                  <span className="text-sm font-medium hidden sm:inline">
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 md:w-16 h-0.5 mx-2 ${
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="p-6 md:p-8 rounded-lg bg-card border border-card-border">
              {currentStep === 1 && (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleShippingSubmit)}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-xl font-semibold mb-1">Shipping Information</h2>
                      <p className="text-sm text-muted-foreground font-mono">
                        // Where should we send your order?
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="you@example.com"
                              type="email"
                              {...field}
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John"
                                {...field}
                                data-testid="input-first-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Doe"
                                {...field}
                                data-testid="input-last-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="123 Main St"
                              {...field}
                              data-testid="input-address"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem className="col-span-2 sm:col-span-1">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="San Francisco"
                                {...field}
                                data-testid="input-city"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="CA"
                                {...field}
                                data-testid="input-state"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="94102"
                                {...field}
                                data-testid="input-zip"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger data-testid="select-country">
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {countries.map((country) => (
                                  <SelectItem key={country} value={country}>
                                    {country}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="(555) 123-4567"
                                type="tel"
                                {...field}
                                data-testid="input-phone"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      data-testid="button-continue-to-payment"
                    >
                      Continue to Payment
                    </Button>
                  </form>
                </Form>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Payment Method</h2>
                    <p className="text-sm text-muted-foreground font-mono">
                      // Cash on Delivery
                    </p>
                  </div>

                  <div className="p-6 rounded-lg bg-accent/5 border border-accent/30">
                    <div className="flex items-center gap-3 mb-4">
                      <Check className="h-5 w-5 text-accent" />
                      <span className="text-sm font-medium">
                        Cash on Delivery Selected
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Pay for your order when it arrives at your doorstep. Our delivery partner will collect the payment upon delivery.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>No need to enter card details</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Pay securely when your order is delivered</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Estimated delivery: 3-5 business days</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/30 border border-border">
                    <h3 className="text-sm font-semibold mb-3">Order Summary for Delivery</h3>
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
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-border text-base font-semibold">
                        <span>Total Amount Due</span>
                        <span className="text-accent">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="sm:flex-1"
                      data-testid="button-back-to-shipping"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handlePaymentSubmit}
                      disabled={isProcessing}
                      className="sm:flex-[2]"
                      size="lg"
                      data-testid="button-place-order"
                    >
                      {isProcessing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="mr-2"
                          >
                            <Package className="h-4 w-4" />
                          </motion.div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Confirm Order — ${total.toFixed(2)}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="sticky top-24 p-6 rounded-lg bg-card border border-card-border">
              <h3 className="font-semibold mb-4">Order Summary</h3>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;

                  return (
                    <div
                      key={`${item.productId}-${item.size}-${item.color}`}
                      className="flex gap-3"
                    >
                      <div className="w-16 h-20 rounded-md overflow-hidden bg-muted/30 flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-1">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>{item.size}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <div
                              className="w-3 h-3 rounded-full border border-border"
                              style={{ backgroundColor: getColorHex(item.color) }}
                            />
                            <span className="capitalize">{item.color}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </span>
                          <span className="text-sm font-medium">
                            ${(product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-4 border-t border-border text-sm">
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
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-border text-base font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
