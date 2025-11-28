import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:siddharthsekhar1111@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <Card className="p-6 flex flex-col items-center text-center">
            <Mail className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <a
              href="mailto:siddharthsekhar1111@gmail.com"
              className="text-primary hover:underline break-all"
            >
              siddharthsekhar1111@gmail.com
            </a>
          </Card>

          <Card className="p-6 flex flex-col items-center text-center">
            <MapPin className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Address</h3>
            <p className="text-muted-foreground">Delhi, India</p>
          </Card>

          <Card className="p-6 flex flex-col items-center text-center">
            <Clock className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Response Time</h3>
            <p className="text-muted-foreground">24-48 hours</p>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="p-8">
          <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="input-name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="input-email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this about?"
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="input-subject"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message here..."
                rows={6}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                data-testid="textarea-message"
              />
            </div>

            <Button type="submit" size="lg" className="w-full md:w-auto" data-testid="button-submit">
              Send Message
            </Button>
          </form>
        </Card>
      </section>

      {/* FAQ Link */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card text-center">
        <h2 className="text-3xl font-bold mb-4">Looking for quick answers?</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Check out our FAQ page for common questions and answers.
        </p>
        <a href="/faq">
          <Button variant="outline">Visit FAQ</Button>
        </a>
      </section>
    </div>
  );
}
