import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VideoSection from "@/components/VideoSection";
import OccasionsSection from "@/components/OccasionsSection";
import GallerySection from "@/components/GallerySection";
import ClientsStrip from "@/components/ClientsStrip";
import BookingCTA from "@/components/BookingCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <VideoSection />
      <OccasionsSection />
      <GallerySection />
      <ClientsStrip />
      <BookingCTA />
    </>
  );
}
