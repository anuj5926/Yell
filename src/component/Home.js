import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';

export default function Home() {

  const navigate = useNavigate();
  const {pathname} = useLocation();

  const { setSideBarOpen, socket } = useContext(Context)
  const userInfo = JSON.parse(localStorage.getItem('userinfo'));

  const [isOpen, setIsOpen] = useState(false)
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)

  const handleLogout = () => {
    socket.disconnect();
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
              <p><i className="fa-solid fa-wallet" style={{ color: "white" }}></i>{" " + userInfo?.wallet}</p>
            </div>
            <hr className='seprateSidebar'></hr>
            <ul>
              <li>
                <a className='deposit' onClick={() => {setIsDepositOpen(!isDepositOpen)}} >
                  <span className="icon"><i className="fa-solid fa-wallet"></i></span>
                  <span className="item">Deposit</span>
                </a>
                <div className="dropdown-container" style={{ display: isDepositOpen ? "block" : "none" }}>
                  <Link to="/deposit/depositMoney" onClick={()=>setSideBarOpen(false)} >Deposit Money</Link>
                  <Link to="/deposit/depositHistory" onClick={()=>setSideBarOpen(false)}>Despoit History</Link>
                </div>
              </li>
              <li>
                <a className='withdraw' onClick={() => setIsWithdrawOpen(!isWithdrawOpen)}>
                  <span className="icon"><i className="fa-solid fa-indian-rupee-sign"></i></span>
                  <span className="item">Withdraw</span>
                </a>
                <div className="dropdown-container" style={{ display: isWithdrawOpen ? "block" : "none" }}>
                  <Link to="/withdraw/withdrawMoney" onClick={()=>setSideBarOpen(false)}>Withdraw Money</Link>
                  <Link to="/withdraw/withdrawHistory" onClick={()=>setSideBarOpen(false)}>Withdraw History</Link>
                </div>
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
