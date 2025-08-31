"use client"
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter()

  useEffect(() => {
    gsap.fromTo(
      ".title span",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" ,}
    );
  }, []);

  return (
    <nav className='w-full flex flex-col justify-start fixed top-5 left-5'>
      <div>
        <h3 className='title flex text-md font-bold cursor-pointer' onClick={() => router.push("/")}>
          {"AliHüseyinoğlu.dev".split("").map((char, i) => (
            <span key={i} className='text-white inline-block'>
              {char}
            </span>
          ))}
        </h3>
      </div>
    </nav>
  );
};

export default Header;
