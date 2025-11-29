import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          We're More Than Just Apparel
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          DebugWear was born from a simple belief: professionals deserve to wear their passion. Whether you code all night, save lives, build bridges, or design the future—your work deserves recognition, respect, and a little bit of humor.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            We believe that the work you do matters. It shapes the world. Every line of code, every surgery, every calculation, every design choice—it all contributes to making the world better. And that deserves to be celebrated.
          </p>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            DebugWear exists to give professionals a way to express their identity. Our products combine premium quality, clever wordplay, and sarcastic humor to create apparel that makes you smile while reminding you why you do what you do. We're here to celebrate the grind, the late nights, the breakthrough moments, and everything in between.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every piece of DebugWear apparel is a conversation starter—a way to connect with fellow professionals who get it. Who understand the passion. Who appreciate the craft. Who don't take themselves too seriously.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-border rounded-lg">
              <h3 className="text-xl font-bold mb-3">Quality First</h3>
              <p className="text-muted-foreground">
                We use premium materials and meticulous craftsmanship. Your DebugWear apparel isn't just a t-shirt—it's a statement piece you'll wear for years.
              </p>
            </div>
            <div className="p-6 border border-border rounded-lg">
              <h3 className="text-xl font-bold mb-3">Authentic Expression</h3>
              <p className="text-muted-foreground">
                Our designs celebrate real professions with genuine humor and respect. No gatekeeping. No gatekeeping. Just authentic appreciation for your craft.
              </p>
            </div>
            <div className="p-6 border border-border rounded-lg">
              <h3 className="text-xl font-bold mb-3">Community Driven</h3>
              <p className="text-muted-foreground">
                We listen to our community and build products that matter to them. Your feedback shapes our future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card text-center">
        <h2 className="text-3xl font-bold mb-6">Join the DebugWear Community</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Wear your passion. Celebrate your craft. Be part of something bigger.
        </p>
        <Link href="/shop">
          <Button size="lg">Shop Now</Button>
        </Link>
      </section>
    </div>
  );
}
