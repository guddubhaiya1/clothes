import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20" />
      
      {/* Floating Shapes - 3D Effect */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0],
          rotateX: [0, 10, 0],
          rotateY: [0, 15, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ perspective: "1200px" }}
        className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0],
          rotateX: [0, -10, 0],
          rotateY: [0, -15, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ perspective: "1200px" }}
        className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-accent/20 to-neon-pink/20 blur-3xl"
      />
      
      {/* Floating Code Symbols - 3D Rotating */}
      <motion.div
        animate={{ 
          y: [0, -30, 0], 
          opacity: [0.3, 0.6, 0.3],
          rotateX: [0, 180, 360],
          rotateZ: [0, 10, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ perspective: "1000px" }}
        className="absolute top-20 right-10 md:right-32 text-primary/20 font-mono text-4xl md:text-6xl font-bold hidden sm:block"
      >
        {"{ }"}
      </motion.div>
      <motion.div
        animate={{ 
          y: [0, 20, 0], 
          opacity: [0.2, 0.5, 0.2],
          rotateY: [0, 180, 360],
          rotateZ: [0, -10, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ perspective: "1000px" }}
        className="absolute bottom-32 left-10 md:left-32 text-accent/20 font-mono text-3xl md:text-5xl font-bold hidden sm:block"
      >
        {"</>"}
      </motion.div>
      <motion.div
        animate={{ 
          y: [0, -15, 0], 
          opacity: [0.25, 0.55, 0.25],
          rotateX: [0, 360, 0],
          rotate: [0, 360, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ perspective: "1000px" }}
        className="absolute top-1/3 left-20 text-neon-pink/20 font-mono text-2xl md:text-4xl font-bold hidden md:block"
      >
        {"//"}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 md:space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            <Sparkles className="h-4 w-4" />
            <span className="font-mono">New Collection Dropped</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
          >
            <span className="block">Where Your</span>
            <span className="block gradient-text animate-gradient-x bg-[length:200%_auto]">
              Code Compiles
            </span>
            <span className="block">& Style Executes</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground"
          >
            Premium apparel for developers, engineers, and medical professionals.
            <span className="block mt-2 font-mono text-primary/80">
              // Clever wordplay. Luxury comfort. No bugs.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/shop">
              <Button
                size="lg"
                className="group text-base px-8 py-6 neon-glow"
                data-testid="button-shop-collection"
              >
                <Code2 className="mr-2 h-5 w-5" />
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/shop?category=developer">
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-6 backdrop-blur-sm"
                data-testid="button-developer-gear"
              >
                Developer Gear
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-8 md:pt-12"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold font-mono text-primary">1.2K</div>
              <div className="text-sm text-muted-foreground">Happy Devs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold font-mono text-accent">50+</div>
              <div className="text-sm text-muted-foreground">Unique Designs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold font-mono text-neon-pink">4.9</div>
              <div className="text-sm text-muted-foreground">Star Rating</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
