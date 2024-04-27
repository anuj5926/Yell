import { ToastContainer } from "react-toastify";
import GamePage from "./component/GamePage";
import Login from "./component/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./Context/Context";
import { RotatingLines } from "react-loader-spinner";

function App() {

const {load} = useContext(Context);

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
        position:'absolute',
        top:"50%",
        left:"50%",
        zIndex: 22,
        transform: "translate(-50%, -50%)",
      }}>
        <RotatingLines
          visible={load? true :false}
          height="96"
          width="96"
          color="grey"
          strokeColor="#ff4266"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
