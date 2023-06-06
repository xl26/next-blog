import React from 'react'
import Link from 'next/link'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'

export default function Navbar() {
  return (
    <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
        <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
            <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
            <Link href="/" className='text-white/90 no-underline hover:text-white'>Sarthak Mishra</Link>
            </h1>
            <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl">
                <Link className="text-white/90 hover:text-white" href="mailto:mishra.sarthak93@gmail.com">
                    <SiGmail />
                </Link>
                <Link className="text-white/90 hover:text-white" target="_blank" href="https://github.com/xl26">
                    <FaGithub />
                </Link>
                <Link className="text-white/90 hover:text-white" target="_blank" href="https://www.linkedin.com/in/sarthak-mishra-43767a87/">
                    <FaLinkedinIn />
                </Link>
            </div>
        </div>
    </nav>
  )
}
