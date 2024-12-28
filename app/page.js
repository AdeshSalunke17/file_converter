'use client'

import gsap from "gsap";
import { useEffect, useState } from "react";
import DragAndDrop from "./components/draganddrop";
import { Provider } from 'react-redux';
import {store} from './redux/store'
import ChooseFile from "./components/choosefile";
import FileConvertCard from "./components/fileconvertcard";
import Options from "./components/Options";
import FileContainer from "./components/FileContainer";
export default function Home() {
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
    <Provider store={store}>
    <div className="bg-cover bg-center bg-[url('/public/night-sky-background-with-nebula.jpg')] min-h-screen text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center sm:px-20 px-5 py-4 bg-black bg-opacity-50">
        <div className="text-2xl font-bold">Logoipsum</div>
        <ul className="hidden md:flex space-x-10 text-lg">
          <li className="hover:text-green-400 cursor-pointer">Home</li>
          <li className="hover:text-green-400 cursor-pointer">Language</li>
          <li className="hover:text-green-400 cursor-pointer">Share</li>
          <li className="hover:text-green-400 cursor-pointer">FAQ</li>
        </ul>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Get Started
        </button>
      </nav>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center text-center mt-20 space-y-4 px-6 rounded-lg">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-snug heading">
          Convert your <span className="text-green-400">file easily</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl animated-text">
          Convert your audio, video, and other files from one format to another
          online for free!
        </p>
      </main>
      <div className="flex flex-col items-center justify-center text-center mt-10">
        <Options/>
        <FileContainer/>
      </div>
    </div>
    </Provider>
  );
}
