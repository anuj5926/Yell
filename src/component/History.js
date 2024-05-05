import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/Context';

export default function History() {

    const {sessionDetail} =useContext(Context);

    // const arrayObject = [
    //     { id: 1234567890, price: 25.99, Number: 50, result: "blue" },
    //     { id: 9876543210, price: 19.99, Number: 75, result: "green" },
    //     { id: 2468135790, price: 30.50, Number: 10, result: "red" },
    //     { id: 1357924680, price: 15.75, Number: 95, result: "yellow" },
    //     { id: 1234567890, price: 25.99, Number: 50, result: "blue" },
    //     { id: 9876543210, price: 19.99, Number: 75, result: "green" },
    //     { id: 2468135790, price: 30.50, Number: 10, result: "red" },
    //     { id: 1357924680, price: 15.75, Number: 95, result: "yellow" },
    //     { id: 1234567890, price: 25.99, Number: 50, result: "blue" },
    //     { id: 9876543210, price: 19.99, Number: 75, result: "green" },
    //     { id: 2468135790, price: 30.50, Number: 10, result: "red" },
    //     { id: 1357924680, price: 15.75, Number: 95, result: "last yellow" }
    // ];
    const [tableData, setTableData] = useState([])

    const auth_token = JSON.parse(localStorage.getItem('userinfo'))?.auth_token;

    useEffect(() =>{
        if (auth_token && Object.keys(sessionDetail).length > 0) {
            setTableData(sessionDetail?.session_history)
        }
    },[sessionDetail]);

    return (
        <>
            <div className="Tablecontainer">
                <table>
                    <thead>
                        <tr>
                            <th>Session ID</th>
                            <th>Registration Status</th>
                            <th>Collection Amount</th>
                            <th>Winning Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData?.map((ele, i) => {
                            return (
                                <tr key={i}>
                                    <td>{ele.session_id}</td>
                                    <td>{ele.registration_status}</td>
                                    <td>{ele.collection_amount}</td>
                                    <td>{ele.winning_number}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
