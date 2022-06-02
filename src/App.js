import {useEffect, useMemo, useState} from "react";
import './App.css'
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Start from "./components/Start"



function App() {

    var arr = [];
     while(arr.length < 20){
    var r = Math.floor(Math.random() * 21) + 1;
    if(arr.indexOf(r) === -1) 
    {
      arr.push(r);
      //console.log(r);
    };
   }
  
  const [questionNo,setQuestionNo]=useState(1);
  const [username,setUsername]=useState(null);
  const [stop,setStop]=useState(false);
  const [won,setWon]=useState("₹ 0");
 

  const moneyPyramid=useMemo(()=>
          [
     {id:1, amount:"₹ 1,000"},
     {id:2, amount:"₹ 2,000"},
     {id:3, amount:"₹ 3,000"},
     {id:4, amount:"₹ 5,000"},
     {id:5, amount:"₹ 10,000"},
     {id:6, amount:"₹ 20,000"},
     {id:7, amount:"₹ 40,000"},
     {id:8, amount:"₹ 80,000"},
     {id:9, amount:"₹ 1,60,000"},
     {id:10, amount:"₹ 3,20,000"},
     {id:11, amount:"₹ 6,40,000"},
     {id:12, amount:"₹ 12,50,000"},
     {id:13, amount:"₹ 25,00,000"},
     {id:14, amount:"₹ 50,00,000"},
     {id:15, amount:"₹ 1 Crore"},
     {id:16, amount:"₹ 7 Crore"},
  ].reverse(),[])

  useEffect(()=>{
      questionNo>1 && setWon(moneyPyramid.find(m=>m.id===questionNo-1).amount)
  },[moneyPyramid, questionNo]);


  return (
    <div className="app">
    {username? (
      <>
         <div className="main">
      {stop? <h1 className="endText">You won: {won}</h1> : (
        <>
          <div className="top">
          <div className="timer">
            <Timer setStop={setStop} questionNo={questionNo} />
          </div>
          </div>
          <div className="bottom">
          <Trivia 
            setStop={setStop} 
            questionNo={questionNo}
            setQuestionNo={setQuestionNo}
            arr={arr}
          />
          </div>
        </>
      )}
      </div>
      <div className="money">
        <ul className='moneyList'>
        {moneyPyramid.map(m=>(
            <li className={ questionNo===m.id? 'moneyListItem active':'moneyListItem'}>
            <span className='moneyListItemNumber'>{m.id}</span>
            <span className='moneyListItemValue'>{m.amount}</span>
          </li>
        ))}
        </ul>
      </div>
      </>
    ) : <Start setUsername={setUsername} />}
    </div>
  );
}

export default App;
