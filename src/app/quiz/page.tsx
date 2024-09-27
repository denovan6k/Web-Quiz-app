import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router';
const Quiz = () => {
  const router = useRouter();
  const { question } = router.query; 
  return (
    <>
    <div className='p-[24px] flex flex-col'>
     <header>

     </header>
     <section>
         <p> {question}</p>
       <h1></h1>
       

     </section>
     <section>

     </section>
     <Button>

     </Button>
    </div>
    </>
  )
}

export default Quiz