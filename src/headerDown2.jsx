import React, { useRef, useState } from 'react';

const specialities = [
  { id: 1, name: 'Gynaecology', price: '599', img: './assets/gyno.jpg' },
  { id: 2, name: 'Sexology', price: '599', img: './assets/sexology.png' },
  { id: 3, name: 'General physician', price: '499', img: './assets/physician.jpg' },
  { id: 4, name: 'Dermatology', price: '549', img: './assets/dermatology.jpg' },
  { id: 5, name: 'Psychiatry', price: '599', img: './assets/psychiatry.jpg' },
  { id: 6, name: 'Stomach and digestion', price: '499', img: './assets/stomach.jpg' },
  { id: 7, name: 'Pediatrics', price: '499', img: './assets/child-doctor.jpg' },
];

// Added setView and handleSearch props here
const HeaderDown2 = ({ setView, handleSearch }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 0);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="px-10 py-12 bg-white">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#414146]">25+ Specialities</h2>
          <p className="text-gray-500 mt-1">Consult with top doctors across specialities</p>
        </div>
        <button 
          onClick={() => setView("DoctorSearch")} // Direct to search page
          className="px-5 py-2 border border-[#28328c] text-[#28328c] font-semibold rounded hover:bg-blue-50 transition-colors"
        >
          See all Specialities
        </button>
      </div>

      <div className="relative group">
        {showLeftArrow && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-gray-600 z-30 active:scale-95 transition-all"
          >
            <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
        >
          {specialities.map((item, index) => (
            <div 
              key={index} 
              // Added onClick to trigger the search and change view
              onClick={() => {
                setView("DoctorSearch");
                handleSearch(item.name);
              }}
              className="min-w-[180px] flex flex-col items-center p-6 border border-transparent hover:border-gray-100 hover:shadow-lg rounded-xl transition-all cursor-pointer group/card"
            >
              <div className="w-32 h-32 rounded-full bg-[#ebf4f8] flex items-center justify-center mb-4 overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-center font-bold text-[#414146] text-sm h-10 flex items-center">{item.name}</h3>
              <p className="text-gray-500 text-sm mt-1">₹{item.price}</p>
              <div className="mt-2 flex items-center text-[#28a7df] font-bold text-xs uppercase tracking-wider group-hover/card:text-[#1a7fac]">
                Consult now 
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-gray-600 z-30 active:scale-95 transition-transform"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeaderDown2;