import React, { useEffect, useRef } from 'react'
import gsap from "gsap";

const Loader = () => {
    const loaderRef = useRef(null);
    useEffect(() => {
        gsap.to(loaderRef.current, {
          rotation: 360,
          repeat: -1,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }, []);
    
  return (
    <div className="overlay">
      <div className="loader" ref={loaderRef}></div>
      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .loader {
          width: 80px;
          height: 80px;
          border: 8px solid rgba(255, 255, 255, 0.3);
          border-top: 8px solid #22c55e; /* Green - text-green-400 */
          border-radius: 50%;
        }
      `}</style>
    </div>
  )
}

export default Loader