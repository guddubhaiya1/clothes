import { Hero } from "@/components/Hero";
import { CategoryCards } from "@/components/CategoryCards";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { BrandStory } from "@/components/BrandStory";
import { MeetDeveloper } from "@/components/MeetDeveloper";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CategoryCards />
      <FeaturedProducts />
      <MeetDeveloper />
      <BrandStory />
    </main>
  );
}
