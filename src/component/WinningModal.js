import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/Context'

export default function WinningModal() {

    const {sessionResult} =useContext(Context)
    const [result ,setResult] = useState(false);

    useEffect(()=>{
      if(Object.keys(sessionResult).length > 0 ){
        console.log(sessionResult)
        setResult(true)
      }
    },[sessionResult])
    
  return (
    <>
    {result && <div class="modal-overlay">
    <div class="modal-container">
      <h2 class="modal-heading">Winning Number</h2>
      <div class="number-display">{sessionResult?.winning_number}</div>
      <button class="close-button" onClick={()=>setResult(false)}>Close</button>
    </div>
  </div>}
  </>
  )
}
