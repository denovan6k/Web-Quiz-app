'use client'
import React , {useState,useEffect,useRef} from 'react'
import {Button} from '@/components/ui/button'
import data from "./data.json"
import Image from 'next/image'
import Link from 'next/link'
import { Switch } from '@/components/ui/switch'

// import { useEffect, useState } from 'react'
const Mobile = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const rootElement = useRef<HTMLElement | null>(null); // Initialize as null

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set document.documentElement only on the client side
      rootElement.current = document.documentElement;

      const storedTheme = localStorage.getItem('theme');
      const initialTheme = storedTheme ? (storedTheme as 'light' | 'dark') : 'light';
      setTheme(initialTheme);
      rootElement.current.classList.add(initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    if (rootElement.current) {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      rootElement.current.classList.remove(theme); // Remove the current theme class
      rootElement.current.classList.add(newTheme); // Add the new theme class
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme); // Persist the theme in localStorage
    }
  };







  

  return (
    <>
    <div className='bg-my-image bg-cover tl:bg-tab-image  lg:bg-desktop-image dark:bg-[#313E51] dark:bg-dark-image lg:dark:bg-dark-desktop-image tl:dark:bg-dark-tab-image bg-[#F4F6FA]'>
   <div className='p-[16px] tl:px-[64px] tl:py-[54px] lg:px-[100px] flex flex-col gap-0 min-h-screen'>
   <div className='flex flex-col gap-y-[32px] tl:gap-y-[64px]'>
  
    <header className='flex justify-end'>
      <div className='flex self-end'> 
      <div className='flex items-center gap-2'>
         <Image src='/assets/images/icon-sun-dark.svg' alt='' width={16} height={16} />
          <Switch className='data-[state=checked]:bg-[#A729F5] data-[state=unchecked]:bg-slate-200' onCheckedChange={toggleTheme}/>
         <Image src='/assets/images/icon-moon-dark.svg' alt='' width={16} height={16} />
         </div> 
      </div>
    </header>
    <div className='lg:grid lg:grid-cols-2 lg:gap-[146px] kl:mt-[64px] '>
    <section className='flex flex-col text-wrap '>
        <h1 className='text-[40px] font-medium text-[#313E51] dark:text-white kl:text-[42px] xl:text-[64px]'> Welcome to the</h1>
        <h1 className='text-[40px] font-bold text-[#313E51] kl:text-[42px] dark:text-white xl:text-[64px]'> Frontend Quiz! </h1>
        <p className='text-[14px] text-[#626C7F] kl:text-[20px] dark:text-white'> Pick a subject to get started. </p>
    </section>
    <section className='flex flex-col gap-[12px] tl:gap-[24px] tl:mt-[64px] lg:mt-0 mt-[40px] '>
      {data.quizzes.map((item,index)=>
      
      <Button key={index} className={`flex justify-start p-[12px] dark:text-white dark:bg-[#313E51] h-[64px] space-x-4 items-center min-w-[303px] lg:w-full flex-grow bg-white text-[18px] kl:text-[28px] font-semibold text-[#313E51] border rounded-2xl tl:min-h-[80px] hover:bg-[#F4F6FA]`} asChild>
        <Link href={`/quiz/${index}?que=0`}>
        <div className= {`${item.color} h-[40px] w-[40px] p-[6px] flex items-center rounded-lg`}>
      <Image src={item.icon} alt=''  width={40} // Adjust dimensions as needed
              height={40}/>
      
      </div>
       <p className='tl:text-[28px] tl:ml-[32px]'>{item.title}</p>
       </Link>
      </Button>)}
    </section>
    </div>

   </div>
   </div>
   </div>
    </>
  )
}

export default Mobile