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
        <Link to="/make" style={{ textDecoration: 'none' }}>
          <span className="tab" style={{ marginLeft: '15px' }}>
            여행 일정
          </span>
        </Link>
        <span className="bar">|</span>
        <Link to="/reservation" style={{ textDecoration: 'none' }}>
          <span className="tab">숙소 예약</span>
        </Link>
        <button className="login-btn" onClick={handleShow}>
          로그인
        </button>
      </div>

      <LoginModal show={show} handleClose={handleClose} />
    </>
  )
}

export default Header
