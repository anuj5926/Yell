import React, { createContext, useEffect, useState } from 'react';
import { SessionDetail } from '../Api/SessionDetail';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
let socket = undefined;

const Context = createContext();

const ContextProvider = ({ children }) => {

  const [userInfo, setUserInfo] = useState(null)
  const [load, setLoad] = useState(false)
  const [numberModal, setNumberModal] = useState(false)
  const [depositModal, setDepositModal] = useState(false)
  const [numberSelected,setNumberSelected] = useState("")
  const [loadColor, setLoadColor] = useState("")
  const [sessionDetail, setSessionDetail] = useState({})
  const [socketConnected, setSocketConnected] = useState(false);
  const auth_token = JSON.parse(localStorage.getItem('userinfo'))?.auth_token;

  const { pathname } = useLocation();

  useEffect(() => {
    async function getSession() {
      if (auth_token && pathname==="/game") {
        setLoad(true);
        setLoadColor("#434343");
        let res = await SessionDetail()
        if (res) {
          setLoad(false);
          setSessionDetail(res.data);
        }
      }
    }
    getSession();
  }, [auth_token,pathname])


  useEffect(() => {
    if (auth_token && Object.keys(sessionDetail).length > 0) {
      socket = io(`${process.env.REACT_APP_SOCKET_CONNECTION_URL}`);
      setSocketConnected(true);
      console.log(socket)
    }
  }, [auth_token, sessionDetail])

  useEffect(() => {
    if (socketConnected) {
      
      socket.emit('newUserJoin', sessionDetail?.session_data?.session_id);

      socket.on("session_details", (data)=>{
        console.log(data)
      });
    }
  }, [socket, socketConnected])

  return (
    <Context.Provider
      value={{
        setUserInfo, userInfo, setLoad, load, sessionDetail,setLoadColor,loadColor,setNumberModal,numberModal,
        setNumberSelected,numberSelected,setDepositModal,depositModal
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };