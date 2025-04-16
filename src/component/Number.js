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

            <div className="main-container">
                <div className="input-group">
                    <label htmlFor="hruf-type">Hruf-Type</label>
                    <select id="hruf-type">
                        <option>A.H.</option>
                    </select>
                    <label htmlFor="number" style={{ color: "#007bff" }}>
                        Number
                    </label>
                    <input type="text" id="number" />
                    <label htmlFor="amount" style={{ color: "#28a745" }}>
                        Amount
                    </label>
                    <input type="text" id="amount" />
                    <button className="done-btn">DONE</button>
                </div>
                {/* <div className="textarea-container">
                    <div>Paste your copied text here!</div>
                    <div className="example-text">Example:- 01,02,11 (20) 35,76,87(10)</div>
                    <div className="note-text" style={{ color: "#6c757d" }}>
                        नोट :- राशि हमेशा इस तरह ब्रैकेट में टाइप करें (50)
                    </div>
                    <div className="note-text">
                        NOTE :- Amount Always type in Bracket Like This (50).
                    </div>
                </div>*/}

                <div class="textarea-container">
                    <textarea placeholder="Paste your copied text here!
Example:- 01,02,11 (20) 35,76,87(10)
नोट :- राशि हमेशा इस तरह ब्रैकेट में टाइप करें (50)
NOTE :- Amount Always type in Bracket Like This (50)."></textarea>
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                        justifyContent: "flex-end",
                        marginBottom: 20
                    }}
                >
                    <button className="clear-btn">CLEAR</button>
                    <div className="checkbox-container">
                        <input type="checkbox" id="with-palat" />
                        <label htmlFor="with-palat">With Palat</label>
                    </div>
                    <button className="done-btn">DONE</button>
                </div> 

                <div className="crossing-group">
                    <div className="controls-row">
                        <label className="section-title">Crossing</label>
                        <div className="input-column">
                            <span className="colored-label">Number</span>
                            <input type="text" />
                        </div>
                        <div className="input-column">
                            <span className="colored-label green-label">Amount</span>
                            <input type="text" />
                        </div>
                        <div className="input-column">
                            <span className="colored-label red-label">JodaCut</span>
                            <input type="text" />
                        </div>
                        <button className="done-btn">DONE</button>
                    </div>
                </div>
                <div className="crossing-group">
                    <div className="controls-row">
                        <label className="section-title">Batta Crossing</label>
                        <div className="input-column">
                            <span className="colored-label">Number</span>
                            <input type="text" />
                        </div>
                        <div className="input-column">
                            <span className="colored-label">Number</span>
                            <input type="text" />
                        </div>
                        <div className="input-column">
                            <span className="colored-label green-label">Amount</span>
                            <input type="text" />
                        </div>
                        <button className="done-btn">DONE</button>
                    </div>
                </div>
                <div className="crossing-group">
                    <div className="controls-row">
                        <label className="section-title">Ladi</label>
                        <div className="input-column">
                            <span className="colored-label">Number</span>
                            <input type="text" />
                        </div>
                        <div className="input-column">
                            <span className="colored-label">Number</span>
                            <input type="text" />
                        </div>
                        <div className="input-column">
                            <span className="colored-label green-label">Amount</span>
                            <input type="text" />
                        </div>
                        <button className="done-btn">DONE</button>
                    </div>
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
