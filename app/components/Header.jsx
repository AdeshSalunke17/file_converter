'use client'
import React, { useEffect, useState } from 'react'
import LanguageModal from './LanguageModal';
import { useDispatch, useSelector } from 'react-redux';
import { setTranslation } from '../features/translationSlice';
import Image from 'next/image';

const getLangFlagUrl = langCode => {
  switch (langCode) {
    case 'en': return '/usflag.jpg';
    case 'in': return '/indiaFlag.webp';
    case 'fr': return '/franceFlag.jpg'
    case 'sp': return '/spanishFlag.jpg';
    default: return ''
  }
}
const Header = ({translationObject, langCode}) => {
    const [languageModal, setLanguageModal] = useState(false);
    const dispatch = useDispatch();
      useEffect(() => {
        dispatch(setTranslation(translationObject));
      },[]);
      
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
        <div className="relative w-11 h-11 rounded-full overflow-hidden block md:hidden"
        onClick={() => setLanguageModal(true)}
        >
            <Image
              src={getLangFlagUrl(langCode)}
              alt={`flag`}
              layout="fill"
              objectFit="cover"
              className="transform scale-110 transition-transform duration-300 hover:scale-125"
            />
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Get Started
        </button>
    </nav>
    {languageModal && <LanguageModal setLanguageModal={setLanguageModal}/>}
    </>
  )
}

export default Header