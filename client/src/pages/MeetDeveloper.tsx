import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Github, Linkedin, Mail } from "lucide-react";
import developerImage from "@assets/generated_images/professional_developer_headshot.png";

export default function MeetDeveloper() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Meet the Developer</h1>
          <p className="text-lg text-muted-foreground">
            The mind and hands behind DebugWear. Learn about the journey, passion, and mission.
          </p>
        </div>
      </section>

      {/* Developer Profile */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Photo */}
              <div className="md:col-span-1 flex justify-center">
                <div className="relative">
                  <Avatar className="w-40 h-40 md:w-48 md:h-48">
                    <AvatarImage src={developerImage} alt="Siddharth" />
                    <AvatarFallback>SK</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 rounded-full border-4 border-primary opacity-0 hover:opacity-20 transition"></div>
                </div>
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <h2 className="text-4xl font-bold mb-2">Siddharth</h2>
                <p className="text-lg text-primary font-semibold mb-6">
                  Founder & Full-Stack Developer
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Hi! I'm Siddharth, the creator of DebugWear. I started this journey with a simple observation: professionals across every field deserve apparel that celebrates their work with authenticity and humor.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  As a full-stack developer, I've always believed in the power of good design meeting functionality. DebugWear is my attempt to bring that philosophy to real-world products that our community actually wants to wear.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not building features or dreaming up new designs, you'll find me diving deep into new technologies, contributing to open-source projects, or brainstorming the next clever tagline that'll make you smile.
                </p>
              </div>
            </div>
          </Card>

          {/* Story Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">The DebugWear Story</h2>

            <div className="space-y-8">
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">The Spark</h3>
                <p className="text-muted-foreground leading-relaxed">
                  DebugWear began as a personal passion project. I noticed something: developers, doctors, engineers, and designers spend years mastering their craft, but there wasn't apparel that genuinely celebrated their work with authenticity and a touch of humor. The options were generic, mass-produced, and uninspired.
                </p>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">The Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I wanted to create something different. Premium quality apparel paired with clever wordplay and sarcastic taglines that speak to the shared experiences of professionals. Products that make you smile when you wear them. Shirts and hoodies that become conversations, not just clothing.
                </p>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">The Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Today, DebugWear is about building a community. A place where your work is celebrated, where the grind is acknowledged, where late nights and breakthroughs are honored. We're not just selling apparel—we're creating a movement of professionals who aren't afraid to wear their passion on their sleeve.
                </p>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">The Future</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We're just getting started. With your support, DebugWear will expand to more professions, new product categories, and even better designs. We're listening to our community and building with your feedback. The best is yet to come.
                </p>
              </Card>
            </div>
          </div>

          {/* Skills & Focus */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Tech Stack</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>• React & TypeScript</p>
                <p>• Node.js & Express</p>
                <p>• PostgreSQL & Drizzle ORM</p>
                <p>• Tailwind CSS & Framer Motion</p>
                <p>• TanStack Query & Wouter</p>
                <p>• Google OAuth & Passport.js</p>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Focus Areas</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>• Full-stack web development</p>
                <p>• User experience design</p>
                <p>• Performance optimization</p>
                <p>• Scalable architecture</p>
                <p>• Community building</p>
                <p>• Creative product development</p>
              </div>
            </Card>
          </div>

          {/* Connect */}
          <Card className="p-8 mt-16 bg-card text-center">
            <h3 className="text-2xl font-bold mb-6">Get Connected</h3>
            <p className="text-muted-foreground mb-8">
              Have ideas, feedback, or just want to say hi? Let's connect!
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="mailto:siddharthsekhar1111@gmail.com">
                <button className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition">
                  <Mail className="w-4 h-4" />
                  Email
                </button>
              </a>
              <button className="flex items-center gap-2 px-6 py-2 bg-card border border-border text-foreground rounded-md font-medium hover:bg-accent transition">
                <Github className="w-4 h-4" />
                GitHub
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-card border border-border text-foreground rounded-md font-medium hover:bg-accent transition">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </button>
            </div>
          </Card>

          {/* Philosophy */}
          <Card className="p-8 mt-16 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4 text-center">My Philosophy</h3>
            <p className="text-muted-foreground text-center text-lg leading-relaxed italic">
              "Your work matters. The problems you solve, the lives you touch, the creations you build—they all deserve recognition. DebugWear exists to celebrate that. To remind you why you do what you do, even on the hard days. And to connect you with a community of people who get it."
            </p>
            <p className="text-muted-foreground text-center mt-6 font-semibold">
              — Siddharth
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
