import React, { useState } from 'react'

export default function Number() {

    const numberArray = Array.from({ length: 100 }, (_, index) => index + 1);
    const [numberData, setNumberData] = useState(numberArray)

    return (
        <>
            <div className='WholeNumberComponent'>
                <div className='SessionGame'>
                    <div className='Period'>
                        <div className='text'>
                            <p>Period</p>
                        </div>
                        <div className='id'>
                            <p>202111184440</p>
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
                        {numberData.map((ele, i) => {
                            return (
                                <div key={i} className='Numberdiv'>
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
