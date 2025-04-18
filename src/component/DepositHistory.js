import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GetDepositHistory } from '../Api/GetDepositHistory';
import { Flip, toast } from 'react-toastify';
import { Context } from '../Context/Context';

export default function DepositHistory() {

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [despositHistoryData, setDepositHistoryData] = useState([]);
    const { setLoad, setLoadColor,numberModal,sideBarOpen,wallet } = useContext(Context);
    useEffect(() => {
        if (pathname === "/deposit/depositHistory" && !numberModal && !sideBarOpen ) {
            handleDepositHistory();
        }
    }, [pathname])

    const handleDepositHistory = async () => {
        setLoad(true);
        setLoadColor("#434343");
        let data = {
            "username": JSON.parse(localStorage.getItem('userinfo'))?.username
        }
        let res = await GetDepositHistory(data);
        if (res) {
            if (res.data.status) {
                setDepositHistoryData(res.data.data)
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
                                    <i className="fa-solid fa-chevron-left" onClick={()=>navigate("/game")}></i>
                                </a>
                            </div>
                            <div className='gameName'>Deposit History</div>
                        </div>
                    </div>
                </div>

                <div className="Tablecontainer" style={{ marginTop: "60px", width: "100%" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Amount</th>
                                <th>Remark</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {despositHistoryData?.map((ele, i) => {
                                return (
                                    <tr key={i}>
                                        {console.log("Deposit amount:", ele?.deposit_amount)}
                                        <td>{ele?.transaction_id}</td>
                                        <td>{ele?.deposit_amount}</td>
                                        <td>{ele?.remarks}</td>
                                        <td>
                                            {ele?.deposit_status === 0 && <button type="button" class="btn btn-warning btnyellow-custom">Pending</button>}
                                            {ele?.deposit_status === 1 && <button type="button" class="btn btn-success btngreen-success-custom">Success</button>}
                                            {ele?.deposit_status === 2 && <button type="button" class="btn btn-danger btnred-danger-custom">Rejected</button>}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
