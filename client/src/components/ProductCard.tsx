import { Link } from "wouter";
import { motion } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, "M", product.colors[0], 1);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative perspective"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-product-${product.id}`}
    >
      <Link href={`/product/${product.id}`}>
        <motion.div 
          className="relative overflow-hidden rounded-lg bg-card border border-card-border product-card-hover cursor-pointer"
          style={{ perspective: "1000px" }}
          animate={{
            rotateX: isHovered ? 5 : 0,
            rotateY: isHovered ? -5 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Image Container */}
          <div className="relative aspect-[4/5] overflow-hidden bg-muted/30">
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            
            {/* Overlay on Hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.new && (
                <Badge className="bg-accent text-accent-foreground font-mono text-xs px-2 py-1">
                  NEW
                </Badge>
              )}
              {discount > 0 && (
                <Badge className="bg-destructive text-destructive-foreground font-mono text-xs px-2 py-1">
                  -{discount}%
                </Badge>
              )}
            </div>

            {/* Quick Actions - Visible on Hover */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-3 left-3 right-3 flex gap-2"
              style={{ visibility: isHovered ? "visible" : "hidden" }}
            >
              <Button
                size="sm"
                className="flex-1 text-xs"
                onClick={handleQuickAdd}
                data-testid={`button-quick-add-${product.id}`}
              >
                <ShoppingBag className="h-3.5 w-3.5 mr-1" />
                Quick Add
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="backdrop-blur-sm bg-background/50"
                data-testid={`button-view-${product.id}`}
              >
                <Eye className="h-3.5 w-3.5" />
              </Button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-2">
            {/* Category Tag */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {product.category}
              </span>
              <span className="text-muted-foreground/50">•</span>
              <span className="text-xs text-muted-foreground capitalize">
                {product.type}
              </span>
            </div>

            {/* Product Name */}
            <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Tagline */}
            <p className="font-mono text-xs text-muted-foreground line-clamp-1">
              {product.tagline}
            </p>

            {/* Price */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Color Options */}
            <div className="flex items-center gap-1.5 pt-1">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color}
                  className="w-4 h-4 rounded-full border border-border/50"
                  style={{ backgroundColor: getColorHex(color) }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

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
