'use client'
import React, { useState } from 'react'
import LanguageModal from './LanguageModal';

const Header = () => {
    const [languageModal, setLanguageModal] = useState(false);
  return (
    <>
    <nav className="flex justify-between items-center sm:px-20 px-5 py-4 bg-black bg-opacity-50">
        <div className="text-2xl font-bold">Logoipsum</div>
        <ul className="hidden md:flex space-x-10 text-lg">
          <li className="hover:text-green-400 cursor-pointer">Home</li>
          <li className="hover:text-green-400 cursor-pointer" onClick={() => setLanguageModal(true)}>Language</li>
          <li className="hover:text-green-400 cursor-pointer">Share</li>
          <li className="hover:text-green-400 cursor-pointer">FAQ</li>
        </ul>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Get Started
        </button>
    </nav>
    {languageModal && <LanguageModal setLanguageModal={setLanguageModal}/>}
    </>
  )
}

export default Header