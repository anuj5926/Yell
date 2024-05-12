import React, { useContext, useState } from 'react'
import DepositCss from '../css/DepositCss';
import { useNavigate } from 'react-router-dom';
import { GetWithdraw } from '../Api/GetWithdraw';
import { Context } from '../Context/Context';
import { Flip, toast } from 'react-toastify';
export default function Withdraw() {

  const [withdrawOption, setWithdrawOption] = useState('phonepe')
  const [phonepeNumberOrUpi, setphonepeNumberOrUpi] = useState('');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [ifsc, setIfsc] = useState('');
  const navigate = useNavigate();
  const { setLoad, setLoadColor } = useContext(Context);


  const handleWithdrawRequest = async () => {
    console.log("object")

    if (withdrawOption !== "bank" && (phonepeNumberOrUpi === "" || amount === "")) {
      toast.error("Fill the value first", {
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
    else if (withdrawOption === "bank" && (accountNumber === "" || accountName === "" || ifsc === "" || amount === "" || accountNumber !== confirmAccountNumber)) {
      toast.error("Fill the value first", {
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

    else {
      setLoad(true);
      setLoadColor("#434343");
      let data = {
        "username": JSON.parse(localStorage.getItem('userinfo'))?.username,
        "amount": Number(amount),
        "payment_gateway": "upi-QR",
        "withdraw_details": {
          "method": withdrawOption,
          ...(withdrawOption === "phonepe" && { "phonepe": phonepeNumberOrUpi }),
          ...(withdrawOption === "upi" && { "upi": phonepeNumberOrUpi }),
          ...(withdrawOption === "bank" && { "account_number": accountNumber }),
          ...(withdrawOption === "bank" && { "ifsc_code": ifsc }),
          ...(withdrawOption === "bank" && { "account_holder_name": accountName }),
        }
      }
      let res = await GetWithdraw(data);
      if (res) {
        if (res.data.status) {
          toast.success('Withdraw Request Sent Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          });
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
  }

  return (
    <>
      <DepositCss>
        <div className="w-100 fullpage">
          <div className="w-3">
            <div className="back-top" >
              <i className="fa-solid fa-chevron-left" onClick={() => navigate("/game")}></i>
            </div>
            <div className="w-100 text-ceter d-flex">
              <button className="addFunds"><i className="fa-solid fa-wallet"></i> Withdraw Funds</button>
            </div>
            <div className="w-100 px-3">
              <div className="mb-3 w-100">
                <label className="form-label">Method</label>
                <div className="position-relative">
                  <select className="form-control ps-3" onChange={(e) => { setWithdrawOption(e.target.value) }}>
                    <option value="phonepe" >Phonepe</option>
                    <option value="upi">UPI</option>
                    <option value="bank">Bank</option>
                  </select>
                </div>
              </div>

              {withdrawOption !== "bank" && <div className="mb-3 w-100">
                <label className="form-label">Phonepe / UPI</label>
                <div className="position-relative">
                  <input type="text" className="form-control ps-2" value={phonepeNumberOrUpi} onChange={(e) => { setphonepeNumberOrUpi(e.target.value) }} />
                </div>
              </div>}
              {withdrawOption === "bank" &&
                <>
                  <div className="mb-3 w-100">
                    <label className="form-label">Account Number</label>
                    <div className="position-relative">
                      <input type="text" className="form-control ps-2" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                    </div>
                  </div>
                  <div className="mb-3 w-100">
                    <label className="form-label">Confirm Account Number</label>
                    <div className="position-relative">
                      <input type="text" className="form-control ps-2" value={confirmAccountNumber} onChange={(e) => setConfirmAccountNumber(e.target.value)} />
                    </div>
                  </div>
                  <div className="mb-3 w-100">
                    <label className="form-label">A/c Holder Name</label>
                    <div className="position-relative">
                      <input type="text" className="form-control ps-2" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
                    </div>
                  </div>
                  <div className="mb-3 w-100">
                    <label className="form-label">IFSC</label>
                    <div className="position-relative">
                      <input type="text" className="form-control ps-2" value={ifsc} onChange={(e) => setIfsc(e.target.value)} />
                    </div>
                  </div>
                </>
              }

              <div className="mb-3 w-100">
                <label className="form-label">Amount (Min 100)</label>
                <div className="position-relative">
                  <input type="text" className="form-control ps-4" value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                  <img src="/img/ruppe.png" style={{ left: "4px" }} className="method-icon" />
                </div>
              </div>

              <div className="text-ceter" onClick={() => handleWithdrawRequest()}>
                <button className="submit-btn support-btn">Submit</button>
              </div>

            </div>
          </div>
        </div>
      </DepositCss>
    </>
  )
}
