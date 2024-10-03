import {create} from 'zustand'
import { persist,createJSONStorage } from 'zustand/middleware'

type QuestionStore ={
    correctAnswer: number
    wrongAnswer:number
    answeredQuestions:number
    currentQue: number
    answeredQuestionsList: number[];
    setCurrentQue: (currentQue: number) => void,
    answerQuestion: (isCorrect: boolean) => void;
    setCorrectAnswer: () => Promise<void>
    setWrongAnswer: () => void
    setAnsweredQuestions: () => void
    resetQuiz: () => void
    nextQuestion: () => void;
}

// export const useQuestionStore= create<QuestionStore>((set) => ({
//     correctAnswer: 0,
//     wrongAnswer: 0,
//     answeredQuestions: 0,
//     setCorrectAnswer: async () => {
        
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         set((state) => ({correctAnswer: state.correctAnswer + 1}))},
//     setWrongAnswer: () => set((state) => ({wrongAnswer: state.wrongAnswer + 1})),
//     setAnsweredQuestions: () => set((state) => ({answeredQuestions: state.answeredQuestions + 1})),
//     resetQuiz: () => set({correctAnswer: 0, wrongAnswer: 0, answeredQuestions: 0}),
// }))

export const useQuestionStore = create<QuestionStore>()(
    persist((set,get) => ({
        correctAnswer: 0,
        wrongAnswer: 0,
        answeredQuestions: 0,
        currentQue: 0,
        answeredQuestionsList: [],
        
        setCorrectAnswer: async () => {
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            set((state) => ({correctAnswer: state.correctAnswer + 1}))},
        setWrongAnswer: () => set((state) => ({wrongAnswer: state.wrongAnswer + 1})),
         setCurrentQue: (currentQue) => set({currentQue}), 
        answerQuestion: (isCorrect:boolean) => {
            const { currentQue, answeredQuestionsList, } = get()
            if (answeredQuestionsList.includes(currentQue)) {
                return;
            }
            if (isCorrect){
                set((state) => ({correctAnswer: state.correctAnswer + 1}))
            }else{
                set((state) => ({wrongAnswer: state.wrongAnswer + 1}))} 
                 

              set({answeredQuestionsList: [...answeredQuestionsList, currentQue]})  
              get().nextQuestion()
             },
        
             


        setAnsweredQuestions: () => set((state) => ({answeredQuestions: state.answeredQuestions + 1})),
        nextQuestion: () => set((state) => ({currentQue: state.currentQue + 1})),
        resetQuiz: () => {
            set({correctAnswer: 0, wrongAnswer: 0, answeredQuestions: 0, answeredQuestionsList: []})},
    }),
    
      {
        name: 'quiz-storage', // unique name for localStorage
        storage: createJSONStorage(() => localStorage), // (optional) default is 'localStorage' // (optional) default is 'localStorage'
      }
    )
  );