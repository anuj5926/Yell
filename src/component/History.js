import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/Context';

export default function History() {

    const {sessionDetail} =useContext(Context);

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
