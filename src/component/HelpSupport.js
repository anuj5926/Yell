import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../Context/Context';
import { Support } from '../Api/Support';
import { Flip, toast } from 'react-toastify';

export default function HelpSupport() {

    const navigate = useNavigate();
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const {setLoad,setLoadColor}= useContext(Context)

    const handleSubmit = async () => {
        setLoad(true);
        setLoadColor("#434343");
        let data = {
            "username": JSON.parse(localStorage.getItem('userinfo'))?.username,
            "subject": subject,
            "message": message,
            "img": ""
        }
        let res = await Support(data);
        if (res) {
            if (res.data.status) {
                toast.success('Request Submit Successfully', {
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
                setMessage("")
                setSubject("")
                navigate("/game")
            }
            else {
                toast.error(res.data.message, {
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
            }
            setLoad(false);
        }
        setLoad(false);
    }

    return (
        <>
            <div className='depositContainer'>
                <div className="wrapper" style={{ marginTop: "0px" }}>
                    <div className="section">
                        <div className="top_navbar" style={{ height: "60px" }}>
                            <div className="hamburger" >
                                <a className='back_btn'>
                                    <i className="fa-solid fa-chevron-left" onClick={() => navigate("/game")}></i>
                                </a>
                            </div>
                            <div className='gameName'>Help And Support</div>
                        </div>

                    </div>
                </div>

                <div class="container" style={{ position: "relative", top: "115px" }}>
                    <h2>Send Message</h2>
                    <div>
                        <div class="form-group">
                            <label for="subject">Subject:</label>
                            <input type="text" id="subject" value={subject} onChange={(e) => { setSubject(e.target.value) }} placeholder="Enter subject..." />
                        </div>
                        <div class="form-group">
                            <label for="message">Message:</label>
                            <textarea id="message" value={message} onChange={(e) => { setMessage(e.target.value) }} placeholder="Enter your message..."></textarea>
                        </div>
                        <button type="submit" class="btn-submit" onClick={handleSubmit}>Send</button>
                    </div>
                </div>
            </div >
        </>
    )
}
