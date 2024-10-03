import React from 'react'
import {Button} from '@/components/ui/button'
import data from "./data.json"
import Image from 'next/image'
import Link from 'next/link'
import { Switch } from '@/components/ui/switch'

// import { useEffect, useState } from 'react'
const Home = () => {
  

  return (
    <>
   <div className='p-[16px] tl:px-[64px] tl:py-[54px] lg:px-[100px] flex flex-col gap-0 min-h-screen'>
   <div className='flex flex-col gap-y-[32px] tl:gap-y-[64px]'>
  
    <header className='flex justify-end'>
      <div className='flex self-end'> 
      <div className='flex items-center gap-2'>
         <Image src='/assets/images/icon-sun-dark.svg' alt='' width={16} height={16} />
          <Switch className='data-[state=checked]:bg-[#A729F5] data-[state=unchecked]:bg-slate-200'/>
         <Image src='/assets/images/icon-moon-dark.svg' alt='' width={16} height={16} />
         </div> 
      </div>
    </header>
    <div className='lg:grid lg:grid-cols-2 lg:gap-[146px]'>
    <section className='flex flex-col text-wrap'>
        <h1 className='text-[40px] font-medium text-[#313E51] kl:text-[42px] xl:text-[64px]'> Welcome to the</h1>
        <h1 className='text-[40px] font-bold text-[#313E51] kl:text-[42px] xl:text-[64px]'> Frontend Quiz! </h1>
        <p className='text-[14px] text-[#626C7F] kl:text-[20px]'> Pick a subject to get started. </p>
    </section>
    <section className='flex flex-col gap-[12px] tl:gap-[24px]  '>
      {data.quizzes.map((item,index)=>
      
      <Button key={index} className={`flex justify-start p-[12px] h-[64px] space-x-4 items-center min-w-[303px] lg:w-full flex-grow bg-white text-[18px] text-[#313E51] border rounded-2xl tl:min-h-[80px]`} asChild>
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
    </>
  )
}

export default Home