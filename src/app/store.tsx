import {create} from "zustand";

type QuestionStore ={
    
    question: string;
    options: string[];
    answer: string;
    setQuestion: (question: string) => void;
    setOptions: (options: string[], index:number) => void;
    setAnswer: (answer: string) => void;
   
}

export const useQuestionStore = create<QuestionStore>((set) => ({
    question: "",
    options: [],
    answer: "",
    setQuestion: (question) => set({question}),
    setOptions: (options) => set({options}),
    setAnswer: (answer) => set({answer}),
}))