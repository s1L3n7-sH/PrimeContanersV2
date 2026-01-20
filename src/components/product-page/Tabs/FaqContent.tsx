import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

const faqsData: FaqItem[] = [
  {
    question: "Do I need to be present for delivery?",
    answer:
      "Yes, we recommend that you or an authorized representative be present at the delivery site. You'll need to guide the driver to the exact drop-off location and sign the delivery receipt.",
  },
  {
    question: "How much space do I need for delivery?",
    answer:
      "For a 20ft container, you generally need about 60ft of straight-line clearance. For a 40ft container, you need about 100-120ft. The truck needs room to pull forward and slide the container off the back.",
  },
  {
    question: "What does 'Wind and Water Tight' (WWT) mean?",
    answer:
      "WWT means the container is sealed against wind and rain. If you step inside and close the doors, you shouldn't see any light coming through the roof or panels. It's the industry standard for secure storage.",
  },
  {
    question: "Do you offer warranties on your containers?",
    answer:
      "Yes, we offer a comprehensive warranty on all our containers against structural defects and leaks. Please check our warranty page for specific terms based on the container condition (New vs. Used).",
  },
  {
    question: "Can I modify the container?",
    answer:
      "Absolutely. Shipping containers are highly customizable. You can add windows, doors, insulation, or vents. However, please note that significant structural modifications might affect the container's ability to be shipped internationally in the future.",
  },
  {
    question: "What kind of site preparation is required?",
    answer:
      "The ground should be flat, level, and firm. Common foundations include asphalt, concrete, gravel, or even railroad ties. Avoid soft grass or mud to prevent the container from sinking or the delivery truck getting stuck.",
  },
];

const FaqContent = () => {
  return (
    <section>
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6">
        Frequently asked questions
      </h3>
      <Accordion type="single" collapsible>
        {faqsData.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqContent;
