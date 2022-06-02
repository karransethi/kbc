import { useEffect, useState } from "react"
import data from "../Data"
import useSound from "use-sound"
import play from "../assets/sounds/play.mp3"
import correct from "../assets/sounds/correct.mp3"
import wrong from "../assets/sounds/wrong.mp3"


export default function Trivia({setStop, questionNo, setQuestionNo,arr}) {

   const [question, setQuestion]= useState(null);
   const [selectedAns, setSelectedAns]= useState(null);
   const [className, setClassName]= useState("answer");
   const [lPlay]=useSound(play)
   const [lCorrect]=useSound(correct)
   const [lWrong]=useSound(wrong)

   useEffect(()=>{
      lPlay();
   },[lPlay])

   useEffect(()=>{
      setQuestion(data()[arr[questionNo-1]]);
      //console.log(data()[0].quesition);
   },[data, questionNo]);

   const delay=(duration,callback)=>{
       setTimeout(()=>{
          callback();
       },duration)
   }

   const handleClick=(a)=>{
     setSelectedAns(a)
     setClassName("answer active");
     delay(3000,()=>
     setClassName(a.correct==="true" ? "answer correct": "answer wrong")
     );
     delay(5000,()=>
     {
       if(a.correct==="true")
       {
         lCorrect();
         delay(1000,()=>{
            setQuestionNo((prev)=>prev+1);
            setSelectedAns(null);
         })
            
       } else{
         lWrong();
         delay(1000,()=>{
                 setStop(true);
         })
        
       }
     }
     )
     
   }

  return (
    <div className="trivia">
        <div className="question">{question?.quesition}</div>
        <div className="answers">
            {question?.answers.map((a)=>(
                 <div className={selectedAns===a?className:"answer"} onClick={()=>handleClick(a)}>
                 {a.text}
                 </div>
            ))}
            
        </div>
    </div>
  )
}
