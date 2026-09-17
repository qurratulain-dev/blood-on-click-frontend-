import { ContactHero } from "./ContactHero";
import { ContactInfoAndForm } from "./ContactInfoAndForm";
import { ContactHelpSupport } from "./ContactHelpSupport";
import { ContactFinalCTA } from "./ContactFinalCTA";

export function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInfoAndForm />
      <ContactHelpSupport />
      <ContactFinalCTA />
    </>
  );
}