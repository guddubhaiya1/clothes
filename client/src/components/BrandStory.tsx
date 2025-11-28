import { motion } from "framer-motion";
import { Code2, Heart, Coffee, Zap } from "lucide-react";

const values = [
  {
    icon: Code2,
    title: "Developer First",
    description: "Built by developers, for developers. We speak your language.",
  },
  {
    icon: Heart,
    title: "Premium Quality",
    description: "Luxury materials that feel as good as clean code looks.",
  },
  {
    icon: Coffee,
    title: "Fueled by Passion",
    description: "Every design is crafted with obsessive attention to detail.",
  },
  {
    icon: Zap,
    title: "No Compromises",
    description: "Style that executes perfectly, every single time.",
  },
];

export function BrandStory() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <span className="font-mono text-sm text-primary mb-2 block">
                // OUR STORY
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Where <span className="gradient-text">Clever</span> Meets Comfortable
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground">
              <p>
                CodeDrip was born from a simple observation: professionals who spend 
                their days solving complex problems deserve apparel that's just as thoughtful.
              </p>
              <p>
                We create premium clothing that speaks to the inside jokes, the late nights, 
                and the unique culture of developers, engineers, and medical professionals. 
                Every piece tells a story that only you and your colleagues will truly get.
              </p>
              <p className="font-mono text-primary text-sm">
                {`// The result? Apparel that compiles perfectly.`}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold font-mono text-primary">10K+</div>
                <div className="text-xs text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold font-mono text-accent">50+</div>
                <div className="text-xs text-muted-foreground">Unique Designs</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold font-mono text-neon-pink">24</div>
                <div className="text-xs text-muted-foreground">Countries</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Values Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg bg-card border border-card-border hover:border-primary/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
