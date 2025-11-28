import { useState, useMemo } from "react";
import { useLocation, useSearch } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductCard } from "@/components/ProductCard";
import { products, getProductsByCategory } from "@/lib/products-data";
import { categories, productTypes } from "@shared/schema";

type SortOption = "featured" | "newest" | "price-asc" | "price-desc";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const categoryLabels: Record<string, string> = {
  all: "All Products",
  developer: "Developer",
  medical: "Medical",
  engineering: "Engineering",
  designer: "Designer",
};

export default function Shop() {
  const searchParams = new URLSearchParams(useSearch());
  const initialCategory = searchParams.get("category") || "all";
  const initialFilter = searchParams.get("filter");

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [, setLocation] = useLocation();

  const filteredProducts = useMemo(() => {
    let result = selectedCategory === "all" 
      ? products 
      : getProductsByCategory(selectedCategory);

    if (initialFilter === "new") {
      result = result.filter((p) => p.new);
    }

    if (selectedTypes.length > 0) {
      result = result.filter((p) => selectedTypes.includes(p.type));
    }

    switch (sortBy) {
      case "newest":
        result = [...result].sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      default:
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, selectedTypes, sortBy, initialFilter]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      setLocation("/shop");
    } else {
      setLocation(`/shop?category=${category}`);
    }
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedTypes([]);
    setSortBy("featured");
    setLocation("/shop");
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedTypes.length > 0;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
          <ChevronDown className="h-4 w-4" />
          Category
        </h4>
        <div className="space-y-2">
          {["all", ...categories].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedCategory === category
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              data-testid={`filter-category-${category}`}
            >
              {categoryLabels[category] || category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Types */}
      <div>
        <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
          <ChevronDown className="h-4 w-4" />
          Product Type
        </h4>
        <div className="space-y-2">
          {productTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors capitalize ${
                selectedTypes.includes(type)
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              data-testid={`filter-type-${type}`}
            >
              {type.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full"
          data-testid="button-clear-filters"
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <main className="min-h-screen pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {initialFilter === "new" ? (
              <>New <span className="gradient-text">Arrivals</span></>
            ) : selectedCategory === "all" ? (
              <>All <span className="gradient-text">Products</span></>
            ) : (
              <><span className="gradient-text capitalize">{selectedCategory}</span> Collection</>
            )}
          </h1>
          <p className="text-muted-foreground">
            <span className="font-mono text-primary">{"//"}</span>{" "}
            {filteredProducts.length} products found
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block w-64 flex-shrink-0"
          >
            <div className="sticky top-24 p-4 rounded-lg bg-card border border-card-border">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                <Filter className="h-4 w-4" />
                <span className="font-semibold">Filters</span>
              </div>
              <FilterContent />
            </div>
          </motion.aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border"
            >
              <div className="flex items-center gap-2 flex-wrap">
                {/* Mobile Filter Button */}
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="lg:hidden"
                      data-testid="button-mobile-filters"
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                      {hasActiveFilters && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {(selectedCategory !== "all" ? 1 : 0) + selectedTypes.length}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Filters
                      </SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Active Filter Tags */}
                <AnimatePresence mode="popLayout">
                  {selectedCategory !== "all" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Badge
                        variant="secondary"
                        className="cursor-pointer capitalize"
                        onClick={() => handleCategoryChange("all")}
                      >
                        {selectedCategory}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    </motion.div>
                  )}
                  {selectedTypes.map((type) => (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Badge
                        variant="secondary"
                        className="cursor-pointer capitalize"
                        onClick={() => toggleType(type)}
                      >
                        {type.replace("-", " ")}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-40" data-testid="select-sort">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Grid Toggle - Desktop only */}
                <div className="hidden md:flex items-center gap-1 p-1 rounded-md bg-muted/50">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${gridCols === 3 ? "bg-background shadow-sm" : ""}`}
                    onClick={() => setGridCols(3)}
                    data-testid="button-grid-3"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${gridCols === 4 ? "bg-background shadow-sm" : ""}`}
                    onClick={() => setGridCols(4)}
                    data-testid="button-grid-4"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground font-mono text-sm mb-4">
                  // Query returned empty results
                </p>
                <Button onClick={clearFilters} data-testid="button-clear-filters-empty">
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                layout
                className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${
                  gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4"
                }`}
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
