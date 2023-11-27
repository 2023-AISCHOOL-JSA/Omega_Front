import React from 'react'
import Right from '../img/right.png'
import styled from 'styled-components'

const RightImg = styled.img`
  width: 18px;
  height: 18px;
  position: absolute;
  right: 7%;
  top: 40%;
  filter: opacity(0.4);
  cursor: pointer;
`

const MyReservation = () => {
  return (
    <>
      <div
        className="mydiv"
        style={{
          border: 'solid 0.5px #eee',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.08);',
        }}
      >
        <span className="date">Day1.</span>
        <span className="place-name">전남대학교 기숙사</span>
        <span className="pay">결제완료</span>
        <RightImg src={Right} />
        <p className="travel-date">
          2023.09.21(1박) | 2인
          <span className="alreay-price">50,000원</span>
        </p>
      </div>

      <div
        className="mydiv"
        style={{
          border: 'solid 0.5px #eee',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.08);',
        }}
      >
        <span className="date">Day1.</span>
        <span className="place-name">경동대학교 기숙사</span>
        <span className="pay">결제완료</span>
        <RightImg src={Right} />
        <p className="travel-date">
          2023.08.02(1박) | 2인
          <span className="alreay-price">50,000원</span>
        </p>
      </div>

      <div
        className="mydiv"
        style={{
          border: 'solid 0.5px #eee',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.08);',
        }}
      >
        <span className="date">Day2.</span>
        <span className="place-name">경동대학교 기숙사</span>
        <span className="pay">결제완료</span>
        <RightImg src={Right} />
        <p className="travel-date">
          2023.08.03(1박) | 2인
          <span className="alreay-price">50,000원</span>
        </p>
      </div>
    </>
  )
}

export default MyReservation
