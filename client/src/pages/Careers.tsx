import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function Careers() {
  const openPositions = [
    {
      id: 1,
      title: "Internship - Backend Development",
      description: "Join our team and contribute to DebugWear's backend infrastructure. Work with modern tech stack, mentor with experienced developers, and grow your skills in a fast-paced environment.",
      responsibilities: [
        "Develop and maintain backend APIs",
        "Work with PostgreSQL database optimization",
        "Contribute to system architecture discussions",
        "Write clean, maintainable code with comprehensive tests",
      ],
      requirements: [
        "Strong knowledge of Node.js/JavaScript",
        "Understanding of databases and API design",
        "Enthusiasm to learn and collaborate",
        "Problem-solving mindset",
      ],
    },
    {
      id: 2,
      title: "Senior Backend Developer",
      description: "Lead our backend team and shape the technical direction of DebugWear. We're looking for an experienced backend engineer who thrives in fast-paced environments and is passionate about building scalable systems.",
      responsibilities: [
        "Design and implement scalable backend systems",
        "Lead technical decisions and architecture planning",
        "Mentor junior developers and interns",
        "Manage database optimization and performance",
        "Oversee deployment and production infrastructure",
      ],
      requirements: [
        "5+ years of backend development experience",
        "Expert-level Node.js/JavaScript knowledge",
        "Experience with PostgreSQL and database design",
        "Leadership and mentoring experience",
        "Understanding of microservices and scalable architecture",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Join the DebugWear Team</h1>
          <p className="text-lg text-muted-foreground">
            We're building something special and we want you to be part of it. If you're passionate about creating amazing products and love working with talented people, we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8">Why DebugWear?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Meaningful Work</h3>
              <p className="text-muted-foreground">
                Build products that celebrate professionals across the world. Every line of code matters.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Growth Opportunities</h3>
              <p className="text-muted-foreground">
                We invest in your development. Learn, grow, and advance your career with us.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Collaborative Culture</h3>
              <p className="text-muted-foreground">
                Work with brilliant, creative people who are passionate about what they do.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Flexibility</h3>
              <p className="text-muted-foreground">
                Remote-friendly work environment. We believe in work-life balance.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Open Positions</h2>
          <div className="space-y-8">
            {openPositions.map((position) => (
              <Card key={position.id} className="p-8">
                <h3 className="text-2xl font-bold mb-2">{position.title}</h3>
                <p className="text-muted-foreground mb-6">{position.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h4 className="font-bold mb-3">Responsibilities</h4>
                    <ul className="space-y-2">
                      {position.responsibilities.map((item, idx) => (
                        <li key={idx} className="text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {position.requirements.map((item, idx) => (
                        <li key={idx} className="text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <a href="mailto:siddharthsekhar1111@gmail.com?subject=Application for DebugWear - {position.title}">
                    <Button variant="default">
                      <Mail className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Don't see your role?</h2>
        <p className="text-lg text-muted-foreground mb-6">
          We're always looking for talented people. Send us your resume or portfolio!
        </p>
        <a href="mailto:siddharthsekhar1111@gmail.com?subject=Inquiry for DebugWear">
          <Button variant="outline">Get in Touch</Button>
        </a>
      </section>
    </div>
  );
}
