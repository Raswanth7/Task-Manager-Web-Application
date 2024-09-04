import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div className='flex flex-col justify-center md:min-w-96'>
         <h1 className='text-3xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-300 to-sky-400 text-transparent bg-clip-text md:pb-10 md:pr-10 drop-shadow-2xl shadow-black'>Task Management</h1>
    </div>
  )
}

export default Home