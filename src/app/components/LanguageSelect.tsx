"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import gsap from 'gsap'
import Image from 'next/image'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { changeLang } from '../redux/WebprojectsSlice'
import { useRouter, useSearchParams } from 'next/navigation'

const LanguageSelect = () => {
  const mainDiv = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState<boolean>(true)
  const [selectedLang, setSelectedLang] = useState<string>('eng')

  const languages = ["eng", "tr", "ru"]

  useEffect(() => {
    const langFromUrl = searchParams.get('lang')?.toLowerCase()
    const savedLang = langFromUrl || localStorage.getItem('lang') || 'eng'

    setSelectedLang(savedLang)
    dispatch(changeLang(savedLang))
  }, [dispatch, searchParams])

  useEffect(() => {
    gsap.fromTo(".buttons",
      { y:-50, opacity:0 },
      { y:0, opacity:1, duration:1, stagger: 0.5, ease:"power2.out" }
    )
  }, [])

  useEffect(() => {
    gsap.to(mainDiv.current, {
      x: open ? 0 : -75,
      duration: 0.5,
      ease:"power2.in"
    })
  }, [open])

  const handleChangeLang = (lang: string) => {
    const lowerLang = lang.toLowerCase()
    setSelectedLang(lowerLang)
    localStorage.setItem('lang', lowerLang)
    dispatch(changeLang(lowerLang))
    router.push(`/?lang=${lowerLang}`, { scroll: false })
  }

  return (
    <div ref={mainDiv} className='relative text-black font-bold flex flex-row w-fit'>
      <div className='flex flex-col gap-y-3 justify-center items-center border min-w-15 max-w-15 py-5
        border-[rgba(255,255,255,0.05)] rounded-4xl z-20 
        bg-[rgba(255,255,255,0.6)] md:bg-[rgba(255,255,255,0.05)]'
      >
        {languages.map((lang, i) => (
          <div 
          key={i} 
          className='cursor-pointer py-2 buttons hover:text-lg w-10 
              text-center rounded-ful flex justify-center 
              items-center select-none bg-blue-500 rounded-full md:bg-[rgba(255,255,255,0)]'
          >
            <Image 
              src={`/images/${lang}.svg`} 
              alt={lang} 
              width={24} 
              height={24} 
              quality={100} 
              unoptimized 
              className='hover:scale-120' 
              onClick={() => handleChangeLang(lang)}
            />
          </div>
        ))}
      </div>
      <div className='bg-amber-600 rounded-r-2xl absolute top-2/5 -right-2/5 text-center' onClick={() => setOpen(!open)}>
        {open ? <FaArrowLeft className='text-2xl'/> : <FaArrowRight className='text-2xl'/>}
      </div>
    </div>
  )
}

export default LanguageSelect
