import { Link } from "wouter";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Github, Twitter, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const footerLinks = {
  shop: [
    { name: "All Products", href: "/shop" },
    { name: "Developer", href: "/shop?category=developer" },
    { name: "Medical", href: "/shop?category=medical" },
    { name: "Engineering", href: "/shop?category=engineering" },
    { name: "New Arrivals", href: "/shop?filter=new" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "FAQ", href: "/faq" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description: "Welcome to the CodeDrip community. Expect great things.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-card border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Join the <span className="gradient-text">CodeDrip</span> Community
              </h3>
              <p className="text-muted-foreground">
                Get early access to new drops, exclusive discounts, and the best developer humor
                delivered straight to your inbox.
              </p>
              <p className="font-mono text-sm text-primary mt-2">
                // No spam. Unsubscribe anytime.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  data-testid="input-newsletter-email"
                />
              </div>
              <Button
                type="submit"
                className="group"
                data-testid="button-subscribe"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link href="/">
              <span className="font-mono text-xl font-bold tracking-tight cursor-pointer">
                <span className="text-primary">{"<"}</span>
                <span className="gradient-text">CodeDrip</span>
                <span className="text-primary">{"/>"}</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mt-4 max-w-xs">
              Premium apparel for professionals who speak in code.
              Where clever meets comfortable.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-md bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground font-mono">
              {`// © ${new Date().getFullYear()} CodeDrip. All rights reserved.`}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="font-mono text-xs">
                v1.0.0 | Built with caffeine and commits
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
    </footer>
  );
}
