import React, { useRef, useState } from 'react';

const specialties = [
  { id: 1, name: 'Acne, pimples or skin issues', img: './assets/Acne.png', bgColor: 'bg-[#f8d7da]' },
  { id: 2, name: 'Cold, cough or fever', img: './assets/coughing.png', bgColor: 'bg-[#fff3cd]' },
  { id: 3, name: 'Child not feeling well', img: './assets/d46b22a1-bc72-4fa8-9812-da653dc17f17.png', bgColor: 'bg-[#d1ecf1]' },
  { id: 4, name: 'Depression or anxiety', img: './assets/12-mental-wellness.png', bgColor: 'bg-[#d4edda]' },
  { id: 5, name: 'Want to lose weight', img: './assets/30943ef8-456d-4e55-abbd-575f932a719c.png', bgColor: 'bg-[#e2e3e5]' },
  { id: 6, name: 'Period problems', img: './assets/irregular-painful+period.png', bgColor: 'bg-[#f8d7da]' },
];

const HeaderDown3 = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="px-10 py-12 bg-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Consult top doctors online for any health concern</h2>
        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded font-medium hover:bg-blue-50">
          View all specialities
        </button>
      </div>

      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button onClick={() => scroll('left')} className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow-md">
            <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        )}

        {/* Scrollable Area */}
        <div 
          ref={scrollRef} 
          onScroll={handleScroll}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {specialties.map((item, index) => (
            <div 
              key={index} 
              className="min-w-[300px] max-w-[300px] border border-gray-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              {/* Top half: Colored Background + Icon */}
              <div className={`h-45 ${item.bgColor || 'bg-blue-50'} flex items-center justify-center p-4`}>
                <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
              </div>
              
              {/* Bottom half: Text & Action */}
              <div className="p-3 bg-white">
                <h3 className="text-sm font-semibold text-gray-700 leading-snug h-10 mb-2 overflow-hidden">
                  {item.name}
                </h3>
                <span className="text-blue-500 font-bold text-xs uppercase cursor-pointer hover:text-blue-700">
                  Consult Now
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button onClick={() => scroll('right')} className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow-md">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
};

export default HeaderDown3;