import React, { useEffect, useState } from 'react'
import '../css/MyPage.css'
import MyProfile from '../components/MyProfile'
import MyTrip from '../components/MyTrip'
import MyVisitedTrip from '../components/MyVisitedTrip'
import MyReservation from '../components/MyReservation'
import MyWish from '../components/MyWish'
import api from '../axios'

const MyPage = () => {
  const [myInfo, setMyInfo] = useState()
  const [planList, setPlanList] = useState([])
  const [reservationList, setReservationList] = useState([])
  const [wishList, setWishList] = useState([])

  const today = new Date()

  useEffect(() => {
    const getMyInfo = () => {
      api
        .get('/member/me', {
          headers: { authorization: localStorage.getItem('jwtToken') },
        })
        .then((res) => {
          console.log('내정보...', res.data.data)
          setMyInfo(res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const getPlanList = () => {
      api
        .get('/plan/me', {
          headers: { authorization: localStorage.getItem('jwtToken') },
        })
        .then((res) => {
          console.log('내일정...', res.data.data)
          console.log()
          setPlanList(res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const getReservationList = () => {
      api
        .get('/reservation/me', {
          headers: { authorization: localStorage.getItem('jwtToken') },
        })
        .then((res) => {
          console.log('내예약...', res.data.data)
          setReservationList(res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const getWishList = () => {
      api
        .get('/wish/me', {
          headers: { authorization: localStorage.getItem('jwtToken') },
        })
        .then((res) => {
          console.log('내위시...', res.data.data)
          setWishList(res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    getMyInfo()
    getPlanList()
    getReservationList()
    getWishList()
  }, [])

  return (
    <div className="content-body">
      <div className="mypage">
        {/* 프로필 정보(MyProfile) */}
        <MyProfile myInfo={myInfo} />

        {/* 사용자 목록 */}
        <div>
          {/* 나의 여행 일정(MyTrip) */}
          <p className="mytitle">나의 여행 일정</p>
          <div className="mydiv-container">
            {planList?.map((item) =>
              today > new Date(item.ended_date) ? null : <MyTrip plan={item} />,
            )}
          </div>
          {/* 다녀온 여행 일정(MyVisitedTrip)  */}
          <p className="mytitle">다녀온 여행 일정</p>
          <div className="mydiv-container">
            {planList?.map((item) =>
              today > new Date(item.ended_date) ? (
                <MyVisitedTrip plan={item} />
              ) : null,
            )}
          </div>

          {/* 예약된 숙소(Reservationinfo) */}
          <p className="mytitle">예약된 숙소</p>
          <div className="mydiv-container">
            {reservationList?.map((item, idx) =>
              idx < 3 ? <MyReservation reservation={item} /> : null,
            )}
          </div>
        </div>

        <p className="mytitle">나의 저장 목록</p>
        <div className="my-wish-list">
          {wishList?.map((item, idx) =>
            idx < 10 ? <MyWish wish={item} /> : null,
          )}
        </div>
      </div>
    </div>
  )
}

export default MyPage
