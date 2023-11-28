import React, { useState } from 'react'
import '../css/Common.css'
import { Modal } from 'react-bootstrap'
import Kakao from '../img/kakao.png'
import Google from '../img/g-logo.png'
import { Link } from 'react-router-dom'

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

      <Modal show={show} onHide={handleClose} centered="true">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="login-modal">
            <p className="login-logo">어디가</p>
            <div>
              <input type="text" placeholder="아이디" className="loginbox" />
            </div>

            <div>
              <input type="text" placeholder="비밀번호" className="loginbox" />
            </div>

            <div className="find">
              <div style={{ marginRight: 'auto' }}>
                <span style={{ color: 'gray' }}>비밀번호 찾기</span>
              </div>

              <div>
                <span style={{ color: 'orange' }}>회원가입</span>
              </div>
            </div>

            <div className="loginbox" style={{ backgroundColor: '#ff9b00' }}>
              <p className="login">로그인</p>
            </div>

            <div className="social-btn-kakao">
              <img src={Kakao} alt="" />
            </div>

            <div className="google">
              <button className="social-btn-google">
                <img src={Google} alt="" />
                <span className="google-txt">구글 로그인</span>
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Header
