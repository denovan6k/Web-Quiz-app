'use client'
import React, { useState ,useEffect,useRef} from 'react'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import { useParams } from 'next/navigation'
import data from '@/app/mobile/data.json'
import Image from 'next/image'
import { useQuestionStore } from '@/app/store'
import Link from 'next/link'
import { Switch } from '@/components/ui/switch'
import Skeletonloader from '@/app/mobile/Skeletonloader'
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
      const getData = async () => {
       if(id){
        const currentQuizIndex= parseInt(id as string) 
        const questionIndex = parseInt(searchParams.get('que') || '0');

        const selectedQuiz = data.quizzes[currentQuizIndex];
        
          
        
        if (selectedQuiz){
          const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
          await delay(1000);
           
            setCurrentQuiz(selectedQuiz) 
            setQuestion(selectedQuiz.questions[questionIndex])
      }
       }

      }

    getData()
     }
     catch(e){
          console.log(e as Error)
     }
}, [id, searchParams])
  
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











if (!Quiz || !question) {
    return <Skeletonloader />;
  }
//remenber we are not querying the quiz ques, it should be /score?id for each quiz 
  return (
    <>
         
         <div className=' bg-my-image bg-cover tl:bg-tab-image  lg:bg-desktop-image  dark:bg-[#313E51] dark:bg-dark-image lg:dark:bg-dark-desktop-image tl:dark:bg-dark-tab-image bg-[#F4F6FA] min-h-screen'>
         <div className='flex flex-col p-[24px] tl:[64px] gap-8'>
         <header className='flex items-center justify-between'> 
          <div className='flex items-center'>
         <span className={`${Quiz?.color} p-[6px] items-center rounded-lg`}>
            <Image src={Quiz?.icon || ""} alt='' width={40} height={40} />
          </span>
          <span className='ml-[16px] text-[#313E51] dark:text-white text-[18px] kl:text-[28px]'>{Quiz?.title}</span>
          </div>
          <div className='flex items-center gap-2'>
         <Image src='/assets/images/icon-sun-dark.svg' alt='' width={16} height={16} />
          <Switch className='data-[state=checked]:bg-[#A729F5] data-[state=unchecked]:bg-slate-200' onCheckedChange={toggleTheme}/>
         <Image src='/assets/images/icon-moon-dark.svg' alt='' width={16} height={16} />
         </div>
         </header>
         <div className='lg:grid lg:grid-cols-2 lg:gap-[120px] kl:mt-[64px]'>
         <section className='flex flex-col text-[#313E51]'>
            <h1 className='text-[40px] kl:[64px] dark:text-white '>
            Quiz completed
            </h1>
            <p className='text-[40px] font-bold kl:[64px] dark:text-white '>
            You scored...
            </p>

         </section>
         <section>
         <main className='p-[32px] tl:p-[52px] flex flex-col items-center bg-white border border-slate-300 rounded-2xl dark:bg-[#313E51] tl:mt-[64px]'>
         <div className='flex items-center'>
         <span className={`${Quiz?.color} p-[6px] items-center rounded-lg`}>
            
            <Image src={Quiz?.icon || ""} alt='' width={40} height={40} />
          </span>
          <span className='ml-[16px] text-[#313E51] text-[18px] dark:text-white'>{Quiz?.title}</span>
         </div>

         <div className=' flex flex-col items-center text-[88px] font-bold text-[#313E51] dark:text-white gap-4'>
             {correctAnswer}
             
             <div className='text-[18px] text-[#626C7F] dark:text-white'>
            out of {Quiz?.questions.length}
             </div>
             
         </div>
         
         </main>
          
         <Button onClick={resetQuiz} className='bg-[#A729F5] hover:bg-[#a729f575] p[32px] tl-[64px] text-white w-full mt-[40px]' asChild >
            <Link href={`/`}>
            Play again
            </Link>
           
            </Button> 
            </section>
            </div>
         </div>
         </div>







    </>
  )
}
export default Score