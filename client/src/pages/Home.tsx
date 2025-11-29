import { Hero } from "@/components/Hero";
import { CategoryCards } from "@/components/CategoryCards";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Newsletter } from "@/components/Newsletter";
import { BrandStory } from "@/components/BrandStory";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CategoryCards />
      <FeaturedProducts />
      <Newsletter />
      <BrandStory />
    </main>
  );
}
