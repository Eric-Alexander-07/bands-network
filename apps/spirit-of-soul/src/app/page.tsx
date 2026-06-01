import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SocialSection from "@/components/SocialSection";
import OccasionsSection from "@/components/OccasionsSection";
import ClientsStrip from "@/components/ClientsStrip";
import BookingCTA from "@/components/BookingCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SocialSection />
      <OccasionsSection />
      <ClientsStrip />
      <BookingCTA />
    </>
  );
}
