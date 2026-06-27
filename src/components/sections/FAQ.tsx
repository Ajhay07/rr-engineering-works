import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FAQS } from "@/data/content";

export function FAQ() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container max-w-3xl">
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title="Answers for procurement and engineering teams"
          className="mb-14"
        />
        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
