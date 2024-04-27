import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const navigate = useNavigate();

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
                <a href="#">
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
              <p>{userInfo?.wallet}</p>
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
                <a href="#">
                  <span className="icon"><i className="fa-solid fa-wallet"></i></span>
                  <span className="item">Deposit</span>
                </a>
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
