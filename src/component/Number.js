import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/Context';
import { Flip, toast } from 'react-toastify';

export default function Number() {

    const { currentTimer,sessionDetail, setNumberModal, setNumberSelected, sideBarOpen } = useContext(Context);
    const auth_token = JSON.parse(localStorage.getItem('userinfo'))?.auth_token;
    const [numberData, setNumberData] = useState([])
    const [sessionId, setSessionId] = useState("");
    const [min,setMin]=useState(0)
    const [sec,setSec]=useState(0)

    useEffect(() => {
        if (auth_token && Object.keys(sessionDetail).length > 0) {
            setNumberData(sessionDetail?.bet_numbers)
            setSessionId(sessionDetail?.current_session_id)
        }
    }, [sessionDetail]);

    const handleClickNumber = (number) => {
        if(min < 5){
            toast.error("Betting Time Over Wait for Next Session", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Flip,
            });
            return ;
        }
        if (!sideBarOpen) {
            setNumberSelected(number);
            setNumberModal(true);
        }
    }

    useEffect(()=>{
        if(Object.keys(currentTimer).length> 0){
            setMin(currentTimer?.remaining_minutes)
            setSec(currentTimer?.remaining_seconds)
        }
    },[currentTimer]);


    return (
        <>
            <div className='WholeNumberComponent'>
                <div className='SessionGame'>
                    <div className='Period'>
                        <div className='text'>
                            <p>Session</p>
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
                                    <p>{min < 10 ?`0${min}`:min}</p>
                                </div>
                                <div className='text'>
                                    <p>MINUTES</p>
                                </div>
                            </div>
                            <div className='Seconds'>
                                <div className='Number'>
                                    <p>{sec < 10 ?`0${sec}`:sec}</p>
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
                                <button key={i} className='Numberdiv' onClick={() => handleClickNumber(ele)} style={{backgroundColor:min < 5 && "#656666" ,border :min<5 &&"none"}}>
                                    {ele}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
