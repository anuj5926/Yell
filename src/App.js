import { ToastContainer } from "react-toastify";
import GamePage from "./component/GamePage";
import Login from "./component/Login";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./Context/Context";
import { RotatingLines } from "react-loader-spinner";
import Deposit from "./component/Deposit";
import DepositHistory from "./component/DepositHistory";
import WithdrawHistory from "./component/WithdrawHistory";
import Withdraw from "./component/Withdraw";
import LoginP from "./component/LoginP";
import screenOrientation from "screen-orientation";
import HelpSupport from "./component/HelpSupport";
import BetHistory from "./component/BetHistory";

function App() {

  const {direction }= screenOrientation();
  const { load, loadColor } = useContext(Context);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: "50%",
        left: "50%",
        zIndex: 100000,
        transform: "translate(-50%, -50%)",
      }}>
        <RotatingLines
          visible={load ? true : false}
          height="96"
          width="96"
          color="grey"
          strokeColor={loadColor}
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
      <Routes>
        <Route path="/" element={ direction === "landscape" ?<Login/>:<LoginP/>} />
        <Route path="/game" element={<GamePage />} exact />
        <Route path="/deposit/depositMoney" element={<Deposit />} exact />
        <Route path="/deposit/depositHistory" element={<DepositHistory />} exact />
        <Route path="/withdraw/withdrawMoney" element={<Withdraw />} exact />
        <Route path="/withdraw/withdrawHistory" element={<WithdrawHistory />} exact />
        <Route path="/helpSupport" element={<HelpSupport />} exact />
        <Route path="/betHistory" element={<BetHistory/>} exact />
      </Routes>
    </>
  );
}

export default App;
