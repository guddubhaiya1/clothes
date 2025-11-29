import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Returns() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Return Policy</h1>
          <p className="text-lg text-muted-foreground">
            At DebugWear, we stand behind our quality. Here's what you need to know.
          </p>
        </div>
      </section>

      {/* Main Policy */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 border-2 border-primary">
            <div className="flex items-start gap-4 mb-6">
              <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-2">No Returns Policy</h2>
                <p className="text-muted-foreground">
                  We do not accept returns or exchanges on any DebugWear products.
                </p>
              </div>
            </div>
          </Card>

          <div className="mt-12 space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Why No Returns?</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At DebugWear, we believe in radical transparency and quality assurance. Every product is carefully crafted and quality-checked before it ships to you. We put in the work upfront so you don't have to worry about quality issues.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                However, we understand that sometimes things happen. That's why we have processes to ensure you get exactly what you ordered.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">What If Something Is Wrong?</h3>
              <p className="text-muted-foreground mb-4">
                If you receive a product that is:
              </p>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Damaged during shipping</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Defective or has manufacturing issues</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Not as described on our website</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Please contact us immediately at siddharthsekhar1111@gmail.com with photos and details. We'll make it right—whether that's a replacement or refund.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Size & Fit Issues</h3>
              <p className="text-muted-foreground mb-4">
                We provide detailed size guides for every market. Please check the size guide before ordering. If the size doesn't fit as expected, we recommend:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Giving it a try—sometimes items feel different than expected</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Washing according to care instructions (fit may adjust slightly)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Reach out to us—we might be able to help</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Our Commitment to You</h3>
              <p className="text-muted-foreground leading-relaxed">
                While we don't accept standard returns, we're committed to your satisfaction. Every DebugWear product is made with premium materials and attention to detail. We believe in what we make, and we stand behind it.
              </p>
            </div>

            <div className="bg-card border border-border p-6 rounded-lg">
              <h4 className="font-bold mb-2">Questions?</h4>
              <p className="text-muted-foreground">
                Reach out to us at{" "}
                <a href="mailto:siddharthsekhar1111@gmail.com" className="text-primary hover:underline">
                  siddharthsekhar1111@gmail.com
                </a>
                . We're here to help.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
