import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X, Sun, Moon, Search, LogIn, User as UserIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-provider";
import { useCart } from "@/lib/cart-context";

interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
}

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=developer", label: "Developer" },
  { href: "/shop?category=medical", label: "Medical" },
  { href: "/shop?category=engineering", label: "Engineering" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { toggleCart, getItemCount } = useCart();
  const itemCount = getItemCount();

  const highlightText = (query: string) => {
    clearHighlight();
    if (!query.trim()) return;

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const nodesToReplace: Array<{ node: Node; parent: Node }> = [];
    let node;
    while ((node = walker.nextNode())) {
      if (node.textContent?.toLowerCase().includes(query.toLowerCase())) {
        nodesToReplace.push({ node, parent: node.parentNode! });
      }
    }

    nodesToReplace.forEach(({ node, parent }) => {
      const regex = new RegExp(`(${query})`, "gi");
      const span = document.createElement("span");
      span.innerHTML = node.textContent!.replace(
        regex,
        '<mark style="background-color: #fbbf24; padding: 2px 4px; border-radius: 2px;">$1</mark>'
      );
      parent.replaceChild(span, node);
    });
  };

  const clearHighlight = () => {
    document.querySelectorAll("mark").forEach((mark) => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(mark.textContent || ""), mark);
        parent.normalize();
      }
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/user");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 cursor-pointer"
                data-testid="link-home-logo"
              >
                <span className="font-mono text-xl md:text-2xl font-bold tracking-tight">
                  <span className="text-primary">{"<"}</span>
                  <span className="gradient-text">CodeDrip</span>
                  <span className="text-primary">{"/>"}</span>
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                      location === link.href || location.includes(link.href.split("?")[0])
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                    data-testid={`link-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Find in Page - Desktop */}
              <div className="hidden md:flex items-center gap-2">
                {isSearchOpen ? (
                  <input
                    type="text"
                    placeholder="Find in page..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      highlightText(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                        clearHighlight();
                      }
                    }}
                    autoFocus
                    className="w-48 px-3 py-2 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="input-find-in-page"
                  />
                ) : null}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen);
                    if (isSearchOpen) {
                      setSearchQuery("");
                      clearHighlight();
                    }
                  }}
                  data-testid="button-search"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>

              {/* Auth Button */}
              {user ? (
                <Link href="/profile">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden md:flex"
                      title={user.displayName}
                      data-testid="button-user-profile"
                    >
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.displayName}
                          className="w-5 h-5 rounded-full"
                        />
                      ) : (
                        <UserIcon className="h-5 w-5" />
                      )}
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <Link href="/login">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden md:flex gap-2"
                      data-testid="button-login"
                    >
                      <LogIn className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
              )}

              {/* Theme Toggle */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  data-testid="button-theme-toggle"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {theme === "dark" ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              {/* Cart Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleCart}
                  className="relative"
                  data-testid="button-cart"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center"
                    >
                      {itemCount > 99 ? "99+" : itemCount}
                    </motion.span>
                  )}
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border md:hidden"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={link.href}>
                    <span
                      className={`block px-4 py-3 rounded-md text-base font-medium transition-colors cursor-pointer ${
                        location === link.href
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                      data-testid={`link-mobile-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
