import React, { useEffect, useRef } from 'react'
import DragAndDrop from './draganddrop'
import ChooseFile from './choosefile'
import FileConvertCard from './fileconvertcard'
import { useSelector } from 'react-redux'
import { gsap } from 'gsap';
import Loader from './Loader'

const FileContainer = () => {
    const selectedOption = useSelector(state => state.selectedOption.selectedOption);
    const containerRef = useRef(null);
      useEffect(() => {
    if (selectedOption) {
      // Animate the container when it appears
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.8 }, // Initial state
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' } // Final state
      );
    }
  }, [selectedOption]);
    useEffect(() => {
        if (selectedOption) {
          // Animate the container when it appears
          gsap.fromTo(
            containerRef.current,
            { opacity: 0, scale: 0.8 }, // Initial state
            { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' } // Final state
          );
        }
      }, [selectedOption]);
      const loading = useSelector((state) => state.loader.loadingState);
  return (
    <>
    <div className={`bg-black bg-opacity-70 rounded-lg sm:w-2/3 w-10/12 sm:p-10 p-3 ${!selectedOption && 'hidden'}`}
    ref={containerRef}
    >
            <div className="py-10 w-full h-full border-2 border-dashed border-gray-100 rounded-lg flex flex-col items-center justify-center text-center">
            <DragAndDrop/>
            <ChooseFile/>
            <FileConvertCard/>
          </div>
    </div>
    {loading && <Loader/>}
    </>
  )
}

export default FileContainer