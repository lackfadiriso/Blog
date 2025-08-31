"use client"
import React, { useEffect, useRef, useState } from 'react'
import { AppDispatch, RootState } from '../redux/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getWebProjectItems } from '../redux/WebprojectsSlice'
import { Project } from '../types'
import Image from 'next/image'
import gsap from 'gsap'

const ProjectsPMain = () => {
    const { projectsItems } = useSelector((store: RootState) => store.WebProjects)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [selectedProjects, setSelectedProject] = useState<Project | null>(null)
    const [Loaded, setLoaded] = useState<boolean>(false)
    // width height at images
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)

    const logoImage = useRef<HTMLDivElement | null>(null)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        gsap.fromTo(
            logoImage.current, 
            {opacity: 0},
            {   
                opacity: 1,
                duration:1,
                ease:"power2.inOut",
            }
        )
    }, [selectedProjects])

    useEffect(() => {
        dispatch(getWebProjectItems(localStorage.getItem("lang") || "eng"))
    }, [dispatch])

    useEffect(() => {
        if (projectsItems.length > 0) {
            setSelectedProject(projectsItems[0]); // ilk ürünü ekler
        }
    }, [projectsItems]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setWidth(150);
                setHeight(150);
            } 
            else if(window.innerWidth > 768 && window.innerWidth < 1024) {
                setWidth(250);
                setHeight(250);
            }
            else{
                setWidth(350);
                setHeight(350);
                }
            };

        handleResize()
        window.addEventListener("resize", handleResize)

        return () => {
            window.addEventListener("resize", handleResize)
        }
    }, [])

  return (
    <div className='flex flex-col-reverse md:flex-row-reverse justify-center overflow-x-hidden items-center'>
        <div className='flex flex-col-reverse sm:flex-row-reverse justify-center gap-x-5 md:items-center pb-10 border w-11/12 lg:w-11/12 xl:w-1/2 h-fit rounded-2xl '>
        <div>
            <h1>{selectedProjects?.title || "All In One"}</h1>
            <p className='mainP max-w-[888px]'>{selectedProjects?.description || `Within the project I developed for practice with APIs, which I built using ReactJS, 
                    there is a Todo App, a Currency Exchange, and a Weather Forecast. 
                    Now I’m using Next.js, which allows me to write cleaner code and make the app more responsive compared to before.`
                }
                <br/><br />
                <a className='text-blue-500 font-bold border rounded-2xl px-2' href={selectedProjects?.navigate || "https://hepsibir.netlify.app/"} target='_blank'>Click Here To Visit</a>
            </p> 
            <div className='flex flex-row mt-10 gap-4 ml-4 md:ml-7 lg:ml-13'>
                {Object.entries(projectsItems).map(([key, product], i) => (
                    <div key={i} className='text-white flex flex-row justify-center items-center'>
                        <button 
                            className={`rounded-3xl border-x border-t cursor-pointer
                                border-[rgba(255,255,255,0.1)] min-w-[83px] min-h-[32px] 
                                text-sm px-2 py-2 ] shadow-[0_6px_9px_0_rgba(0,0,0,0.6)] 
                                ${selectedIndex === i ? "bg-[rgba(255,255,255,0.1)]" : "bg-[rgba(0,0,0,0.1)"}`} onClick={() => {setSelectedIndex(i); setSelectedProject(product)}}>{product.title ||`{Product${i}}`}
                        </button>
                    </div>
                ))}
                </div>
            </div>
            <div className='mb-5 w-full sm:ml-5 flex justify-center sm:justify-center md:justify-start h-full items-center opacity-0' ref={logoImage}>
                {selectedProjects?.title === "All In One" ? (
                <Image
                    className='mt-5'
                    src={selectedProjects.img || "/images/AllOne.png"}
                    alt={selectedProjects.title || "title"}
                    width={width}
                    height={height}
                    quality={100}
                    unoptimized
                />
                ) : (
                <img
                    src={selectedProjects?.img || "spongebob-work.gif"}
                    className='rounded-2xl'
                    alt={selectedProjects?.title || "title"}
                />
                )}
            </div>
        </div>
    </div>
  )
}

export default ProjectsPMain
