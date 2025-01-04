import React, { useEffect, useRef } from 'react'
import Image from 'next/image';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';

const LanguageModal = ({setLanguageModal}) => {
    const languageArray =[{
        url : '/usflag.jpg',
        lagName : 'English',
        redirect : '/en'
    },{
        url : '/indiaFlag.webp',
        lagName : 'Marathi',
        redirect : '/in'
    },{
        url : '/franceFlag.jpg',
        lagName : 'French',
        redirect : '/fr'
    },{
        url : '/spanishFlag.jpg',
        lagName : 'Spanish',
        redirect : '/sp'
    }]
    const languageRefs = useRef([]);

    useEffect(() => {
      // GSAP animation
      gsap.fromTo(
        languageRefs.current,
        { opacity: 0, y: 50 }, // Initial state
        {
          opacity: 1,
          y: 0,
          stagger: 0.2, // Delay between each element's animation
          duration: 1,
          ease: 'power2.out', // Easing function for smooth animation
        }
      );
    }, []);
    const router = useRouter();
  return (
    <div className="overlay w-12 flex justify-center">
        <div className="sm:w-4/12 w-10/12 flex flex-wrap">
        {
            languageArray.map((language, index) => (
            <div className="w-6/12 p-5 cursor-pointer" key={language.lagName} ref={(el) => (languageRefs.current[index] = el)}
            onClick={() => {
                setLanguageModal(false);
                router.push(language.redirect);
                setTimeout(() => {
                    
                    window.location.reload()
                }, 500);
            }}
            >
                <div className="flex items-center justify-center bg-black border-0 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 max-w-xs">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden">
                            {/* Flag image */}
                            <Image
                                src={language.url} // Path to flag image
                                alt={`flag`}
                                layout="fill"
                                objectFit="cover"
                                className="transform scale-110 transition-transform duration-300 hover:scale-125"
                            />
                        </div>
                        <p className="text-white text-lg font-semibold capitalize">{language.lagName}</p>
                    </div>
                </div>
            </div>
            ))
        }
        </div>
    </div>
  )
}

export default LanguageModal