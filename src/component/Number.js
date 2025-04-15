import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/Context';
import { Flip, toast } from 'react-toastify';

export default function Number() {

    const { currentTimer, sessionDetail, setNumberModal, setNumberSelected, sideBarOpen } = useContext(Context);
    const auth_token = JSON.parse(localStorage.getItem('userinfo'))?.auth_token;
    const [numberData, setNumberData] = useState([])
    const [sessionId, setSessionId] = useState("");
    const [min, setMin] = useState(0)
    const [sec, setSec] = useState(0)

    useEffect(() => {
        if (auth_token && Object.keys(sessionDetail).length > 0) {
            setNumberData(sessionDetail?.bet_numbers)
            setSessionId(sessionDetail?.current_session_id)
        }
    }, [sessionDetail]);

    const handleClickNumber = (number) => {
        if (min < 5) {
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
            return;
        }
        if (!sideBarOpen) {
            setNumberSelected(number);
            setNumberModal(true);
        }
    }

    useEffect(() => {
        if (Object.keys(currentTimer).length > 0) {
            setMin(currentTimer?.remaining_minutes)
            setSec(currentTimer?.remaining_seconds)
        }
    }, [currentTimer]);


    return (
        <>
            <div className='WholeNumberComponent'>
                <div className='container-Section'>
                    <div class="select-section">
                        <select class="select-dropdown">
                            <option>Selects Client</option>
                        </select>
                        <select class="select-dropdown">
                            <option>Select Games</option>
                        </select>
                    </div>
                </div>


                <div class="numbers-grid">
                    {numberData?.map((ele, i) => {
                        return (

                            <div class="number-item">
                                <div class="number-label">{i > 9 ? i + 1 : `0${i + 1}`}</div>
                                <div class="number-box" onclick="openModal('01')"></div>
                            </div>
                        )
                    })}
                </div>

                <div class="color-row">
                    <div class="color-label">A. H.</div>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((ele, i) => {
                        return (

                            <div class="number-item">
                                <div class="number-label">{ele}</div>
                                <div class="number-box" onclick="openModal('01')"></div>
                            </div>
                        )
                    })}
                </div>

                <div class="color-row">
                    <div class="color-label">B. H.</div>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((ele, i) => {
                        return (

                            <div class="number-item">
                                <div class="number-label">{ele}</div>
                                <div class="number-box" onclick="openModal('01')"></div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div class="container">
                <div class="row">
                    <label for="hruf">Hruf-Type</label>
                    <select id="hruf">
                        <option>A.H.</option>
                    </select>
                    <input type="text" placeholder="Number" />
                    <input type="text" placeholder="Amount" />
                </div>
                <div class="buttons">
                    <button class="btn btn-done">DONE</button>
                    <button class="btn btn-save">Save</button>
                </div>
                <textarea placeholder="Paste your copied text here!
Example:- 01,02,11 (20) 35,76,87(10)
NOTE: Amount Always type in Bracket Like This (50)."></textarea>
                <div class="buttons">
                    <button class="btn btn-clear">CLEAR</button>
                    <div class="with-palat">
                        <input type="checkbox" id="palat" />
                        <label for="palat">With Palat</label>
                    </div>
                    <button class="btn btn-done">DONE</button>
                </div>
                <div class="section-title">Crossing</div>
                <div class="row">
                    <input type="text" placeholder="Number" />
                    <input type="text" placeholder="Amount" />
                    <input type="text" placeholder="JodaCut" />
                </div>
                <div class="buttons">
                    <button class="btn btn-done">DONE</button>
                </div>
                <div class="section-title">Batta Crossing</div>
                <div class="row">
                    <input type="text" placeholder="Number" />
                    <input type="text" placeholder="Amount" />
                </div>
                <div class="buttons">
                    <button class="btn btn-done">DONE</button>
                </div>
                <div class="section-title">Ladi</div>
                <div class="row">
                    <input type="text" placeholder="Number" />
                    <input type="text" placeholder="Amount" />
                </div>
                <div class="buttons">
                    <button class="btn btn-done">DONE</button>
                </div>
            </div>


            < div className="footer" >
                <button className="footer-btn">Jantri</button>
                <button className="footer-btn">Show &amp; Cut</button>
                <button className="footer-btn">Update Result</button>
                <button className="footer-btn">Delete Jantri</button>
                <button className="footer-btn">Menu</button>
            </div >


        </>
    )
}
