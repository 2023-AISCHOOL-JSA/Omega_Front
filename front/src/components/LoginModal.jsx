import React from 'react'
import { Modal } from 'react-bootstrap'
import Kakao from '../img/kakao.png'
import Google from '../img/g-logo.png'

const LoginModal = ({ show, handleClose }) => {
  return (
    <>
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

export default LoginModal
