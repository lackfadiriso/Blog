"use client"
import React, { useEffect, useState } from 'react'
import Projects from './Projects'
import Footer from './Footer'
import ReactMarkdown from "react-markdown";
import ProjectList from './ProjectList'
import Header from './Header'
import gsap from 'gsap'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Image from 'next/image';

const MainContent = () => {
  const { aboutItems } = useSelector((store: RootState) => store.WebProjects)
  const [width, setWidth] = useState<number>(200)
  const [height, setHeight] = useState<number>(300)

  // Yazı geliş efekti
  useEffect(()=>{
    gsap.fromTo(
      ".title span",
      {y:30, opacity:0 },
      {y:0, opacity:1, duration:0.6, stagger:0.1, ease:"power2.out"}
    )
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setWidth(120);
        setHeight(60);
      } 
      else if(window.innerWidth > 768 && window.innerWidth < 1024) {
        setWidth(200);
        setHeight(100);
      }
      else{
        setWidth(250);
        setHeight(100);
      }
    };

    handleResize(); // sayfa ilk yüklendiğinde de çalışması için
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className='mainDiv flex flex-col gap-y-5'>
        <div className='flex flex-col-reverse justify-center sm:justify-between sm:flex-row-reverse'>
          <div>
            <h1 className='title'>
              {"AliHüseyinoğlu.dev".split("").map((char, i) => (
                <span key={i} className='inline-block'>{char}</span>
              ))}
            </h1>
            {aboutItems.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col max-w-[686px] mainP gap-y-5">
                  <div className='max-h-[200px] md:max-h-[300px] overflow-y-auto'><ReactMarkdown>{item.about}</ReactMarkdown></div>
                  <div className='bg-blue-500 rounded-b-2xl text-center'>
                    <ReactMarkdown>{item.date}</ReactMarkdown>
                  </div>
              </div>
            ))}
            </div>

            <div className='flex-1 ml-2 overflow-y-clip flex justify-center sm:justify-start'>
              <Image className="rounded-t-full border-2 border-yellow-400" src="/images/profil.jpg" alt="Profile picture" width={width} height={height} style={{minWidth:width, minHeight:height}} quality={100} unoptimized/>
            </div>
        </div>
        
        <div>
            {aboutItems.map((item, i) => (<h1 key={i}>{item.my}</h1>))}

            <ProjectList/>
        </div>

        <Footer/>
    </div>
  )
}

export default MainContent
