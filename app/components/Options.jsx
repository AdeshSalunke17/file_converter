import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gsap } from 'gsap';
import { setSelectedOption } from '../features/optionSlice';

const Options = () => {
  const dispatch = useDispatch();
  const selectedOption = useSelector((state) => state.selectedOption.selectedOption);
  const optionRefs = useRef([]);

  useEffect(() => {
    // Initial animation for all options
    gsap.from(optionRefs.current, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, []);
  const handleSelect = (option, index) => {
    // GSAP animation to emphasize selection
    const tl = gsap.timeline();
    tl.to(optionRefs.current[index], {
      scale: 1.1,
      duration: 0.2,
      ease: 'power1.inOut',
    })
      .to(optionRefs.current[index], {
        scale: 1,
        duration: 0.2,
        ease: 'power1.inOut',
      })
      .to(optionRefs.current[index], {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          dispatch(setSelectedOption(option));
        },
      });
  };
  return (
    <div className={`rounded-lg w-2/3 p-10 flex flex-wrap ${selectedOption && 'hidden'}`}>
      {['Document', 'Image', 'Code/Markup', 'Spreadsheet', 'Compressed Files'].map((option, index) => (
        <div className="w-full sm:w-6/12 md:w-4/12 p-4" key={option}>
          <div
            ref={(el) => (optionRefs.current[index] = el)}
            className="w-full h-full bg-black bg-opacity-70 p-3 text-green-400 items-center cursor-pointer rounded-lg"
            onClick={() => handleSelect(option, index)}
          >
            <span className="truncate text-lg">{option}</span>
            {/* <p className='block text-xs text-white text-start'>Eg. DOC,PDF...</p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Options;
