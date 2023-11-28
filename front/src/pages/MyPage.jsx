import React from 'react'
import '../css/MyPage.css'
import MyProfile from '../components/MyProfile'
import MyTrip from '../components/MyTrip'
import MyVisitedTrip from '../components/MyVisitedTrip'
import MyReservation from '../components/MyReservation'
import MyWish from '../components/MyWish'

const MyPage = () => {
  return (
    <div className="content-body">
      <div className="mypage">
        {/* 프로필 정보(MyProfile) */}
        <MyProfile />

        {/* 사용자 목록 */}
        <div>
          {/* 나의 여행 일정(MyTrip) */}
          <p className="mytitle">나의 여행 일정</p>
          <div className="mydiv-container">
            <MyTrip />
          </div>
          {/* 다녀온 여행 일정(MyVisitedTrip)  */}
          <p className="mytitle">다녀온 여행 일정</p>
          <div className="mydiv-container">
            <MyVisitedTrip />
          </div>

          {/* 예약된 숙소(Reservationinfo) */}
          <p className="mytitle">예약된 숙소</p>
          <div className="mydiv-container">
            <MyReservation />
          </div>
        </div>

        <p className="mytitle">나의 저장 목록</p>
        <div className="my-wish-list">
          <MyWish />
        </div>
      </div>
    </div>
  )
}

export default MyPage
