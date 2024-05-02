import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';
import { GetDeposit } from '../Api/GetDeposit';
import { Flip, toast } from 'react-toastify';

export default function Home() {

  const navigate = useNavigate();
  
  const { setSideBarOpen,setLoad ,setLoadColor,setDepositDetail } = useContext(Context)
  const userInfo = JSON.parse(localStorage.getItem('userinfo'));

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const auth_token = JSON.parse(localStorage.getItem('userinfo'))?.auth_token;
    if (!auth_token) {
      navigate('/');
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userinfo');
    navigate('/');
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && e.target.closest('.wrapper') === null) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    setSideBarOpen(isOpen);
  }, [isOpen]);


  const handleDeposit = async () => {
    setLoad(true);
    setLoadColor("#ffffff");
    let data = {
      "username": JSON.parse(localStorage.getItem('userinfo'))?.username,
      "payment_gateway": "upi-QR"
    }
    let res = await GetDeposit(data);
    if (res) {
      if (res.data.status) {
        setDepositDetail(res.data.data)
        navigate("/deposit")
      }
      else {
        toast.error(res.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
      }
      setLoad(false);
    }
    setLoad(false);
  }

  return (
    <>
      <div className='content'>
        <div className="Companylogo">
          <img src="https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg" alt="profile_picture" />
          <h1>Yells Club</h1>
        </div>
        <div className={`wrapper ${isOpen ? '' : 'active'}`}>
          <div className="section">
            <div className="top_navbar">
              <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                <a >
                  <i className="fas fa-bars"></i>
                </a>
              </div>
              <div className='gameName'>Wingo</div>
              <div><i className="fa-solid fa-wallet" style={{ color: "white" }}></i> <span style={{ color: "white", textAlign: "center" }}>{userInfo?.wallet}</span></div>
            </div>

          </div>
          <div className="sidebar">
            <div className="profile">
              <img src="https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg" alt="profile_picture" />
              <h3>{userInfo?.name}</h3>
              <p><i className="fa-solid fa-wallet" style={{ color: "white" }}></i>{" " +userInfo?.wallet}</p>
            </div>
            <hr className='seprateSidebar'></hr>
            <ul>
              <li>
                <a href="#" className="">
                  <span className="icon"><i className="fas fa-home"></i></span>
                  <span className="item">Home</span>
                </a>
              </li>
              <li>
                <Link onClick={handleDeposit}>
                  <span className="icon"><i className="fa-solid fa-wallet"></i></span>
                  <span className="item">Deposit</span>
                </Link>
              </li>
              <li>
                <a href="#">
                  <span className="icon"><i className="fa-solid fa-indian-rupee-sign"></i></span>
                  <span className="item">Withdraw</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon"><i className="fa-brands fa-searchengin"></i></span>
                  <span className="item">History</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon"><i className="fa-solid fa-handshake-angle"></i></span>
                  <span className="item">Help and Support</span>
                </a>
              </li>
              <li className='LogoutButton'
                onClick={handleLogout}
              >
                <a >
                  <span className="icon"><i className="fa-solid fa-right-from-bracket"></i></span>
                  <span className="item">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </>
  )
}
