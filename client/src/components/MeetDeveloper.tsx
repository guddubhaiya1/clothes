import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MeetDeveloper() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet the <span className="gradient-text">Developer</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            <span className="font-mono text-primary">{"//"}</span> The brain behind CodeDrip
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Photo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-border p-1">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop"
                  alt="Siddharth Senior Developer"
                  className="w-full h-auto rounded-lg object-cover aspect-[4/5]"
                />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-3xl font-bold mb-2">Siddharth</h3>
                <p className="text-lg font-mono text-primary">Senior Developer</p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Full-stack developer with a passion for building exceptional digital experiences. 
                Specialized in modern web technologies, clean code architecture, and bringing bold ideas to life.
              </p>

              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <span className="text-primary">→</span>
                  <span>Building CodeDrip from Delhi</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-primary">→</span>
                  <span>Expert in React, Node.js, and Modern Web Stack</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-primary">→</span>
                  <span>Passionate about creative design & developer experience</span>
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <a href="mailto:siddharthsekhar1111@gmail.com">
                  <Button variant="default" size="sm" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
