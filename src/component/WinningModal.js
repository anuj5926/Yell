import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/Context'

export default function WinningModal() {

  const { sessionResult,setSessionResult } = useContext(Context)
  const [result, setResult] = useState(false);

  useEffect(() => {
    if (Object.keys(sessionResult).length > 0) {
      console.log(sessionResult)
      setResult(true)
    }
  }, [sessionResult])

  return (
    <>
      {result &&
        <div class="modal-overlay">
        <div class="modal1">
          <div class="modal1-content">
            <div class="victory-banner">
              <span class="victory-text">Winning Number</span>
            </div>
            <div class="score">
              <span class="score-value">{sessionResult?.winning_number}</span>
            </div>
            <button class="close-button1" onClick={() => {setResult(false);setSessionResult({})}}>Close</button>
          </div>
          <div class="background-balls">
            <div class="ball red"></div>
            <div class="ball blue"></div>
            <div class="ball yellow"></div>
            <div class="ball red2"></div>
            <div class="ball blue2"></div>
          </div>
        </div>
        </div>
      }
    </>
  )
}
