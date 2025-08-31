import React from 'react'
import ProjectsPMain from '../components/ProjectsPMain'
import Header from '../components/Header'

const page = () => {
  return (
    <div className='text-white lg:mx-10 lg:my-5 h-screen flex justify-center lg:justify-start'>
      <Header/>
        <div className='w-full mt-20'>
           <ProjectsPMain/>
        </div>
    </div>
  )
}

export default page
