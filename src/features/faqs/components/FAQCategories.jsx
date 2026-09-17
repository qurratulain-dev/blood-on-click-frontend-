import { useState } from "react";
import { cn } from "@/lib/utils";
import { FAQAccordionItem } from "./FAQAccordionItem";

const CATEGORIES = ["General", "Finding Blood", "Donors", "Blood Banks", "Accounts"];

const faqItems = [
  {
    id: 1,
    category: "General",
    question: "What is Blood on Click?",
    answer:
      "Blood on Click is a platform that connects people looking for blood with relevant blood donors and blood-bank resources in one place.",
  },
  {
    id: 2,
    category: "General",
    question: "What can I do on Blood on Click?",
    answer:
      "Registered users can search for blood resources, register as a donor or blood bank, submit blood requests, and access a role-based dashboard after signing in.",
  },
  {
    id: 3,
    category: "Finding Blood",
    question: "How can I search for blood donors?",
    answer:
      "After signing in as a Seeker, open the Search Donors page and enter the blood group and, optionally, a location to see matching donor profiles.",
  },
  {
    id: 4,
    category: "Finding Blood",
    question: "Can I search by blood group and location?",
    answer:
      "Yes. Both the Emergency search and the Seeker search let you narrow results by blood group and an optional city or area.",
  },
  {
    id: 5,
    category: "Finding Blood",
    question: "What should I do if I need blood urgently?",
    answer:
      "Use the Emergency page to start a blood search and connect with relevant donors or blood banks. For a medical emergency, contact the appropriate emergency medical service or healthcare provider directly.",
  },
  {
    id: 6,
    category: "Donors",
    question: "How do I become a blood donor?",
    answer:
      "Choose the donor role on the Register page and provide your information, including blood group, age, weight, gender, phone, and address.",
  },
  {
    id: 7,
    category: "Donors",
    question: "Can donors manage their availability or profile?",
    answer:
      "Yes. Donors can update their profile from the donor dashboard, including their donation status (available or not available), contact details, and other personal information.",
  },
  {
    id: 8,
    category: "Blood Banks",
    question: "Can blood banks be part of Blood on Click?",
    answer:
      "Yes. Blood banks can register on the platform and get a dedicated dashboard where they can manage their presence and on-platform activities.",
  },
  {
    id: 9,
    category: "Blood Banks",
    question: "Can blood banks manage blood stock?",
    answer:
      "Registered blood banks can manage their blood stock by blood group through the Manage Stock area of their dashboard.",
  },
  {
    id: 10,
    category: "Accounts",
    question: "Do I need an account to search for blood?",
    answer:
      "Yes. Searching for blood resources is limited to signed-in Seeker accounts, so you will be asked to sign in or register first.",
  },
  {
    id: 11,
    category: "Accounts",
    question: "How do I access my dashboard?",
    answer:
      "After signing in, you are directed to the dashboard for your role — Seeker, Donor, Blood Bank, or Admin — where you can manage your requests, profile, or stock.",
  },
];

export function FAQCategories() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [openIds, setOpenIds] = useState([]);

  const filteredItems = faqItems.filter(
    (item) => item.category === activeCategory
  );

  const toggleItem = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <section
      aria-labelledby="faq-categories-heading"
      className="border-t border-border/60 bg-gray-50 py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center motion-safe:animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            FAQ
          </span>
          <h2
            id="faq-categories-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Find answers by topic
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Browse common questions about Blood on Click and its main
            workflows.
          </p>
        </div>

        <div
          role="group"
          aria-label="FAQ categories"
          className="mt-10 flex flex-wrap items-center justify-center gap-2 motion-safe:animate-fade-up"
        >
          {CATEGORIES.map((category) => {
            const selected = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setOpenIds([]);
                }}
                aria-pressed={selected}
                className={cn(
                  "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-red-600/20",
                  selected
                    ? "bg-red-600 text-white shadow-sm shadow-red-600/20"
                    : "border border-border bg-white text-muted-foreground hover:border-red-300 hover:text-foreground"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-8 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm shadow-black/[0.04] motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
            {filteredItems.map((item) => (
              <FAQAccordionItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={openIds.includes(item.id)}
                onToggle={() => toggleItem(item.id)}
                buttonId={`faq-question-${item.id}`}
                panelId={`faq-answer-${item.id}`}
              />
            ))}
          </div>

          <p
            className="mt-6 text-center text-sm text-muted-foreground motion-safe:animate-fade-up"
            aria-live="polite"
          >
            Showing {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "question" : "questions"} under{" "}
            {activeCategory}.
          </p>
        </div>
      </div>
    </section>
  );
}