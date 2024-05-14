import React, { useContext } from 'react'
import { Context } from '../Context/Context'

export default function WithdrawDetailModal() {

    const { withdrawDetailModalStatus, withdrawDetailModal, setWithdrawDetailModalStatus } = useContext(Context)

    return (
        <>
            {withdrawDetailModalStatus && <div class="modal-overlay">
                <div class="modal-container">
                    <h2 class="modal-heading">Method - {withdrawDetailModal?.withdraw_details?.method}</h2>
                    {withdrawDetailModal?.withdraw_details?.method === "bank" &&
                        < ul class="point-list">
                            <li class="point-item">Holder Name: {withdrawDetailModal?.withdraw_details?.account_holder_name}</li>
                            <li class="point-item">Account Number :{withdrawDetailModal?.withdraw_details?.account_number}</li>
                            <li class="point-item">IFSC: {withdrawDetailModal?.withdraw_details?.ifsc_code}</li>
                        </ul>
                    }
                    {withdrawDetailModal?.withdraw_details?.method === "upi" &&
                        < ul class="point-list">
                            <li class="point-item">UPI ID: {withdrawDetailModal?.withdraw_details?.upi}</li>
                        </ul>
                    }
                    {withdrawDetailModal?.withdraw_details?.method === "phonepe" &&
                        < ul class="point-list">
                            <li class="point-item">Phonepe Number: {withdrawDetailModal?.withdraw_details?.phonepe}</li>
                        </ul>
                    }
                    <button class="close-button" onClick={() => setWithdrawDetailModalStatus(false)}>Close</button>
                </div>
            </div >}
        </>
    )
}
