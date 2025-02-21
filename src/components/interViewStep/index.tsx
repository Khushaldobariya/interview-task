

// 'use client'
// import React, { useState } from 'react';
// import AddInterviewForm from '../addInterview';
// import AssignInterview from '../assignInterview';
// import { SendInterviewLetter } from '../sendInterviewLetter';
// import { MapCandidates } from '../mapCandidates';

// interface Step {
//   title: string;
//   component: React.ComponentType<{ onNext: () => void }>;
// }

// const InterViewStep: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState<number>(0);
//   const [completedSteps, setCompletedSteps] = useState<number[]>([]);

//   const steps: Step[] = [
//     { title: "Interview Configuration", component: AddInterviewForm },
//     { title: "Map Candidates", component: MapCandidates },
//     { title: "Send Interview Letter", component: AssignInterview },
//     { title: "Map Committee", component: SendInterviewLetter },
//   ];

//   const handleNext = () => {
//     setCompletedSteps([...completedSteps, currentStep]);
//     setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
//   };

//   const handleStepClick = (index: number) => {
//     // Only allow clicking on completed steps or the next available step
//     if (completedSteps.includes(index - 1) || completedSteps.includes(index) || index === 0) {
//       setCurrentStep(index);
//     }
//   };

//   const isStepCompleted = (index: number) => completedSteps.includes(index);
//   const isStepAvailable = (index: number) =>
//     index === 0 || completedSteps.includes(index - 1) || completedSteps.includes(index);

//   const CurrentStepComponent = steps[currentStep].component;

//   return (

      
//           <div className="space-y-8">
   
 
//             <div className="flex justify-between relative">
//               {steps.map((step, index) => (
//                 <div className="flex flex-col items-center">
//                    <button
//                     onClick={() => handleStepClick(index)}
//                     disabled={!isStepAvailable(index)}
//                     className={`h-8 w-8 rounded-full flex items-center justify-center text-sm
//                       transition-colors
//                       ${
//                         isStepCompleted(index)
//                           ? "bg-teal-500 text-white"
//                           : index === currentStep
//                             ? "bg-teal-500 text-white"
//                             : isStepAvailable(index)
//                               ? "bg-gray-200 text-gray-600 hover:bg-teal-100"
//                               : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                       }`}
//                   >
//                     { index + 1}
//                   </button>
//                    <div key={step.title} className={`relative flex-1 mx-2 first:ml-0 last:mr-0`}>
//                   <div
//                     className={`border rounded-md p-4 transition-all
//                       ${
//                         index === currentStep
//                           ? "bg-teal-50 border-teal-500 shadow-sm"
//                           : isStepCompleted(index)
//                             ? "bg-white border-teal-500"
//                             : "bg-gray-50 border-gray-200"
//                       }`}
//                   >
//                     <div className="text-center">
//                       <span
//                         className={`text-sm font-medium
//                         ${
//                           index === currentStep
//                             ? "text-teal-500"
//                             : isStepCompleted(index)
//                               ? "text-teal-500"
//                               : "text-gray-500"
//                         }`}
//                       >
//                         {step.title}
//                       </span>
//                     </div>
//                     <div
//                       className={`absolute left-0 bottom-0 h-1 transition-all
//                         ${
//                           index === currentStep
//                             ? "bg-teal-500 w-full"
//                             : index < currentStep || isStepCompleted(index)
//                               ? "bg-teal-500 w-full"
//                               : "bg-gray-200 w-full"
//                         }`}
//                     />
//                   </div>
//                 </div></div>
             
//               ))}
//             </div>
  
//             {/* Step Content */}
//             <div className="mt-8">
//               <CurrentStepComponent onNext={handleNext} />
//             </div>
//           </div>
  
  
//   );
// };

// export default InterViewStep;
'use client'
import React, { useState } from 'react';
import AddInterviewForm from '../addInterview';
import AssignInterview from '../assignInterview';
import { SendInterviewLetter } from '../sendInterviewLetter';
import { MapCandidates } from '../mapCandidates';

interface Step {
  title: string;
  component: React.ComponentType<{ onNext: () => void }>;
}

const InterViewStep: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps: Step[] = [
    { title: "Interview Configuration", component: AddInterviewForm },
    { title: "Map Candidates", component: MapCandidates },
    { title: "Send Interview Letter", component: AssignInterview },
    { title: "Map Committee", component: SendInterviewLetter },
  ];

  const handleNext = () => {
    setCompletedSteps([...completedSteps, currentStep]);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleStepClick = (index: number) => {
    // Only allow clicking on completed steps or the next available step
    if (completedSteps.includes(index - 1) || completedSteps.includes(index) || index === 0) {
      setCurrentStep(index);
    }
  };

  const isStepCompleted = (index: number) => completedSteps.includes(index);
  const isStepAvailable = (index: number) =>
    index === 0 || completedSteps.includes(index - 1) || completedSteps.includes(index);

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="space-y-8">
      {/* Step Indicators */}
      <div className="flex justify-between relative">
        {steps.map((step, index) => (
          <div key={step.title} className="flex flex-col items-center flex-1">
            {/* Step Circle */}
            <button
              onClick={() => handleStepClick(index)}
              disabled={!isStepAvailable(index)}
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm
                transition-colors relative z-10
                ${
                  isStepCompleted(index)
                    ? "bg-teal-500 text-white"
                    : index === currentStep
                      ? "bg-teal-500 text-white"
                      : isStepAvailable(index)
                        ? "bg-gray-200 text-gray-600 hover:bg-teal-100"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              {index + 1}
            </button>

            {/* Step Title */}
            <div className="text-center mt-2">
              <span
                className={`text-sm font-medium
                  ${
                    index === currentStep
                      ? "text-teal-500"
                      : isStepCompleted(index)
                        ? "text-teal-500"
                        : "text-gray-500"
                  }`}
              >
                {step.title}
              </span>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-4 left-1 w-full h-0.5 transform -translate-y-1/2
                  ${
                    isStepCompleted(index + 1) || currentStep > index
                      ? "bg-teal-500"
                      : "bg-gray-200"
                  }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mt-8">
        <CurrentStepComponent onNext={handleNext} />
      </div>
    </div>
  );
};

export default InterViewStep;