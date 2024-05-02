import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';
import DepositCss from '../css/DepositCss';
import QRCode from 'react-qr-code';
import { DepositDone } from '../Api/DepositDone';
import { Flip, toast } from 'react-toastify';

export default function Deposit() {

    const navigate = useNavigate();
    const { depositDetail, setLoad, setLoadColor } = useContext(Context);

    const [amount, setAmount] = useState("")
    const [transactionId, setTransactionId] = useState("")

    const auth_token = JSON.parse(localStorage.getItem('userinfo'))?.auth_token;

    useEffect(() => {
        if (!auth_token) {
            navigate('/');
        }
    })
    

    const handleBack = () => {
        navigate('/game');
    }

    const handlePaymentDone = async () => {
        setLoad(true);
        setLoadColor("#434343");
        let data = {
            "username": JSON.parse(localStorage.getItem('userinfo'))?.username,
            "amount": Number(amount),
            "transaction_id": transactionId
        }
        let res = await DepositDone(data);
        if (res) {
            if (res.data.status) {
                toast.success('Deposit Request Sent Successfully', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Flip,
                });
                navigate("/game")
            }
            else {
                toast.error(res.data.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Flip,
                });
            }
            setLoad(false);
        }
        setLoad(false);
    }

    return (
        <>
            <DepositCss>
                <div className="w-100 fullpage">
                    <div className="w-3">
                        <div className="back-top" onClick={handleBack}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </div>
                        <div className="w-100 text-ceter d-flex">
                            <button className="addFunds"><i className="fa-solid fa-wallet"></i> Add Funds</button>
                        </div>
                        <div className="w-100 px-3">
                            <div className="mb-3 w-100">
                                <label className="form-label">Method</label>
                                <div className="position-relative">
                                    <select className="form-control ps-3">
                                        <option>Phonepe</option>
                                        <option>GPay</option>
                                        <option>Paytm</option>
                                    </select>
                                    <img src="img/phonepe.png" className="method-icon phonepeLogo" />
                                </div>
                            </div>
                            <div className="mb-3 w-100">
                                <label className="form-label">Amount</label>
                                <div className="position-relative">
                                    <input type="text" className="form-control ps-4" name="" value={amount}
                                        onChange={(e) => { setAmount(e.target.value) }} />
                                    <img src="img/ruppe.png" style={{left:"4px"}} className="method-icon" />
                                </div>
                            </div>
                            <div className="mb-3 w-100">
                                <label className="form-label">Transaction id/UTR</label>
                                <div className="position-relative">
                                    <input type="text" className="form-control ps-2" name="" value={transactionId}
                                        onChange={(e) => { setTransactionId(e.target.value) }} />
                                </div>
                            </div>

                            <label className="form-label">Instructions</label>
                            <div className="w-100 instructions-block">
                                <div className="step-text">
                                    <strong>Step 1: </strong>
                                    Take screenshot of QR code or copy the UPI ID
                                </div>
                                <div className="step-text">
                                    <strong>Step 2: </strong>
                                    Enter amount and transaction Id of your payment
                                </div>
                                <div className="step-text">
                                    <strong>Step 3: </strong>
                                    Submit it by clicking submit button
                                </div>
                                {/*<div className="step-text">
                                    <strong>Step 4:</strong>
                                    Take screenshot of QR code or copy the UPI ID
                                </div>
                                <div className="step-text">
                                    <strong>Step 5:</strong>
                                    Take screenshot of QR code or copy the UPI ID
    </div>*/}
                                <div className="d-flex" style={{ marginTop: "30px" }}>
                                    <div className="qr-code">
                                        {depositDetail?.QR_url && <QRCode
                                            title="OR_CODE"
                                            value={depositDetail?.QR_url}
                                            size={150}
                                        />}
                                        <button className="scanandpay-btn">Scan & Pay</button>
                                    </div>
                                </div>
                                <div className="d-flex" style={{ marginTop: "30px" }}>
                                    <div className="upiid-text">UPI IDs:</div>
                                    <div className="upiid-text-text">
                                        <p>{depositDetail?.upi_id} <i className="fa-solid fa-copy"></i></p>
                                        <p>{depositDetail?.upi_id} <i className="fa-solid fa-copy"></i></p>
                                    </div>
                                </div>
                                <div className="text-ceter" onClick={handlePaymentDone}>
                                    <button className="submit-btn">Submit</button>
                                </div>
                            </div>

                            <div className="text-ceter">
                                <button className="submit-btn support-btn">Support</button>
                            </div>

                        </div>
                    </div>
                </div>
            </DepositCss>
        </>
    )
}
