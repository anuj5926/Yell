import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/Context';

export default function History() {

    const {sessionDetail} =useContext(Context);

    const arrayObject = [
        { id: 1234567890, price: 25.99, Number: 50, result: "blue" },
        { id: 9876543210, price: 19.99, Number: 75, result: "green" },
        { id: 2468135790, price: 30.50, Number: 10, result: "red" },
        { id: 1357924680, price: 15.75, Number: 95, result: "yellow" },
        { id: 1234567890, price: 25.99, Number: 50, result: "blue" },
        { id: 9876543210, price: 19.99, Number: 75, result: "green" },
        { id: 2468135790, price: 30.50, Number: 10, result: "red" },
        { id: 1357924680, price: 15.75, Number: 95, result: "yellow" },
        { id: 1234567890, price: 25.99, Number: 50, result: "blue" },
        { id: 9876543210, price: 19.99, Number: 75, result: "green" },
        { id: 2468135790, price: 30.50, Number: 10, result: "red" },
        { id: 1357924680, price: 15.75, Number: 95, result: "last yellow" }
    ];
    const [tableData, setTableData] = useState(arrayObject)

    const auth_token = JSON.parse(localStorage.getItem('userinfo'))?.auth_token;

    useEffect(() =>{
        if (auth_token && Object.keys(sessionDetail).length > 0) {
            
        }
    },[sessionDetail]);

    return (
        <>
            <div className="Tablecontainer">
                <table>
                    <thead>
                        <tr>
                            <th>Session ID</th>
                            <th>Price</th>
                            <th>Number</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((ele, i) => {
                            return (
                                <tr key={i}>
                                    <td>{ele.id}</td>
                                    <td>{ele.price}</td>
                                    <td>{ele.Number}</td>
                                    <td>{ele.result}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
