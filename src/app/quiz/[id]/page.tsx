'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useParams, useSearchParams } from 'next/navigation';
import data from '../../mobile/data.json';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link } from 'lucide-react';

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

// Form validation schema
const formSchema = z.object({
  selected: z.number()
    .nullable()
    .refine((val) => val !== null, { message: 'Please select an option' }),
});

const Quiz = () => {
  const { id } = useParams();
  const searchParams = useSearchParams(); // Question number from URL
  const [currentQuiz, setCurrentQuiz] = useState<QuizProps | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionLength, setQuestionLength] = useState(0);
  const [answeredIndex, setAnsweredIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false); //zustand
  const [isSubmitted, setIsSubmitted] = useState(false); //zustand
  const [currentQuestion, setCurrentQuestion] = useState<{
    question: string;
    options: string[];
    answer: string;
  } | null>(null);

  const Dex = parseInt(id as string);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selected: null,
    },
  });

  useEffect(() => {
    try {
      if (id) {
        const quizIndex = parseInt(id as string);
        const questionIndex = parseInt(searchParams.get('que') || '0');

        const selectedQuiz = data.quizzes[quizIndex];
        if (selectedQuiz) {
          setCurrentQuiz(selectedQuiz);
          setCurrentQuestion(selectedQuiz.questions[questionIndex]);
          setCurrentQuestionIndex(questionIndex);
          setQuestionLength(selectedQuiz.questions.length);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, searchParams]);

  if (!currentQuiz || !currentQuestion) {
    return <p>Loading...</p>;
  }

  const handleAnswer = (index: number) => {
    setAnsweredIndex(index);
    form.setValue('selected', index);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const selectedAnswer = currentQuestion?.options[answeredIndex as number];
    if (selectedAnswer === currentQuestion?.answer) {
      setIsCorrect(true);
      console.log('Correct answer!');
    } else {
      setIsCorrect(false);
      console.log('Wrong answer!');
    }
  };

  return (
    <>
      <div className='p-[24px] flex flex-col '>
        <header className='flex items-center mb-[32px]'>
          <span className={`${currentQuiz.color} p-[6px] items-center rounded-lg`}>
            <Image src={currentQuiz.icon} alt='' width={40} height={40} />
          </span>
          <span className='ml-[16px] text-[#313E51] text-[18px]'>{currentQuiz.title}</span>
        </header>

        <section className='flex flex-col gap-4'>
          <p className='text-[#626C7F] text-[14px]'>Question {currentQuestionIndex + 1} of {questionLength}</p>
          <h1 className='text-[#313E51] text-[20px]'>{currentQuestion.question}</h1>
        </section>

        <section className='flex flex-col mt-[40px]'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              {currentQuestion.options.map((item, index) => (
                <button
                  key={index}
                  type='button'
                  onClick={() => handleAnswer(index)}
                  className={`bg-white border hover:bg-[#F4F6FA] rounded-lg disabled:text-[#313E51] disabled:cursor-not-allowed disabled:bg-white flex items-center justify-between min-h-[64px] border-slate-300 p-[12px] text-[#313E51] text-[18px] mb-[12px] w-full
                    ${answeredIndex === index && !isSubmitted ? 'border-2 border-[#b23cfb]' : ''}
                    ${isSubmitted && index === answeredIndex && !isCorrect ? 'border-2 border-[#F56565]' : ''}
                    ${isSubmitted && item === currentQuestion?.answer ? 'border-2 border-[#26D782]' : ''}
                  `}
                  disabled={isSubmitted}
                >
                  <div className='flex items-center '>
                 
                  <span className=   {` uppercase bg-[#F4F6FA] px-[14px] py-[8px]  ${answeredIndex === index && !isSubmitted ? 'bg-[#b23cfb]' : ''}
                    ${isSubmitted && index === answeredIndex && !isCorrect ? 'bg-[#F56565]' : ''}
                    ${isSubmitted && item === currentQuestion?.answer ? 'bg-[#26D782]' : ''}
                  `}>{String.fromCharCode(97 + index)}</span>
                  <span className='ml-[12px] text-wrap'>{item}</span>
                  </div>
                  <div className=''>
                      {isSubmitted && index === answeredIndex && !isCorrect ?( <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                          <path d="M16 4C17.5759 4 19.1363 4.31039 20.5922 4.91345C22.0481 5.5165 23.371 6.40042 24.4853 7.51472C25.5996 8.62902 26.4835 9.95189 27.0866 11.4078C27.6896 12.8637 28 14.4241 28 16C28 17.5759 27.6896 19.1363 27.0866 20.5922C26.4835 22.0481 25.5996 23.371 24.4853 24.4853C23.371 25.5996 22.0481 26.4835 20.5922 27.0866C19.1363 27.6896 17.5759 28 16 28C12.8174 28 9.76515 26.7357 7.51472 24.4853C5.26428 22.2348 4 19.1826 4 16C4 12.8174 5.26428 9.76515 7.51472 7.51472C9.76515 5.26428 12.8174 4 16 4ZM16 6C13.3478 6 10.8043 7.05357 8.92893 8.92893C7.05357 10.8043 6 13.3478 6 16C6 18.6522 7.05357 21.1957 8.92893 23.0711C10.8043 24.9464 13.3478 26 16 26C18.6522 26 21.1957 24.9464 23.0711 23.0711C24.9464 21.1957 26 18.6522 26 16C26 13.3478 24.9464 10.8043 23.0711 8.92893C21.1957 7.05357 18.6522 6 16 6ZM11.678 11.932L11.792 11.792C11.9577 11.6266 12.1762 11.5247 12.4093 11.5038C12.6425 11.483 12.8756 11.5446 13.068 11.678L13.208 11.792L16 14.586L18.792 11.792C18.9577 11.6266 19.1762 11.5247 19.4093 11.5038C19.6425 11.483 19.8756 11.5446 20.068 11.678L20.208 11.792C20.3734 11.9577 20.4753 12.1762 20.4962 12.4093C20.517 12.6425 20.4554 12.8756 20.322 13.068L20.208 13.208L17.414 16L20.208 18.792C20.3734 18.9577 20.4753 19.1762 20.4962 19.4093C20.517 19.6425 20.4554 19.8756 20.322 20.068L20.208 20.208C20.0423 20.3734 19.8238 20.4753 19.5907 20.4962C19.3575 20.517 19.1244 20.4554 18.932 20.322L18.792 20.208L16 17.414L13.208 20.208C13.0423 20.3734 12.8238 20.4753 12.5907 20.4962C12.3575 20.517 12.1244 20.4554 11.932 20.322L11.792 20.208C11.6266 20.0423 11.5247 19.8238 11.5038 19.5907C11.483 19.3575 11.5446 19.1244 11.678 18.932L11.792 18.792L14.586 16L11.792 13.208C11.6266 13.0423 11.5247 12.8238 11.5038 12.5907C11.483 12.3575 11.5446 12.1244 11.678 11.932Z" fill="#EE5454"/>
                        </svg>) : ''}
                        {isSubmitted && item === currentQuestion?.answer ?(<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                              <path d="M16 4C17.5759 4 19.1363 4.31039 20.5922 4.91345C22.0481 5.5165 23.371 6.40042 24.4853 7.51472C25.5996 8.62902 26.4835 9.95189 27.0866 11.4078C27.6896 12.8637 28 14.4241 28 16C28 17.5759 27.6896 19.1363 27.0866 20.5922C26.4835 22.0481 25.5996 23.371 24.4853 24.4853C23.371 25.5996 22.0481 26.4835 20.5922 27.0866C19.1363 27.6896 17.5759 28 16 28C12.8174 28 9.76515 26.7357 7.51472 24.4853C5.26428 22.2348 4 19.1826 4 16C4 12.8174 5.26428 9.76515 7.51472 7.51472C9.76515 5.26428 12.8174 4 16 4ZM16 6C13.3478 6 10.8043 7.05357 8.92893 8.92893C7.05357 10.8043 6 13.3478 6 16C6 18.6522 7.05357 21.1957 8.92893 23.0711C10.8043 24.9464 13.3478 26 16 26C18.6522 26 21.1957 24.9464 23.0711 23.0711C24.9464 21.1957 26 18.6522 26 16C26 13.3478 24.9464 10.8043 23.0711 8.92893C21.1957 7.05357 18.6522 6 16 6ZM14.5 18.084L20.24 12.328C20.416 12.1501 20.6524 12.0448 20.9023 12.0326C21.1523 12.0205 21.3977 12.1026 21.5901 12.2626C21.7825 12.4226 21.9079 12.6489 21.9416 12.8969C21.9753 13.1449 21.9148 13.3965 21.772 13.602L21.656 13.742L15.208 20.206C15.0428 20.372 14.8246 20.4747 14.5914 20.4962C14.3582 20.5178 14.1248 20.4568 13.932 20.324L13.792 20.208L10.292 16.708C10.1148 16.5316 10.0102 16.2953 9.99859 16.0456C9.98703 15.7958 10.0694 15.5508 10.2296 15.3588C10.3897 15.1668 10.6159 15.0418 10.8636 15.0083C11.1114 14.9748 11.3627 15.0354 11.568 15.178L11.708 15.292L14.5 18.084Z" fill="#26D782"/>
                            </svg>):''}
                  </div>
                </button>
              ))}
                    {!isSubmitted && (
                      <Button
                      className='text-white bg-[#A729F5] w-full mt-4'
                      type='submit'
                      disabled={answeredIndex === null || isSubmitted}
                    >
                      Submit Answer
                    </Button>

                    )}
             {isSubmitted && (
               <Button
               className='text-white bg-[#A729F5] w-full mt-4'
               type='submit'
               
             asChild>
              <Link href={`/que/${Dex}/que=${Dex + 1}`}>
               Next Question
               </Link>
             </Button>
             )}


              {form.formState.errors.selected && (
                <p className='text-red-500 text-center'>{form.formState.errors.selected.message}</p>
              )}
            </form>
          </Form>
        </section>
      </div>
    </>
  );
};

export default Quiz;
