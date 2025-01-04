'use client'
import React, { useEffect } from 'react'
import gsap from "gsap";
const Main = ({t}) => {
    useEffect(() => {
        const tl = gsap.timeline();
    
        // Add more animations to the timeline
        tl.from(".heading", {
          opacity: 0,
          y: -100,
          duration: 1.5,
          ease: "power4.out",
        })
          .to(".heading", {
            scale: 1.1,  // Slightly scale up the heading
            duration: 0.5,
            ease: "back.out(1.7)", // Bouncy easing
          })
          .to(".heading", {
            scale: 1,  // Return to original size
            duration: 0.2,
          });
      }, []);
      useEffect(() => {
        const textElement = document.querySelector(".animated-text");
        const letters = textElement.innerText.split(""); // Split text into individual characters
        textElement.innerHTML = letters
          .map((letter) => `<span class="letter">${letter}</span>`)
          .join(""); // Wrap each letter in a span
    
        // Animate each letter with a staggered effect
        gsap.from(".letter", {
          opacity: 0,
          y: 50,  // You can adjust this to make it come from below or above
          duration: 0.6,
          stagger: 0.05,  // Delay between each letter's animation
          ease: "power4.out",  // Smooth animation easing
        });
      }, []);
  return (
    <>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-snug heading">
          Convert your <span className="text-green-400">file easily</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl animated-text">
          {/* Convert your audio, video, and other files from one format to another
          online for free! */}
          {t.headDesc}
        </p>
    </>
  )
}

export default Main