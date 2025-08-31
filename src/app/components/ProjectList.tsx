import React from 'react'
import Projects from './Projects'

const ProjectList = () => {
  return (
    <div className='flex lg:flex-row flex-col w-full max-h-100 sm:max-h-120 md:max-h-150 lg:max-w-200 xl:max-w-300 2xl:max-w-400 overflow-y-auto' >
      <Projects/>
    </div>
  )
}

export default ProjectList
