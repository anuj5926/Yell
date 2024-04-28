import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/Context';

export default function Number() {

    const {sessionDetail,setNumberModal,setNumberSelected} =useContext(Context);
    const auth_token = JSON.parse(localStorage.getItem('userinfo'))?.auth_token;
    const [numberData, setNumberData] = useState([])
    const [sessionId,setSessionId]= useState("");

    useEffect(() => {
        if (auth_token && Object.keys(sessionDetail).length > 0) {
            setNumberData(sessionDetail?.session_data?.bet_numbers_position)
            setSessionId(sessionDetail?.session_data?.session_id)
        }
    },[sessionDetail]);

    const handleClickNumber=(number)=>{
       setNumberSelected(number);
       setNumberModal(true);
    }

    return (
        <>
            <div className='WholeNumberComponent'>
                <div className='SessionGame'>
                    <div className='Period'>
                        <div className='text'>
                            <p>Period</p>
                        </div>
                        <div className='id'>
                            <p>{sessionId}</p>
                        </div>
                    </div>
                    <div className='CountDown'>
                        <div className='CountDownHead'>
                            <p>Count Down</p>
                        </div>
                        <div className='Time'>
                            <div className='Minutes'>
                                <div className='Number'>
                                    <p>0</p>
                                </div>
                                <div className='text'>
                                    <p>MINUTES</p>
                                </div>
                            </div>
                            <div className='Seconds'>
                                <div className='Number'>
                                    <p>55</p>
                                </div>
                                <div className='text'>
                                    <p>SECONDS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mainNumberDiv'>
                    <div className='allNumber'>
                        {numberData?.map((ele, i) => {
                            return (
                                <div key={i} className='Numberdiv' onClick={()=>handleClickNumber(ele)} >
                                    {ele}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
