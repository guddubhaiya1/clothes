import { Card } from "@/components/ui/card";
import { Truck, Package, MapPin, Clock } from "lucide-react";

export default function ShippingInfo() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
          <p className="text-lg text-muted-foreground">
            Fast, reliable delivery across India. Track your order every step of the way.
          </p>
        </div>
      </section>

      {/* Shipping Partner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 border-2 border-primary mb-12">
            <div className="flex items-start gap-4">
              <Truck className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-2">We Ship via Delhivery</h2>
                <p className="text-muted-foreground text-lg">
                  We partner with Delhivery, India's most reliable logistics network, to ensure your CodeDrip products reach you safely and on time.
                </p>
              </div>
            </div>
          </Card>

          {/* Shipping Timeline */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Delivery Timeline</h2>
            <div className="space-y-4">
              {[
                {
                  icon: Package,
                  title: "Order Placed",
                  description: "Your order is confirmed and we begin processing",
                  time: "Day 0",
                },
                {
                  icon: Clock,
                  title: "Order Shipped",
                  description: "Your package is handed over to Delhivery with tracking details",
                  time: "Day 1-2",
                },
                {
                  icon: MapPin,
                  title: "In Transit",
                  description: "Your package is on its way across India. Track in real-time on Delhivery website",
                  time: "Day 2-4",
                },
                {
                  icon: Truck,
                  title: "Out for Delivery",
                  description: "Your package is out with the delivery partner and will arrive today",
                  time: "Day 4-5",
                },
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <Card key={idx} className="p-6 flex items-start gap-4">
                    <Icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                      <p className="text-muted-foreground mb-2">{step.description}</p>
                      <p className="text-sm text-primary font-semibold">{step.time}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Tracking */}
          <Card className="p-8 bg-card mb-12">
            <h2 className="text-2xl font-bold mb-4">Track Your Order</h2>
            <p className="text-muted-foreground mb-6">
              Once your order is shipped, you'll receive a tracking number via email. You can use this number to track your package in real-time on the Delhivery website or mobile app.
            </p>
            <div className="bg-background border border-border p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>What to expect:</strong> Your tracking number will be sent to the email address associated with your order within 24 hours of shipment.
              </p>
            </div>
          </Card>

          {/* Shipping Charges */}
          <Card className="p-8 bg-card mb-12">
            <h2 className="text-2xl font-bold mb-6">Shipping Charges</h2>
            <div className="space-y-4">
              {[
                { range: "Delhi", charge: "Free" },
                { range: "NCR Region", charge: "₹50" },
                { range: "All-India", charge: "₹100" },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                  <span className="font-medium">{item.range}</span>
                  <span className="text-primary font-bold">{item.charge}</span>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-6">
              💡 Free shipping for orders above ₹500 across India!
            </p>
          </Card>

          {/* Safe Packaging */}
          <Card className="p-8 bg-card">
            <h2 className="text-2xl font-bold mb-6">Safe Packaging</h2>
            <p className="text-muted-foreground mb-4">
              We take extra care to ensure your CodeDrip apparel arrives in perfect condition:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Premium protective packaging to prevent damage</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Double boxing for fragile items</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Moisture-resistant packaging for moisture protection</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Branded packaging that makes unboxing special</span>
              </li>
            </ul>
          </Card>

          {/* Support */}
          <section className="mt-12 p-8 bg-card rounded-lg border border-border text-center">
            <h3 className="text-2xl font-bold mb-3">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              If you have any questions about shipping or tracking your order, reach out to us.
            </p>
            <a href="mailto:siddharthsekhar1111@gmail.com" className="text-primary hover:underline font-semibold">
              siddharthsekhar1111@gmail.com
            </a>
          </section>
        </div>
      </section>
    </div>
  );
}
