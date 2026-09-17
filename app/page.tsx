import { HeroBanner } from "@/components/homepage/hero-banner";
import { CategoryCarousel } from "@/components/homepage/category-carousel";
import { FeaturedCollection } from "@/components/homepage/featured-collection";
import { EditorialFeature } from "@/components/homepage/editorial-feature";
import { NewArrivals } from "@/components/homepage/new-arrivals";
import { BestSellers } from "@/components/homepage/best-sellers";
import { SecondaryCollection } from "@/components/homepage/secondary-collection";
import { PromotionalBanner } from "@/components/homepage/promotional-banner";
import { AboutSection } from "@/components/homepage/about-section";
import { Newsletter } from "@/components/homepage/newsletter";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryCarousel />
      <FeaturedCollection />
      <EditorialFeature />
      <NewArrivals />
      <BestSellers />
      <SecondaryCollection />
      <PromotionalBanner />
      <AboutSection />
      <Newsletter />
    </>
  );
}
