import { EmergencyHero } from "./EmergencyHero";
import { EmergencyFindBlood } from "./EmergencyFindBlood";
import { EmergencyHowItWorks } from "./EmergencyHowItWorks";
import { EmergencyInformation } from "./EmergencyInformation";
import { EmergencyFinalCTA } from "./EmergencyFinalCTA";

export function EmergencyPage() {
  return (
    <>
      <EmergencyHero />
      <EmergencyFindBlood />
      <EmergencyHowItWorks />
      <EmergencyInformation />
      <EmergencyFinalCTA />
    </>
  );
}