'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useRouter } from 'next/navigation'
import Image from "next/image";

const Certificates = () => {
    const { certificateItems } = useSelector((state: RootState) => state.WebProjects)
    const router = useRouter()

  return (
    <div className='flex lg:flex-row flex-col gap-8 lg:overflow-y-hidden max-w-full transform h-full mx-2 sm:mx-0'>
            {Object.entries(certificateItems ?? {}).map(([key, product], i) => (
                <div key={i} className='rounded-2xl bg-[rgba(255,255,255,0.02)] 
                backdrop-blur-lg lg:min-w-[760px] lg:min-h-[480px] 
                inter hover:shadow-md shadow-black mb-2 cursor-pointer'

                onClick={() => {
                    if (product.navigate.startsWith("http")) {
                        window.open(product.navigate, "_blank", "noopener");
                    } else {
                        router.push(product.navigate);
                    }
                }}>
                    <div className={`w-full max-w-[760px] p-[8px] select-none flex justify-center`}>
                        <Image src={product.img} 
                        alt={product.title} 
                        className='w-full flex rounded-2xl' 
                        width={760} 
                        height={380} 
                        quality={100} 
                        unoptimized 
                        style={{ maxWidth: "90%", height: "90%"}}/>
                    </div>
    
                    <div className='flex flex-row inter py-3 px-10'>
                        <div className='flex flex-col justify-start items-start gap-2'>
                            <p style={{color: "rgba(255,255,255,0.8)", fontSize:"18px"}}>{product.title}</p>
                            <p style={{color: "rgba(255,255,255,0.6)", fontSize:"16px"}}>{product.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
  )
}

export default Certificates
