import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    rating: 5,
    text: "The 'Committed Hoodie' is absolutely perfect! Quality is premium and the design speaks to every developer's soul. Worth every rupee!",
  },
  {
    id: "2",
    name: "Priya Singh",
    rating: 5,
    text: "Ordered the 'Stack Overflow' tee as a gift for my brother. He hasn't taken it off since! Amazing quality and delivery was super fast.",
  },
  {
    id: "3",
    name: "Arjun Patel",
    rating: 5,
    text: "CodeDrip's hoodie collection is insane. The comfort and design are unmatched. This is now my go-to brand for tech wear.",
  },
  {
    id: "4",
    name: "Ananya Sharma",
    rating: 5,
    text: "As a doctor, the medical-themed apparel from CodeDrip is hilarious and relatable. Perfect gift for my medical school friends!",
  },
  {
    id: "5",
    name: "Vikram Verma",
    rating: 5,
    text: "The engineering collection is brilliant! The wordplay on the designs is so clever. Premium quality that actually lasts.",
  },
  {
    id: "6",
    name: "Deepika Nair",
    rating: 5,
    text: "CodeDrip > every other apparel brand. The attention to detail and the sarcastic taglines are exactly what I need in my wardrobe.",
  },
  {
    id: "7",
    name: "Aman Gupta",
    rating: 5,
    text: "Ordered 3 hoodies already! The fit is perfect, material is premium, and the designs never fail to make people laugh at conferences.",
  },
  {
    id: "8",
    name: "Neha Kapoor",
    rating: 5,
    text: "As a designer, I appreciate the aesthetic of CodeDrip's designs. They're bold, clever, and genuinely make a statement.",
  },
  {
    id: "9",
    name: "Rohan Bhat",
    rating: 5,
    text: "The customer service is incredible. Had a sizing question and they responded within 2 hours. Product quality is top-notch!",
  },
  {
    id: "10",
    name: "Sanya Malhotra",
    rating: 5,
    text: "CodeDrip's collection celebrates tech culture in a way I've never seen before. Every piece tells a story. Highly recommend!",
  },
];

export function ReviewsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      scrollPositionRef.current += 0.5;
      
      // When we scroll past half the content, reset to create seamless loop
      if (scrollPositionRef.current >= scrollContainer.scrollWidth / 2) {
        scrollPositionRef.current = 0;
      }

      scrollContainer.scrollLeft = scrollPositionRef.current;
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Developers Love About CodeDrip
          </h2>
          <p className="text-muted-foreground">
            <span className="font-mono text-primary">{"//"}</span> Real reviews from real tech enthusiasts
          </p>
        </motion.div>

        {/* Scrolling Reviews Container */}
        <div className="relative">
          {/* Gradient overlays for visual effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-hidden scroll-smooth pb-2"
          >
            {/* Duplicate reviews for seamless loop */}
            {[...reviews, ...reviews].map((review, index) => (
              <motion.div
                key={`${review.id}-${Math.floor(index / reviews.length)}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % reviews.length) * 0.05 }}
                className="flex-shrink-0 w-80 backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-xl p-6 hover:bg-white/15 dark:hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      data-testid={`star-${review.id}-${i}`}
                    />
                  ))}
                </div>

                <p className="text-foreground mb-4 leading-relaxed text-sm line-clamp-4">
                  "{review.text}"
                </p>

                <p className="text-sm font-medium text-primary">
                  {review.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-xs text-muted-foreground font-mono">
            ↔ Scroll to see more reviews
          </p>
        </motion.div>
      </div>
    </section>
  );
}
