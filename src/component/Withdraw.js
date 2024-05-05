import React from 'react'
import DepositCss from '../css/DepositCss';
import { useNavigate } from 'react-router-dom';
export default function Withdraw() {
  

  const navigate = useNavigate();

  return (
    <>
      <DepositCss>
        <div className="w-100 fullpage">
          <div className="w-3">
            <div className="back-top" >
              <i className="fa-solid fa-chevron-left" onClick={()=>navigate("/game")}></i>
            </div>
            <div className="w-100 text-ceter d-flex">
              <button className="addFunds"><i className="fa-solid fa-wallet"></i> Withdraw Funds</button>
            </div>
            <div className="w-100 px-3">
              <div className="mb-3 w-100">
                <label className="form-label">Method</label>
                <div className="position-relative">
                  <select className="form-control ps-3">
                    <option>Phonepe</option>
                    <option>UPI</option>
                  </select>
                </div>
              </div>

              <div className="mb-3 w-100">
              <label className="form-label">Phonepe / UPI</label>
              <div className="position-relative">
                <input type="text" className="form-control ps-2" name="" />
              </div>
            </div>

              <div className="mb-3 w-100">
                <label className="form-label">Amount (Min 100)</label>
                <div className="position-relative">
                  <input type="text" className="form-control ps-4" name="" />
                  <img src="img/ruppe.png" style={{ left: "4px" }} className="method-icon" />
                </div>
              </div>

              <div className="text-ceter">
                <button className="submit-btn support-btn">Submit</button>
              </div>

            </div>
          </div>
        </div>
      </DepositCss>
    </>
  )
}
