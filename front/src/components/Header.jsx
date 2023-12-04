import React, { useState } from 'react'
import '../css/Common.css'
import { Link } from 'react-router-dom'
import LoginModal from './LoginModal'

const Header = () => {

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <div className="header">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">어디가</span>
        </Link>
        {!localStorage.getItem('jwtToken') ? (
          <button className="login-btn" onClick={handleShow}>
            로그인
          </button>
        ) : (
          <>
        <Link to="/mypage" style={{ textDecoration: 'none' }}>
          <button className="login-btn">내 정보</button>

          </Link>
                  <button onClick={()=>{
                    localStorage.removeItem('jwtToken')
                  }} className="ms-4 login-btn2">로그아웃</button>
                  
                  </>
        )}

      </div>

      <LoginModal show={show} handleClose={handleClose} />
    </>
  )
}

export default Header