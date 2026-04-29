import React from 'react'
import { Link } from 'react-router-dom'


const ErrorPage = () => {
  return (
    <>
         <div className='min-w-full h-screen flex flex-col items-center justify-center gap-5.5 text-gray-800 font-extrabold  bg-white/50 mb-10 '>

<h3 className='sm:text-6xl '>404</h3>
<h3 className='sm:text-6xl '>PAGE NOT FOUND</h3>
<button className='px-5 py-2.5 rounded-2xl bg-gray-500 text-amber-50 hover:bg-gray-800'><Link to="/">Back To Home</Link></button>

         </div>
    </>
  )
}

export default ErrorPage