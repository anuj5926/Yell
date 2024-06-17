import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';
import { GetBetHistory } from '../Api/GetBetHistory';
import { Flip, toast } from 'react-toastify';

export default function BetHistory() {

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [betHistoryData, setBetHistoryData] = useState([]);
    const { setLoad, setLoadColor, numberModal, sideBarOpen, wallet } = useContext(Context);
    useEffect(() => {
        if (pathname === "/betHistory" && !numberModal && !sideBarOpen) {
            handleBetHistory();
        }
    }, [pathname])

    const handleBetHistory = async () => {
        setLoad(true);
        setLoadColor("#434343");
        let data = {
            "username": JSON.parse(localStorage.getItem('userinfo'))?.username
        }
        let res = await GetBetHistory(data);
        if (res) {
            if (res.data.status) {
                const result = []
                let data =res.data.bet_history;

                data.forEach(entry => {
                    if (entry.matchedPlayersBetDetails.length > 0) {
                        entry.matchedPlayersBetDetails.forEach(winningDetail => {
                            const newObj = {
                                ...entry,
                                matchedPlayersBetDetails: winningDetail
                            };
                            result.push(newObj);
                        });
                    } else {
                        result.push(entry);
                    }
                });
                console.log(result);
                setBetHistoryData(result)
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
        <div className='depositContainer'>
            <div className="wrapper" style={{ marginTop: "0px" }}>
                <div className="section">
                    <div className="top_navbar" style={{ height: "60px" }}>
                        <div className="hamburger" >
                            <a className='back_btn'>
                                <i className="fa-solid fa-chevron-left" onClick={() => navigate("/game")}></i>
                            </a>
                        </div>
                        <div className='gameName'>Bet History</div>
                    </div>
                </div>
            </div>

            <div className="Tablecontainer betHistorytableCss" >
                <table>
                    <thead>
                        <tr>
                            <th>Session ID</th>
                            <th>Transaction ID</th>
                            <th>Position Number</th>
                            <th>Bet Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {betHistoryData?.map((ele, i) => {
                            return (
                                <tr key={i}>
                                    <td>{ele?.session_id}</td>
                                    <td>{ele?._id.slice(-5)}</td>
                                    <td>{ele?.winning_number}</td>
                                    <td style={{color:ele?.matchedWinningDetails?.length > 0 ?"green": "red" }}>{ele?.matchedWinningDetails?.length > 0 ? `+` : `-`}{ele?.matchedPlayersBetDetails?.bet_amount}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
