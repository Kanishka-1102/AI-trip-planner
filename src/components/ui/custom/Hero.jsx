import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex  flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[50px] text-center mt-16'>
            <span className='text-blue-500'>Discover Your Next Adventure With AI:</span> Personalized Itineraries at Your Fingertips</h1>
            <p className='text-xl text-gray-500 text-center'>Discover your perfect journey with AI-driven itineraries, personalized to match your unique preferences and budget</p>
            <Link to={'/create-trip'}>
            <Button>Get Started</Button>
            </Link>
    </div>
  )
}

export default Hero