import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import DonorFaqsData from "./DonorFaqsData";
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export const DonorFaqs = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="p-6">
      {/* Add GIF here */}
      <img src="./Images/DonorFaqsGif.gif" alt="DonorFaqsGif" className="mb-4" />

      {DonorFaqsData.map((faq) => (
        <Accordion key={faq.id} open={open === faq.id} icon={<Icon id={faq.id} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(faq.id)}>{faq.question}</AccordionHeader>
          <AccordionBody className='text-xl'>{faq.answer}</AccordionBody>
        </Accordion>
      ))}
    </div>
  );
};
