import React, { useState } from 'react';
import { Dialog, Button, DialogHeader, Textarea } from '@material-tailwind/react';
import Lottie from 'lottie-react';
import { MaleQuestions, FemaleQuestions } from './Eligibility.js';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid'

export const PreviousDonationsForm = ({ isModalOpen, setIsModalOpen, onConfirm, onReject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [canDonate, setCanDonate] = useState("inProcess");
  const [rejectionReason, setRejectionReason] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");

  const QuestionArray = JSON.parse(localStorage.getItem("user"))?.gender === "Male" ? MaleQuestions : FemaleQuestions;
  console.log(localStorage.getItem("user"))
  const handleNext = () => {
    if (currentIndex !== QuestionArray.length - 1) {
      setIsNextClicked(true);
      setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
        setIsNextClicked(false);
      }, 800); // Adjust this timing to match your animation duration
    }
  };

  const handleBack = () => {
    setIsNextClicked(true);
    setTimeout(() => {
      setCurrentIndex(prevIndex => prevIndex - 1);
      setIsNextClicked(false);
    }, 800); // Adjust this timing to match your animation duration
  };

  const handleAnswer = (status, currentIndex) => {
    if (QuestionArray[currentIndex]?.answer !== status) {
      setRejectionReason(QuestionArray[currentIndex]?.reason);
      setCanDonate("No");
    } else {
      handleNext();
      if (currentIndex === QuestionArray.length - 1) {
        setCanDonate("Yes");
      }
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Here, you would perform validation on the last donation date
  //   // For the sake of this example, let's assume last donation date is within 6 months
  //   const sixMonthsAgo = new Date();
  //   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  //   if (new Date(lastDonationDate) > sixMonthsAgo) {
  //     // User is not eligible for booking
  //     alert('You are not eligible for booking this slot. Your last donation was within the last 6 months.');
  //   } else if (lastDonationDate !== '') {
  //     // User is eligible, proceed with booking
  //     onConfirm();
  //     // Here, you can close the modal if needed
  //     // onClose();
  //   }
  // };


  const dialogHandler = () => {
    setCanDonate("inProcess");
    setCurrentIndex(0);
    setIsModalOpen(!isModalOpen);
  }

  return (
    <Dialog
      open={isModalOpen}
      handler={dialogHandler}
      className='px-12 pb-7'
      size='sm'
    >
      {canDonate === "inProcess" && <>
        <DialogHeader>
          <div className='text-lg text-gray-700 text-center mx-auto'>
            Blood Donation Eligibility Quiz
          </div>
        </DialogHeader>
        <div className={`max-w-[350px] relative p-5 bg-gray-100 rounded-3xl mx-auto ${isNextClicked ? 'animate-pulse' : ''}`}>
          {currentIndex !== 0 && (
            <button
              onClick={handleBack}
              disabled={isNextClicked}
              className="absolute active:animate-ping"
            >
              <ArrowLeftCircleIcon className='h-6 w-6' color='gray' />
            </button>
          )}
          <div className="bg-red-50 rounded-full w-fit mx-auto p-4">
            <Lottie animationData={QuestionArray[currentIndex].image} className='w-24 h-24 mx-auto' />
          </div>
          <h2 className="text-base font-semibold text-center h-40 pt-5">{QuestionArray[currentIndex].question}</h2>
          <div className="flex justify-center mb-8 gap-4">
            <Button
              variant='outlined'
              onClick={() => {
                handleAnswer("No", currentIndex);
              }}
              disabled={isNextClicked}
              color="red"
              className='py-2 w-20 text-center'
            >
              No
            </Button>
            <Button
              variant='outlined'
              onClick={() => {
                handleAnswer("Yes", currentIndex);
              }}
              disabled={isNextClicked}
              color="red"
              className='py-2 w-20 text-center'
            >
              Yes
            </Button>
          </div>
        </div>
      </>}

      {canDonate === "No" &&
        <div className='pt-7 text-center'>
          <div className='text-xl text-orange-900 rounded-lg font-semibold mb-6 p-2 border-2 bg-red-50'>You are not Eligible to Donate Blood</div>
          <div className='text-gray-700 font-semibold underline mb-2'>{rejectionReason.split(":")[0]}</div>
          <div className='text-gray-600 text-sm'>{rejectionReason.split(":")[1]}</div>
          <div className='pt-6 grid place-content-end'>
            <Button
              // variant='outlined'
              className='normal-case'
              color='red'
              onClick={onReject}
            >
              I, Agree
            </Button>
          </div>
        </div>
      }

      {canDonate === "Yes" && (
        <div className="px-8 pt-8">
          <h2 className="text-xl font-semibold">Book Slot</h2>
          <p className='mb-4 text-gray-500 text-sm'>Any other medical conditions to Share</p>
          <Textarea
            value={medicalConditions}
            onChange={(e) => setMedicalConditions(e.target.value)}
            color="lightBlue"
            label='Health Conditions'
            className="mb-4 active"
          />
          <div className="flex justify-end">
            <Button
              onClick={dialogHandler}
              color="gray"
              variant='outlined'
              ripple
              className="mr-4"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onConfirm(medicalConditions);
                setIsModalOpen(false);
              }}
              color="green"
              ripple
            >
              Confirm
            </Button>
          </div>
        </div>
      )}

    </Dialog>
  );
};



// return (
//   <div className={`fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center ${isOpen ? '' : 'hidden'}`}>
//     <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
//     <div className="bg-white w-96 p-6 rounded-lg z-50">
//       <h2 className="text-lg font-semibold mb-4">Book Slot</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="lastDonationDate" className="block text-sm font-medium text-gray-700">Last Donation Date</label>
//           <input type="date" id="lastDonationDate" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" value={lastDonationDate} onChange={(e) => setLastDonationDate(e.target.value)} />
//         </div>
//         <div className="flex justify-end">
//           <button type="button" className="mr-2 px-4 py-2 text-sm rounded-md border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:border-green-500 focus:ring-green-500" onClick={onClose}>Cancel</button>
//           <button type="submit" className="px-4 py-2 text-sm rounded-md border border-transparent bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:border-green-700 focus:ring-green-500">Book Slot</button>
//         </div>
//       </form>
//     </div>
//   </div>
// );