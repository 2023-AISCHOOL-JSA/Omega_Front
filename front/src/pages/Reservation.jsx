import React, { useState } from 'react'
import '../css/Reservation.css'
import PayInfo from '../components/PayInfo'
import ReservationInfo from '../components/ReservationInfo'

const Reservation = () => {
  const [roomPrice, setRoomPrice] = useState('50,000')

  return (
    <div className="content-body">
      <p className="res-title">Reservation</p>
      <div className="res-bg">
        <div className="top">
          <span className="user-travel">mb_name님의 여행 일정</span>
          <div className="travel-info">
            <span>sd_nm</span>
            <span className="travel-dat">2023.10.11~2023.10.12</span>
            <span>1박2일</span>
          </div>
        </div>
        {/* 일정에 담긴 숙소 */}
        <ReservationInfo price={roomPrice} setprice={setRoomPrice} />

        {/* 결제정보 */}
        <div className="pay-div">
          <PayInfo Roomprice={setRoomPrice} />
        </div>
      </div>
    </div>
  )
}

export default Reservation
