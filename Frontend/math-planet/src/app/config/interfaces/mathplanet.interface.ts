export interface Equation{
    equation:string;
}

export interface EquationQuestion{
    parsed:string;
    solution:any[];
}


export interface quiz{
    questionNumber:number,
    question:EquationQuestion,
    isAnswered:boolean,
    givenAnswer:any,
    isCorrect:boolean,
    type:string
}