import React, { useContext, useEffect, useState } from 'react'
import { GetWithdrawHistory } from '../Api/GetWithdrawHistory';
import { Context } from '../Context/Context';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flip, toast } from 'react-toastify';
import WithdrawDetailModal from './WithdrawDetailModal';

export default function WithdrawHistory() {

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [withdrawHistoryData, setWithdrawHistoryData] = useState([]);
    const { setLoad, setLoadColor,numberModal,sideBarOpen,setWithdrawDetailModal,setWithdrawDetailModalStatus } = useContext(Context);
    useEffect(() => {
        if (pathname === "/withdraw/withdrawHistory" && !numberModal && !sideBarOpen) {
            handleWithdrawHistory();
        }
    }, [pathname])

    const handleWithdrawHistory = async () => {
        setLoad(true);
        setLoadColor("#434343");
        let data = {
            "username": JSON.parse(localStorage.getItem('userinfo'))?.username
        }
        let res = await GetWithdrawHistory(data);
        if (res) {
            if (res.data.status) {
                setWithdrawHistoryData(res.data.data)
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

    const handleWithdrawDetail=(ele)=>{
        setWithdrawDetailModal(ele)
        setWithdrawDetailModalStatus(true);
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
                            <div className='gameName'>Withdraw History</div>
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
                            {withdrawHistoryData?.map((ele, i) => {
                                return (
                                    <tr key={i}>
                                        <td onClick={()=>handleWithdrawDetail(ele)}>11111111111111111111</td>
                                        <td>{ele?.withdraw_amount}</td>
                                        <td>{ele?.remarks}</td>
                                        <td>
                                            {ele?.withdraw_status === 0 && <button type="button" class="btn btn-warning btnyellow-custom">Pending</button>}
                                            {ele?.withdraw_status === 1 && <button type="button" class="btn btn-success btngreen-success-custom">Success</button>}
                                            {ele?.withdraw_status === 2 && <button type="button" class="btn btn-danger btnred-danger-custom">Rejected</button>}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <WithdrawDetailModal/>
        </>
    )
}
