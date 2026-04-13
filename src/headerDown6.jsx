import React from 'react';

const HeaderDown6 = () => {
  const benefits = [
    {
      title: "Consult Top Doctors 24x7",
      description: "Connect instantly with a 24x7 specialist or choose to video visit a particular doctor."
    },
    {
      title: "Convenient and Easy",
      description: "Start an instant consultation within 2 minutes or do video consultation at the scheduled time."
    },
    {
      title: "100% Safe Consultations",
      description: "Be assured that your online consultation will be fully private and secured."
    },
    {
      title: "Similar Clinic Experience",
      description: "Experience clinic-like consultation through a video call with the doctor. Video consultation is available only on the Practo app."
    },
    {
      title: "Free Follow-up",
      description: "Get a valid digital prescription & a 7-day, free follow-up for further clarifications."
    }
  ];

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto font-sans">
      <h2 className="text-[28px] font-bold text-[#303032] mb-8">
        Benefits of Online Consultation
      </h2>

      <div className="border border-gray-100 rounded-lg p-10 shadow-sm bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                {/* Checkmark Icon */}
                <svg 
                  className="w-5 h-5 text-[#303032]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-[19px] font-bold text-[#303032]">
                  {benefit.title}
                </h3>
              </div>
              <p className="text-[#6b6d71] text-[15px] leading-relaxed pl-8">
                {benefit.text || benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeaderDown6;