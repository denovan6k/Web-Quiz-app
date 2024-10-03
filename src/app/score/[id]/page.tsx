'use client'
import React, { useState ,useEffect} from 'react'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import { useParams } from 'next/navigation'
import data from '@/app/mobile/data.json'
import Image from 'next/image'
import { useQuestionStore } from '@/app/store'
import Link from 'next/link'
interface QuizProps {
    title: string;
    color: string;
    icon: string;
    questions: {
      question: string;
      options: string[];
      answer: string;
    }[];
  }
  
 const Score = () => {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const [Quiz,setCurrentQuiz]= useState<QuizProps | null>(null)
    const [question,setQuestion] = useState<{
        question: string;
        options: string[];
        answer: string;
      } | null>(null); 
const {correctAnswer,resetQuiz}= useQuestionStore()
useEffect(() => {
    
     try{
       if(id){
        const currentQuizIndex= parseInt(id as string) 
        const questionIndex = parseInt(searchParams.get('que') || '0');

        const selectedQuiz = data.quizzes[currentQuizIndex];
        if (selectedQuiz){
            
           
            setCurrentQuiz(selectedQuiz) 
            setQuestion(selectedQuiz.questions[questionIndex])
      }
       }

      
     }
     catch(e){
          console.log(e as Error)
     }
}, [id, searchParams])
if (!Quiz || !question) {
    return <p>Loading...</p>;
  }
//remenber we are not querying the quiz ques, it should be /score?id for each quiz 
  return (
    <>
         

         <div className='flex flex-col p-[24px] gap-8'>
         <header className='flex items-center'> 
         <span className={`${Quiz?.color} p-[6px] items-center rounded-lg`}>
            <Image src={Quiz?.icon || ""} alt='' width={40} height={40} />
          </span>
          <span className='ml-[16px] text-[#313E51] text-[18px]'>{Quiz?.title}</span>
         </header>
         <section className='flex flex-col text-[#313E51]'>
            <h1 className='text-[40px]'>
            Quiz completed
            </h1>
            <p className='text-[40px] font-bold'>
            You scored...
            </p>

         </section>
         <main className='p-[32px] flex flex-col items-center bg-white border border-slate-300 rounded-2xl'>
         <div className='flex items-center'>
         <span className={`${Quiz?.color} p-[6px] items-center rounded-lg`}>
            
            <Image src={Quiz?.icon || ""} alt='' width={40} height={40} />
          </span>
          <span className='ml-[16px] text-[#313E51] text-[18px]'>{Quiz?.title}</span>
         </div>

         <div className=' flex flex-col items-center text-[88px] font-bold text-[#313E51] gap-4'>
             {correctAnswer}
             
             <div className='text-[18px] text-[#626C7F]'>
            out of {Quiz?.questions.length}
             </div>
             
         </div>
         
         </main>
          
         <Button onClick={resetQuiz} asChild >
            <Link href={`/mobile`}>
            Play again
            </Link>
           
            </Button> 

         </div>







    </>
  )
}
export default Score