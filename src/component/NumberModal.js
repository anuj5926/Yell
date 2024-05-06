import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/Context'
import { BetPlace } from '../Api/BetPlace';
import { Flip, toast } from 'react-toastify';

export default function NumberModal() {

    const { sessionDetail, numberModal, numberSelected, setNumberModal,setLoad,setLoadColor, setNumberSelected } = useContext(Context);
    const [betAmount, setBetAmount] = useState(10);

    useEffect(() => {
        if (Number(betAmount) < 10) {
            setBetAmount(10);
        }
    }, [betAmount])


    const handlePlacebet = async () => {
        setLoad(true);
        setLoadColor("#434343");
        let data = {
            "player_id": JSON.parse(localStorage.getItem("userinfo")).username,
            "session_id": sessionDetail?.session_data?.session_id,
            "amount": betAmount,
            "position_number": numberSelected,
        }

        let res = await BetPlace(data);
        if (res) {
            console.log(res.data)
            if (res.data.status) {
                toast.success('Bet Placed Successfully', {
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
                setBetAmount(10);
                setNumberModal(false);
                setNumberSelected("");
                setLoad(false);
            }
            else {
                toast.error(res.message, {
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
                setLoad(false);
            }
        }
        setLoad(false);
    }

    return (
        <>
            {numberModal && <div className="modal">
                <div className="modal-content">
                    <button className="Numberbtn btn-close" onClick={() => setNumberModal(false)}>
                        <i className="fas fa-times" />
                    </button>
                    <h2>
                        Number: <span id="numberValue">{numberSelected}</span>
                    </h2>
                    <label htmlFor="betAmount">Betting amount:</label>
                    <div className="amount-container">
                        <button className="Numberbtn btn-decrease" onClick={() => { setBetAmount(betAmount - 10) }}>
                            <i className="fas fa-minus" />
                        </button>
                        <input
                            type="text"
                            id="betAmount"
                            className="amount-input"
                            value={betAmount}
                            onChange={(e) => { setBetAmount(e.target.value) }}
                        />
                        <button className="Numberbtn btn-increase" onClick={() => { setBetAmount(betAmount + 10) }}>
                            <i className="fas fa-plus" />
                        </button>
                    </div>
                    <div className="preset-amounts">
                        <button className="Numberbtn btn-amount" onClick={() => setBetAmount(50)}>50</button>
                        <button className="Numberbtn btn-amount" onClick={() => setBetAmount(100)}>100</button>
                        <button className="Numberbtn btn-amount" onClick={() => setBetAmount(200)}>200</button>
                        <button className="Numberbtn btn-amount" onClick={() => setBetAmount(500)}>500</button>
                    </div>
                    <div>
                        <button className="Numberbtn Placebet" onClick={() => { handlePlacebet() }}>Place your Bet</button>
                    </div>
                </div>
            </div>}
        </>
    )
}
