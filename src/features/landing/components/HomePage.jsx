import { HeroSection } from "./HeroSection";
import { EmergencyBloodSearch } from "./EmergencyBloodSearch";
import { BloodAvailability } from "./BloodAvailability";
import { HowItWorks } from "./HowItWorks";
import { DonorImpact } from "./DonorImpact";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <EmergencyBloodSearch />
      <BloodAvailability />
      <HowItWorks />
      <DonorImpact />
    </>
  );
}