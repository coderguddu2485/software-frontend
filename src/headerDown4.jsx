import React from 'react';
const HeaderDown4 = () => {
  const steps = [
    {
      id: 1,
      icon: (
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
        </svg>
      ),
      text: "Select a speciality or symptom",
    },
    {
      id: 2,
      icon: (
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      text: "Audio/ video call with a verified doctor",
    },
    {
      id: 3,
      icon: (
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      text: "Get a digital prescription & a free follow-up",
    },
  ];

  return (
    <section className="py-5 px-2 bg-white font-sans">
      <div className="max-w-3xl mx-auto text-center">
        <h6 className="text-1xl md:text-3xl font-bold  text-gray-700 mb-10">How it works</h6>
        
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center space-y-12 md:space-y-0">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/4 left-0 w-full h-0.5 bg-gray-200 -z-0"></div>

          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center flex-1 px-4">
              {/* Icon Circle */}
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-50">
                {step.icon}
              </div>
              
              {/* Text */}
              <p className="text-gray-700 text-sm md:text-base font-medium max-w-[200px] leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeaderDown4;