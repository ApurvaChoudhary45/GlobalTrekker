'use client'
import React from 'react'
import {  signIn } from "next-auth/react"
const Welcome = () => {
    return (
        <div className='relative min-h-screen'>
            <video
                className="absolute inset-0 w-full h-full object-cover blur-xs"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="https://videos.pexels.com/video-files/2611440/2611440-hd_1920_1080_30fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className='relative z-50 '>
                <nav className='md:flex md:justify-between md:items-center md:px-40 py-5 backdrop:blur-2xl flex justify-between items-center text-xl px-10'>
                    <h1 className='md:text-3xl text-2xl font-mono font-extrabold '>GlobeTrekker</h1>
                    <button className='md:text-xl text-sm border-2 p-2 rounded-4xl hover:bg-amber-200 font-mono transition-all duration-500 cursor-pointer'>Log In</button>
                </nav>
                <div className='flex justify-center items-center flex-col gap-10 py-40'>
                    <h1 className='md:text-7xl text-4xl font-mono font-extrabold bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent'>GlobeTrekker</h1>
                    <p className='md:text-5xl text-2xl text-white text-center'>Discover the World, Live and Updated.</p>
                    <button className='border-1 text-white p-3 text-2xl rounded-4xl cursor-pointer hover:bg-amber-200 hover:text-black font-mono transition-all duration-500'  onClick={() => signIn()}>Explore the World</button>
                </div>
            </div>
        </div>
    )
}

export default Welcome
