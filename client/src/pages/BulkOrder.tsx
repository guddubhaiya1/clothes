import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Briefcase, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { bulkOrderSchema } from "@shared/schema";

type BulkOrderFormData = {
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  estimatedQuantity: string;
  productInterests: string;
  message?: string;
};

export default function BulkOrder() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<BulkOrderFormData>({
    resolver: zodResolver(bulkOrderSchema),
    defaultValues: {
      organizationName: "",
      contactPerson: "",
      email: "",
      phone: "+91",
      estimatedQuantity: "",
      productInterests: "",
      message: "",
    },
  });

  const onSubmit = async (data: BulkOrderFormData) => {
    try {
      await apiRequest("POST", "/api/bulk-orders", data);

      toast({
        title: "Success!",
        description: "Your bulk order inquiry has been submitted. We'll contact you soon with pricing details.",
      });

      setIsSubmitted(true);
      form.reset();

      // Reset after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit bulk order inquiry",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Briefcase className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Bulk Orders</h1>
          </div>
          <p className="text-muted-foreground">
            <span className="font-mono text-primary">{"//"}</span> Special pricing for organizations and enterprises
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg p-8 md:p-12"
        >
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Let's Talk Business</h2>
            <p className="text-muted-foreground">
              Fill out the form below and our team will reach out within 24-48 hours with customized pricing for your organization.
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-muted-foreground">
                We've received your inquiry and will contact you shortly with exclusive pricing.
              </p>
            </motion.div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Organization Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-primary">Organization Details</h3>

                  <FormField
                    control={form.control}
                    name="organizationName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your company or organization name"
                            data-testid="input-organization-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your full name"
                            data-testid="input-contact-person"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-primary">Contact Information</h3>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            data-testid="input-bulk-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+91 9876543210"
                            data-testid="input-bulk-phone"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Order Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-primary">Order Details</h3>

                  <FormField
                    control={form.control}
                    name="estimatedQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Quantity</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger data-testid="select-quantity">
                              <SelectValue placeholder="Select quantity range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="50-100">50 - 100 units</SelectItem>
                              <SelectItem value="100-250">100 - 250 units</SelectItem>
                              <SelectItem value="250-500">250 - 500 units</SelectItem>
                              <SelectItem value="500-1000">500 - 1,000 units</SelectItem>
                              <SelectItem value="1000+">1,000+ units</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="productInterests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Categories of Interest</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger data-testid="select-products">
                              <SelectValue placeholder="Select product category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="developer">Developer Apparel</SelectItem>
                              <SelectItem value="medical">Medical Professional Apparel</SelectItem>
                              <SelectItem value="engineering">Engineering Apparel</SelectItem>
                              <SelectItem value="designer">Designer Apparel</SelectItem>
                              <SelectItem value="all">All Categories</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Additional Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your specific needs, timeline, or customization requirements..."
                          className="resize-none"
                          data-testid="input-bulk-message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                  data-testid="button-submit-bulk-order"
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Submit Bulk Order Inquiry"}
                </Button>
              </form>
            </Form>
          )}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 rounded-lg p-6">
            <h3 className="font-semibold mb-2">Competitive Pricing</h3>
            <p className="text-sm text-muted-foreground">
              Get exclusive bulk discounts tailored to your order volume and requirements.
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 rounded-lg p-6">
            <h3 className="font-semibold mb-2">Custom Options</h3>
            <p className="text-sm text-muted-foreground">
              Explore customization possibilities including colors, designs, and packaging.
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 rounded-lg p-6">
            <h3 className="font-semibold mb-2">Dedicated Support</h3>
            <p className="text-sm text-muted-foreground">
              Our team will work closely with you to ensure a smooth ordering and delivery process.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
