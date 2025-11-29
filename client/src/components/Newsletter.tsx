import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/subscribe", { 
        email: email.trim(),
        createdAt: new Date().toISOString(),
      });
      
      toast({
        title: "Subscribed!",
        description: "Thanks for subscribing to our newsletter",
      });
      
      setIsSubscribed(true);
      setEmail("");
      
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error: any) {
      if (error.message?.includes("409") || error.message?.includes("already")) {
        toast({
          title: "Already subscribed",
          description: "This email is already in our newsletter",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to subscribe. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay in the Loop
          </h2>
          <p className="text-muted-foreground">
            <span className="font-mono text-primary">{"//"}</span> Get exclusive drops and insider updates
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading || isSubscribed}
            data-testid="input-newsletter-email"
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={isLoading || isSubscribed}
            size="lg"
            data-testid="button-subscribe"
          >
            {isSubscribed ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Subscribed
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                {isLoading ? "Subscribing..." : "Subscribe"}
              </>
            )}
          </Button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-sm text-muted-foreground mt-4"
        >
          No spam, just fresh drops and updates.
        </motion.p>
      </div>
    </section>
  );
}
