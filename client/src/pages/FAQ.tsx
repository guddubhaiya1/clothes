import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      category: "Orders & Shipping",
      items: [
        {
          question: "How long does delivery take?",
          answer:
            "Typically, orders are delivered within 4-5 business days across India. Delhi orders might arrive faster. You'll receive a tracking number via email once your order is shipped.",
        },
        {
          question: "Do you offer free shipping?",
          answer:
            "Yes! Free shipping is available for orders above ₹500 across all of India. For orders below ₹500, standard shipping rates apply based on your location.",
        },
        {
          question: "Can I track my order?",
          answer:
            "Absolutely! Once your order ships, you'll receive a tracking number via email. Use this number on the Delhivery website or app to track your package in real-time.",
        },
        {
          question: "What if my order is delayed?",
          answer:
            "Delays can occasionally happen due to weather or logistics issues. Check your tracking number first. If there's an issue, contact us at siddharthsekhar1111@gmail.com and we'll investigate immediately.",
        },
      ],
    },
    {
      category: "Products & Sizing",
      items: [
        {
          question: "How do I choose the right size?",
          answer:
            "Check our detailed Size Guide page for measurements of all products. We provide chest, length, and sleeve measurements in centimeters. Measure yourself and compare with our chart to find your perfect fit.",
        },
        {
          question: "What's your fabric composition?",
          answer:
            "We use premium quality fabrics. Most t-shirts are 100% cotton, while hoodies and sweatshirts blend cotton with polyester for durability and comfort. Each product listing includes detailed fabric information.",
        },
        {
          question: "Do you have size options for everyone?",
          answer:
            "Yes! We offer sizes from XS to 3XL to ensure everyone finds their perfect fit. Check the product page or size guide for available sizes for specific items.",
        },
        {
          question: "Are your designs available in different colors?",
          answer:
            "Many designs come in multiple color options. Check each product page to see all available colors. Our most popular designs are available in classic colors like black, white, navy, and more.",
        },
      ],
    },
    {
      category: "Returns & Policy",
      items: [
        {
          question: "What's your return policy?",
          answer:
            "We don't accept standard returns. However, if your item arrives damaged, defective, or not as described, we'll make it right with a replacement or refund. Contact us with photos at siddharthsekhar1111@gmail.com.",
        },
        {
          question: "What if the size doesn't fit?",
          answer:
            "We recommend checking our detailed size guide before ordering. After receiving, wash and wear the item—sizing might feel different than expected. If it genuinely doesn't fit, reach out and we'll work with you.",
        },
        {
          question: "How do I contact customer support?",
          answer:
            "Email us at siddharthsekhar1111@gmail.com with your order details and issue. We aim to respond within 24-48 hours.",
        },
      ],
    },
    {
      category: "Payment & Security",
      items: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards, debit cards, UPI, and digital wallets through our secure payment gateway. Your payment information is fully encrypted and secure.",
        },
        {
          question: "Is my payment information safe?",
          answer:
            "Yes! We use industry-standard encryption and secure payment processing. Your payment details are never stored on our servers and are handled securely by our payment provider.",
        },
        {
          question: "Will I be charged for placing an order?",
          answer:
            "You'll be charged only when you complete the checkout process. If you abandon your cart, you won't be charged. Review your order before confirming payment.",
        },
      ],
    },
    {
      category: "Account & Loyalty",
      items: [
        {
          question: "Do you have a loyalty program?",
          answer:
            "Currently, we don't have a formal loyalty program, but we reward our repeat customers with exclusive deals and early access to new designs. Follow us for updates!",
        },
        {
          question: "Can I create an account?",
          answer:
            "Yes! You can create an account or sign in with Google to make future purchases faster. Your order history will be saved for reference.",
        },
        {
          question: "How do I update my profile?",
          answer:
            "Sign in to your account and visit the profile page to update your personal information, email, and preferences.",
        },
      ],
    },
    {
      category: "General",
      items: [
        {
          question: "What is CodeDrip all about?",
          answer:
            "CodeDrip celebrates professionals across industries with clever wordplay and premium apparel. We make products for developers, medical professionals, engineers, designers, and more. It's about celebrating your craft with pride and humor.",
        },
        {
          question: "Can I suggest design ideas?",
          answer:
            "Absolutely! We love hearing from our community. Email us at siddharthsekhar1111@gmail.com with your ideas, feedback, or suggestions. You might inspire our next collection!",
        },
        {
          question: "Do you have a physical store?",
          answer:
            "Currently, we operate online only. We're based in Delhi, but we ship across all of India. Visit our online store anytime!",
        },
        {
          question: "Are you hiring?",
          answer:
            "Yes! Check our Careers page for open positions. We're currently hiring for Internship (Backend) and Senior Backend Developer roles.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about CodeDrip, our products, shipping, and more.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqs.map((category, idx) => (
            <div key={idx}>
              <h2 className="text-3xl font-bold mb-6">{category.category}</h2>
              <Card className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((faq, faqIdx) => (
                    <AccordionItem key={faqIdx} value={`${idx}-${faqIdx}`}>
                      <AccordionTrigger className="text-left font-semibold hover:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <Card className="p-8 bg-card">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Couldn't find the answer you were looking for? Reach out to us directly.
            </p>
            <a href="/contact" className="inline-block">
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition">
                Contact Us
              </button>
            </a>
          </Card>
        </div>
      </section>
    </div>
  );
}
