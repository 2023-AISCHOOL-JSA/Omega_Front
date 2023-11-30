import React, { useState } from 'react'
import styled from 'styled-components'
import Plus from '../img/plus.png'
import Minus from '../img/minus.png'
import Domi from '../img/dormitory.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck as faRegularCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faCircleCheck as faSolidCircleCheck } from '@fortawesome/free-solid-svg-icons'

const PlusImg = styled.img`
  width: 15px;
  height: 15px;
  cursor: pointer;
`

const MinusImg = styled.img`
  width: 14px;
  height: 3px;
  cursor: pointer;
  margin-left: 10px;
`

const ReservationInfo = ({ price, setprice }) => {
  const [datePick, setDatePick] = useState(false)
  const [count, setCount] = useState(1)

  const handleDate = () => {
    setDatePick(!datePick)
  }

  return (
    <>
      <div className="res-div">
        <div className="room-img">
          <img src={Domi} alt="" className="room-img2" />
        </div>
        <div className="res-info">
          <p>
            <span className="room-txt">예약 숙소</span>
            <span className="room-txt-detail">제주대학교 기숙사</span>
          </p>
          {/* <span className="room-date" onClick={handleDate}>
            Day 1{' '}
            {datePick ? (
              <FontAwesomeIcon
                icon={faSolidCircleCheck}
                size="xl"
                style={{ color: '#ffb900' }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faRegularCircleCheck}
                size="xl"
                style={{ color: '#ffb900' }}
              />
            )}
          </span> */}

          <p>
            <span className="room-txt">예약 기간</span>
            <span className="room-txt-detail">
              입실일 2023.10.11 | 퇴실일 2023.10.12
            </span>
          </p>

          <p>
            <span className="room-txt">객실 안내</span>
            <span className="room-txt-detail">
              객실은 인원 수에 맞게 현장에서 지정 됩니다.
            </span>
          </p>

          <p>
            <span className="room-txt">방 갯수</span>
            <span className="room-txt-detail">
              <button className="miu-btn" onClick={() => setCount(count - 1)}>
                <MinusImg
                  src={Minus}
                  style={{ marginLeft: '15px', marginRight: '5px' }}
                />
              </button>
              <span>{count}</span>
              <button className="plu-btn" onClick={() => setCount(count + 1)}>
                <PlusImg
                  src={Plus}
                  style={{ marginLeft: '5px', marginRight: '5px' }}
                />
              </button>
              <span className="room-txt">(방 1개당 최대 2명)</span>
            </span>
          </p>

          <p>
            <span className="room-txt">숙박 비용</span>
            <span className="room-txt-detail">
              {price}원 <span className="room-txt">(1박 기준)</span>
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default ReservationInfo
