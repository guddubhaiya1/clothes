import { Link } from "wouter";
import { motion } from "framer-motion";
import { Code2, Stethoscope, Wrench, Palette, ArrowRight } from "lucide-react";

const categories = [
  {
    id: "developer",
    name: "Developer",
    tagline: "// git commit -m \"looking good\"",
    description: "Code compiles. Style executes.",
    icon: Code2,
    gradient: "from-purple-500/20 to-blue-500/20",
    accentColor: "text-purple-500",
    count: 12,
  },
  {
    id: "medical",
    name: "Medical",
    tagline: "// status: ALWAYS_ON_CALL",
    description: "Comfort for 24-hour shifts.",
    icon: Stethoscope,
    gradient: "from-emerald-500/20 to-teal-500/20",
    accentColor: "text-emerald-500",
    count: 8,
  },
  {
    id: "engineering",
    name: "Engineering",
    tagline: "// complexity: O(style)",
    description: "Built to last. Designed to impress.",
    icon: Wrench,
    gradient: "from-orange-500/20 to-red-500/20",
    accentColor: "text-orange-500",
    count: 6,
  },
  {
    id: "designer",
    name: "Designer",
    tagline: "// margin: 0 | padding: immaculate",
    description: "Pixel perfect, always.",
    icon: Palette,
    gradient: "from-pink-500/20 to-purple-500/20",
    accentColor: "text-pink-500",
    count: 4,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function CategoryCards() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by <span className="gradient-text">Profession</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            <span className="font-mono text-primary">{"//"}</span> Find apparel that speaks your language
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={`/shop?category=${category.id}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative h-full overflow-hidden rounded-lg bg-gradient-to-br ${category.gradient} border border-border/50 p-6 cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-lg`}
                  data-testid={`link-category-${category.id}`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-dot-pattern opacity-20" />
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`relative w-12 h-12 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center mb-4 ${category.accentColor}`}
                  >
                    <category.icon className="h-6 w-6" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative space-y-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground">
                      {category.tagline}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="relative flex items-center justify-between mt-6 pt-4 border-t border-border/50">
                    <span className="text-sm text-muted-foreground">
                      {category.count} products
                    </span>
                    <motion.div
                      className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ visibility: "visible" }}
                    >
                      Shop Now
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
