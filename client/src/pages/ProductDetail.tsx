import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  ArrowLeft, 
  Check, 
  Truck, 
  RotateCcw, 
  Shield,
  ChevronDown,
  Minus,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getProductById } from "@/lib/products-data";
import { useCart } from "@/lib/cart-context";
import type { Size, Color } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

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

const features = [
  { icon: Truck, text: "Free shipping over $100" },
  { icon: RotateCcw, text: "30-day easy returns" },
  { icon: Shield, text: "Premium quality guarantee" },
];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { addItem } = useCart();
  const { toast } = useToast();

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    product?.colors[0] as Color || null
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    return (
      <main className="min-h-screen pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
            <p className="text-muted-foreground font-mono mb-6">
              // Error 404: Product undefined
            </p>
            <Link href="/shop">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Shop
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Select a size",
        description: "Please choose a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    if (!selectedColor) {
      toast({
        title: "Select a color",
        description: "Please choose a color before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    addItem(product.id, selectedSize, selectedColor, quantity);
    toast({
      title: "Added to cart!",
      description: `${product.name} (${selectedSize}, ${selectedColor}) x${quantity}`,
    });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <main className="min-h-screen pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/shop">
            <Button variant="ghost" size="sm" className="group -ml-2" data-testid="button-back-to-shop">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Shop
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-muted/30 border border-border">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.new && (
                  <Badge className="bg-accent text-accent-foreground font-mono">
                    NEW
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge className="bg-destructive text-destructive-foreground font-mono">
                    -{discount}% OFF
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-24 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Category & Type */}
            <div className="flex items-center gap-2 text-sm">
              <span className="font-mono text-primary uppercase tracking-wider">
                {product.category}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground capitalize">
                {product.type}
              </span>
            </div>

            {/* Title & Tagline */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              <p className="font-mono text-muted-foreground">{product.tagline}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">₹{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Color</span>
                <span className="text-sm text-muted-foreground capitalize">
                  {selectedColor}
                </span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color as Color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : "border-border hover:border-foreground/50"
                    }`}
                    style={{ backgroundColor: getColorHex(color) }}
                    title={color}
                    data-testid={`button-color-${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Size</span>
                <button className="text-sm text-primary hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size as Size)}
                    className={`min-w-[3rem] px-4 py-2 rounded-md border text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-foreground/50"
                    }`}
                    data-testid={`button-size-${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <span className="text-sm font-medium">Quantity</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none rounded-l-md"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    data-testid="button-decrease-quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none rounded-r-md"
                    onClick={() => setQuantity((q) => q + 1)}
                    data-testid="button-increase-quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              size="lg"
              className="w-full group text-base py-6 neon-glow"
              onClick={handleAddToCart}
              data-testid="button-add-to-cart"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart — ₹{(product.price * quantity).toFixed(2)}
            </Button>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {features.map((feature) => (
                <div
                  key={feature.text}
                  className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/30"
                >
                  <feature.icon className="h-5 w-5 text-primary mb-2" />
                  <span className="text-xs text-muted-foreground">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Accordion Details */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description">
                <AccordionTrigger className="text-sm font-medium">
                  Product Details
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>{product.description}</p>
                  <ul className="list-disc list-inside space-y-1 pt-2">
                    <li>Premium cotton blend fabric</li>
                    <li>Pre-shrunk for perfect fit</li>
                    <li>Double-stitched seams</li>
                    <li>Tagless for comfort</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="sizing">
                <AccordionTrigger className="text-sm font-medium">
                  Sizing Guide
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="py-2 pr-4">Size</th>
                          <th className="py-2 pr-4">Chest (in)</th>
                          <th className="py-2 pr-4">Length (in)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="py-2">XS</td><td>34-36</td><td>27</td></tr>
                        <tr><td className="py-2">S</td><td>36-38</td><td>28</td></tr>
                        <tr><td className="py-2">M</td><td>38-40</td><td>29</td></tr>
                        <tr><td className="py-2">L</td><td>40-42</td><td>30</td></tr>
                        <tr><td className="py-2">XL</td><td>42-44</td><td>31</td></tr>
                        <tr><td className="py-2">XXL</td><td>44-46</td><td>32</td></tr>
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="care">
                <AccordionTrigger className="text-sm font-medium">
                  Care Instructions
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5" />
                      Machine wash cold with like colors
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5" />
                      Tumble dry low or hang dry
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5" />
                      Do not bleach or iron directly on print
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5" />
                      For best results, wash inside out
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
