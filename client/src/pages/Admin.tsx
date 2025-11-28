import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Upload, Plus, Trash2, Edit2, FileUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { uploadProductSchema, categories, productTypes, sizes, colors } from "@shared/schema";
import type { UploadProductInput } from "@shared/schema";

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false);
  const [isBulkLoading, setIsBulkLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const csvInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UploadProductInput>({
    resolver: zodResolver(uploadProductSchema),
    defaultValues: {
      name: "",
      tagline: "",
      description: "",
      price: 0,
      originalPrice: undefined,
      category: "developer",
      type: "t-shirt",
      colors: [],
      sizes: [],
      images: [],
      featured: false,
      new: true,
      inStock: true,
    },
  });

  const onSubmit = async (data: UploadProductInput) => {
    if (selectedColors.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one color",
        variant: "destructive",
      });
      return;
    }

    if (selectedSizes.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one size",
        variant: "destructive",
      });
      return;
    }

    if (!imageUrl) {
      toast({
        title: "Error",
        description: "Please provide an image URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        ...data,
        id: `product-${Date.now()}`,
        colors: selectedColors,
        sizes: selectedSizes,
        images: [imageUrl],
      };

      const response = await apiRequest("POST", "/api/admin/products", payload);
      
      toast({
        title: "Success!",
        description: "Product added successfully",
      });

      form.reset();
      setImageUrl("");
      setSelectedColors([]);
      setSelectedSizes([]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add product",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsBulkLoading(true);
    try {
      const text = await file.text();
      const lines = text.split("\n").filter((line) => line.trim());
      
      if (lines.length < 2) {
        toast({
          title: "Error",
          description: "CSV file must have header row and at least one product",
          variant: "destructive",
        });
        return;
      }

      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
      const products = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map((v) => v.trim());
        const product: any = {};

        headers.forEach((header, index) => {
          const value = values[index];
          if (header === "colors" || header === "sizes") {
            product[header] = value.split("|").map((v) => v.trim());
          } else if (header === "price" || header === "originalprice") {
            product[header] = parseFloat(value) || 0;
          } else if (header === "featured" || header === "new" || header === "instock") {
            product[header] = value.toLowerCase() === "true" || value === "1";
          } else {
            product[header] = value;
          }
        });

        products.push(product);
      }

      const response = await fetch("/api/admin/products/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to upload products");
      }

      const result = await response.json();
      toast({
        title: "Success!",
        description: `${result.successCount} products added successfully. ${result.failureCount > 0 ? result.failureCount + " failed." : ""}`,
      });

      if (csvInputRef.current) {
        csvInputRef.current.value = "";
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to process CSV file",
        variant: "destructive",
      });
    } finally {
      setIsBulkLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-20 md:pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-2 text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Add new products to your catalog</p>
        </motion.div>

        {/* Bulk Upload Section */}
        <Card className="p-6 md:p-8 mb-8 border-accent/30 bg-accent/5">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Bulk Upload (CSV)</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Upload up to 200 products at once using a CSV file
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Upload CSV File</label>
              <input
                ref={csvInputRef}
                type="file"
                accept=".csv"
                onChange={handleBulkUpload}
                disabled={isBulkLoading}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                data-testid="input-bulk-csv"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-mono mb-2">CSV Format:</p>
              <code className="text-xs bg-muted p-3 rounded-md block overflow-x-auto whitespace-pre-wrap break-words">
                name,tagline,description,price,originalPrice,category,type,colors,sizes,images,featured,new,inStock
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                • Colors & sizes: separate with | (e.g., "black|white|navy")<br/>
                • Boolean values: true/false or 1/0<br/>
                • Images: comma-separated URLs
              </p>
            </div>
            <a
              href="data:text/csv,name,tagline,description,price,originalPrice,category,type,colors,sizes,images,featured,new,inStock%0ATest%20Product,// test product,Great product description,49.99,69.99,developer,t-shirt,black|white,S|M|L,https://example.com/image.png,true,true,true"
              download="sample.csv"
              className="text-sm text-primary hover:underline"
              data-testid="link-download-sample"
            >
              Download Sample CSV
            </a>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Product Name and Tagline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Committed"
                          {...field}
                          data-testid="input-product-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tagline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tagline *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., // git commit -m &quot;to you forever&quot;"
                          {...field}
                          data-testid="input-product-tagline"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed product description..."
                        className="resize-none min-h-24"
                        {...field}
                        data-testid="textarea-product-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="49.99"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          data-testid="input-product-price"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="originalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Original Price (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="69.99"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                          }
                          data-testid="input-product-original-price"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Category and Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-product-category">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-product-type">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Image URL */}
              <div>
                <FormLabel>Image URL *</FormLabel>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="url"
                    placeholder="https://example.com/image.png"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    data-testid="input-product-image-url"
                  />
                </div>
                {imageUrl && (
                  <div className="mt-4 rounded-md overflow-hidden border border-border">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Colors */}
              <div>
                <FormLabel className="mb-3 block">Select Colors *</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        setSelectedColors((prev) =>
                          prev.includes(color)
                            ? prev.filter((c) => c !== color)
                            : [...prev, color]
                        );
                      }}
                      className={`px-3 py-2 rounded-md border transition-all text-sm ${
                        selectedColors.includes(color)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-foreground"
                      }`}
                      data-testid={`button-color-${color}`}
                    >
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <FormLabel className="mb-3 block">Select Sizes *</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setSelectedSizes((prev) =>
                          prev.includes(size)
                            ? prev.filter((s) => s !== size)
                            : [...prev, size]
                        );
                      }}
                      className={`px-3 py-2 rounded-md border transition-all text-sm font-semibold ${
                        selectedSizes.includes(size)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-foreground"
                      }`}
                      data-testid={`button-size-${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flags */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 mt-4">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="rounded border-border"
                        data-testid="checkbox-featured"
                      />
                      <FormLabel className="mb-0">Featured Product</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="new"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 mt-4">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="rounded border-border"
                        data-testid="checkbox-new"
                      />
                      <FormLabel className="mb-0">New Product</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="inStock"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 mt-4">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="rounded border-border"
                        data-testid="checkbox-in-stock"
                      />
                      <FormLabel className="mb-0">In Stock</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="gap-2"
                  data-testid="button-submit-product"
                >
                  <Upload className="w-4 h-4" />
                  {isLoading ? "Adding..." : "Add Product"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/")}
                  data-testid="button-cancel"
                >
                  Back to Shop
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </main>
  );
}
