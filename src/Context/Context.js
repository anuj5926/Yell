import React, { createContext, useEffect, useState } from 'react';
import { SessionDetail } from '../Api/SessionDetail';
import io from 'socket.io-client';
import { useBlocker, useLocation, useNavigate } from 'react-router-dom';
let socket = undefined;

const Context = createContext();

const ContextProvider = ({ children }) => {

  const [userInfo, setUserInfo] = useState(null)
  const [load, setLoad] = useState(false)
  const [numberModal, setNumberModal] = useState(false)
  const [depositModal, setDepositModal] = useState(false)
  const [numberSelected, setNumberSelected] = useState("")
  const [loadColor, setLoadColor] = useState("")
  const [sessionDetail, setSessionDetail] = useState({})
  const [sessionDetailStatus, setSessionDetailStatus] = useState(false)
  const [socketConnected, setSocketConnected] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [currentTimer, setCurrentTimer] = useState({});
  const [sessionResult, setSessionResult] = useState({});
  const [withdrawDetailModal, setWithdrawDetailModal] = useState({});
  const [withdrawDetailModalStatus, setWithdrawDetailModalStatus] = useState(false);
  const [wallet, setWallet] = useState(0);
  const auth_token = JSON.parse(localStorage.getItem('userinfo'))?.auth_token;

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function getSession() {
      if (auth_token) {
        if (pathname === '/game') {
          setLoad(true);
          setLoadColor("#434343");
        }
        let data = {
          username: JSON.parse(localStorage.getItem('userinfo'))?.username
        }
        let res = await SessionDetail(data)
        if (res.data.status) {
          setLoad(false);
          setSessionDetail(res.data);
          setWallet(res.data.updated_wallet)
          setSessionDetailStatus(true);
        } else {
          if (res.data.message === "token not belonging to the user") {
            socket?.disconnect();
            setLoad(false);
            localStorage.removeItem('userinfo');
            navigate('/');
          }
        }
      }
      else {
        setSessionDetail({})
      }
    }
    getSession();
  }, [auth_token])

  useEffect(() => {
    const auth_token = JSON.parse(localStorage.getItem('userinfo'))?.auth_token;
    if (!auth_token) {
      navigate('/');
    }

    if (pathname !== '/game' && numberModal) {
      setNumberModal(false);
      navigate('/game');
    }
    if (pathname !== '/game' && sideBarOpen) {
      setSideBarOpen(false);
      navigate('/game');
    }
  }, [pathname, auth_token])

  useEffect(() => {
    if (auth_token && sessionDetailStatus) {
      socket = io(`${process.env.REACT_APP_SOCKET_CONNECTION_URL}`);
      setSocketConnected(true);
      console.log(socket)
      setSessionDetailStatus(false);
    }
  }, [auth_token, sessionDetailStatus])

  useEffect(() => {
    if (socketConnected) {

      socket.emit('newUserJoin', sessionDetail?.session_data?.session_id);

      socket.on("session_details", (data) => {
        console.log("session_details", data)
      });
      socket.on("current_Timer", (data) => {
        console.log("current_Timer", data)
        setCurrentTimer(data);
      });
      socket.on("session_result", (data) => {
        console.log("session_result", data)
        setSessionResult(data);
      });
    }
  }, [socket, socketConnected])

  return (
    <Context.Provider
      value={{
        setUserInfo, userInfo, setLoad, load, sessionDetail, setLoadColor, loadColor, setNumberModal, numberModal,
        setNumberSelected, numberSelected, setDepositModal, depositModal, setSideBarOpen, sideBarOpen, currentTimer, socket, wallet,
        setWallet, sessionResult, setWithdrawDetailModalStatus, setWithdrawDetailModal, withdrawDetailModalStatus, withdrawDetailModal
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };