import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../Context/Context';
import { Support } from '../Api/Support';
import { Flip, toast } from 'react-toastify';
import { Complain } from '../Api/Complain';

export default function HelpSupport() {

    const navigate = useNavigate();
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const { setLoad, setLoadColor } = useContext(Context)
    const [complainList, setComplainList ] = useState([])

    const {pathname} = useLocation();

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

    useEffect(() => {
        if (pathname === '/helpSupport') {
            handleComplain();
        }
    }, [pathname])

    const handleComplain = async () => {
        setLoad(true);
        setLoadColor("#434343");
        let data = {
            "username": JSON.parse(localStorage.getItem('userinfo'))?.username
        }
        let res = await Complain(data);
        if (res) {
            if (res.data.status) {
                setComplainList(res.data.data)
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

    console.log(complainList);

    return (
        <>
            <div className='depositContainer'>
                <div className="wrapper" style={{ marginTop: "0px" }}>
                    <div className="section">
                        <div className="top_navbar" style={{ height: "60px",zIndex:"111" }}>
                            <div className="hamburger" >
                                <a className='back_btn'>
                                    <i className="fa-solid fa-chevron-left" onClick={() => navigate("/game")}></i>
                                </a>
                            </div>
                            <div className='gameName'>Help And Support</div>
                        </div>

                    </div>
                </div>

                <div class="container" style={{ position: "relative", top: "75px" }}>
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

                <div className="Tablecontainer" style={{ marginTop: "150px", width: "100%" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complainList?.map((ele, i) => {
                                return (
                                    <tr key={i}>
                                        <td >{ele?._id.slice(0,5)}</td>
                                        <td>{ele?.subject}</td>
                                        <td>{ele?.message}</td>
                                        <td>{new Date(ele?.createdAt).toUTCString()}</td>
                                        <td>
                                            {ele?.status === 0 && <button type="button" class="btn btn-warning btnyellow-custom">Pending</button>}
                                            {ele?.status === 1 && <button type="button" class="btn btn-success btngreen-success-custom">Success</button>}
                                            {ele?.status === 2 && <button type="button" class="btn btn-danger btnred-danger-custom">Rejected</button>}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    )
}
