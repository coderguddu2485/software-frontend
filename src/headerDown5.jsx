import React from 'react';

const HeaderDown5 = () => {
  const stats = [
    { label: "Happy Users", value: "2,00,000+" },
    { label: "Verified Doctors", value: "20,000+" },
    { label: "Specialities", value: "25+" },
    { label: "App Rating", value: "4.5 / 5" },
  ];

  return (
    <section className="bg-[#2D2E32] py-7 px-4 mt-14">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Number/Value */}
              <h3 className="text-white text-1xl md:text-2xl font-bold mb-2">
                {stat.value}
              </h3>
              {/* Label */}
              <p className="text-gray-300 text-sm md:text-base font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeaderDown5;