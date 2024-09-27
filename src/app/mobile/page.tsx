import React from 'react'
import {Button} from '@/components/ui/button'
import data from "./data.json"
import Image from 'next/image'
import Link from 'next/link'
// import { useEffect, useState } from 'react'
const Home = () => {
  

  return (
    <>
   <div className='p-[16px] flex flex-col gap-0'>
   <div className='flex flex-col gap-y-[32px]'>
  
    <div className='flex'>
      <div className='flex justify-end'> 

      </div>
    </div>
    <section className='flex flex-col'>
        <h1 className='text-[40px] font-medium text-[#313E51]'> Welcome to the</h1>
        <h1 className='text-[40px] font-bold text-[#313E51]'> Frontend Quiz! </h1>
        <p className='text-[14px] text-[#626C7F]'> Pick a subject to get started. </p>
    </section>
    <section className='flex flex-col gap-[12px]'>
      {data.quizzes.map((item,index)=>
      
      <Button key={index} className={`flex justify-start p-[12px] h-[64px] space-x-4 items-center min-w-[303px] bg-white text-[18px] text-[#313E51] border rounded-lg`} asChild>
        <Link href={`/quiz/${index}?que=0`}>
        <div className= {`${item.color} h-[40px] w-[40px] p-[6px] flex items-center rounded-lg`}>
      <Image src={item.icon} alt=''  width={40} // Adjust dimensions as needed
              height={40}/>
      
      </div>
       <p>{item.title}</p>
       </Link>
      </Button>)}
    </section>
   

   </div>
   </div>
    </>
  )
}

export default Home