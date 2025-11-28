import { Link } from "wouter";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen pt-20 md:pt-24 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Error Code */}
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-8"
          >
            <div className="text-8xl md:text-9xl font-bold font-mono gradient-text">
              404
            </div>
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6"
          >
            <Code2 className="h-8 w-8 text-muted-foreground" />
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 mb-8"
          >
            <h1 className="text-2xl font-bold">Page Not Found</h1>
            <div className="font-mono text-muted-foreground space-y-1">
              <p className="text-primary">{"// Error: PAGE_NOT_FOUND"}</p>
              <p>{"const page = undefined;"}</p>
              <p>{"// Perhaps you meant /shop ?"}</p>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button data-testid="button-go-home">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" data-testid="button-browse-shop">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse Shop
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
