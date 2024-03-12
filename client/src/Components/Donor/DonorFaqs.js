import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import DonorFaqsData from "./DonorFaqsData";
import DonorFaqsGif from '../Images/DonorFaqsGif.gif'
import DonorFaqsGif2 from '../Images/DonorFaqsGif2.gif'
import DonorFaqsGif3 from '../Images/DonorFaqsGif3.gif'
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

      <div className="text-2xl text-semibold text-center mb-5">Frequently Asked Questions - FAQs</div>
      <div className="flex mb-4">
        <div className="flex-shrink-0 mr-4">
          <img src={DonorFaqsGif} alt="DonorFaqsGif" style={{ height: '200px', width: 'auto' }} />
        </div>
        <div>
          {DonorFaqsData.slice(0, 5).map((faq) => (
            <Accordion key={faq.id} open={open === faq.id} icon={<Icon id={faq.id} open={open} />}>
              <AccordionHeader className='text-lg' onClick={() => handleOpen(faq.id)}>{faq.question}</AccordionHeader>
              <AccordionBody className='text-xl'>{faq.answer}</AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
      
      <div className="flex mb-4">
        <div className="flex-shrink-0 mr-4">
          <img src={DonorFaqsGif2} alt="DonorFaqsGif" style={{ height: '200px', width: 'auto' }} />
        </div>
        <div>
          {DonorFaqsData.slice(5, 10).map((faq) => (
            <Accordion key={faq.id} open={open === faq.id} icon={<Icon id={faq.id} open={open} />}>
              <AccordionHeader className='text-lg' onClick={() => handleOpen(faq.id)}>{faq.question}</AccordionHeader>
              <AccordionBody className='text-xl'>{faq.answer}</AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
      
      <div className="flex">
        <div className="flex-shrink-0 mr-4">
          <img src={DonorFaqsGif3} alt="DonorFaqsGif" style={{ height: '200px', width: 'auto' }} />
        </div>
        <div>
          {DonorFaqsData.slice(10).map((faq) => (
            <Accordion key={faq.id} open={open === faq.id} icon={<Icon id={faq.id} open={open} />}>
              <AccordionHeader className='text-lg' onClick={() => handleOpen(faq.id)}>{faq.question}</AccordionHeader>
              <AccordionBody className='text-xl'>{faq.answer}</AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};
