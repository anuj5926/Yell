import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';

export default function Deposit() {

    const navigate = useNavigate();
    const auth_token = JSON.parse(localStorage.getItem('userinfo'))?.auth_token;

    useEffect(() => {
        if(!auth_token) {
            navigate('/');
        }
    })

    const handleBack =()=>{
        navigate('/game');
    }

    return (
        <>
        <div className="w-100 fullpage">
            <div className="w-3">
                <div className="back-top" onClick={handleBack}>
                    <i className="fa-solid fa-chevron-left" />
                </div>
                <div className="w-100 text-ceter d-flex">
                    <button className="addFunds">
                        <i className="fa-solid fa-wallet" /> Add Funds
                    </button>
                </div>
                <div className="w-100 px-3">
                    <div className="mb-3 w-100">
                        <label className="form-label">Method</label>
                        <div className="position-relative">
                            <select className="form-control ps-3">
                                <option>Phonepe</option>
                                <option>Phonepe</option>
                                <option>Phonepe</option>
                                <option>Phonepe</option>
                            </select>
                            <img src="img/phonepe.png" className="method-icon" />
                        </div>
                    </div>
                    <div className="mb-3 w-100">
                        <label className="form-label">Amount</label>
                        <div className="position-relative">
                            <input type="text" className="form-control ps-3" name="" />
                            <img src="img/ruppe.png" className="method-icon" />
                        </div>
                    </div>
                    <div className="mb-3 w-100">
                        <label className="form-label">Transaction id/UTR</label>
                        <div className="position-relative">
                            <input type="text" className="form-control" name="" />
                            <img src="img/ruppe.png" className="method-icon" />
                        </div>
                    </div>
                    <label className="form-label">Instructions</label>
                    <div className="w-100 instructions-block">
                        {/*<div className="step-text">
                            <strong>Step 1:</strong>
                            Take screenshot of QR code or copy the UPI ID
                        </div>
                        <div className="step-text">
                            <strong>Step 2:</strong>
                            Take screenshot of QR code or copy the UPI ID
                        </div>
                        <div className="step-text">
                            <strong>Step 3:</strong>
                            Take screenshot of QR code or copy the UPI ID
                        </div>
                        <div className="step-text">
                            <strong>Step 4:</strong>
                            Take screenshot of QR code or copy the UPI ID
                        </div>
                        <div className="step-text">
                            <strong>Step 5:</strong>
                            Take screenshot of QR code or copy the UPI ID
                        </div>*/}
                        <div className="d-flex" style={{ marginTop: 30 }}>
                            <div className="qr-code">
                                <img src="img/qr.png" />
                                <button className="scanandpay-btn">Scan &amp; Pay</button>
                            </div>
                        </div>
                        <div className="d-flex" style={{ marginTop: 30 }}>
                            <div className="upiid-text">UPI IDs:</div>
                            <div className="upiid-text-text">
                                <p>
                                    trogamez1@ibl <i className="fa-solid fa-copy" />
                                </p>
                                <p>
                                    trogamez1@ibl <i className="fa-solid fa-copy" />
                                </p>
                            </div>
                        </div>
                        <div className="text-ceter">
                            <button className="submit-btn">Submit</button>
                        </div>
                    </div>
                    <div className="text-ceter">
                        <button className="submit-btn support-btn">Support</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
