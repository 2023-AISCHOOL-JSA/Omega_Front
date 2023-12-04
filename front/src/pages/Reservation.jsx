import React, { useEffect, useState } from 'react'
import '../css/Reservation.css'
import PayInfo from '../components/PayInfo'
import ReservationInfo from '../components/ReservationInfo'
import { useParams } from 'react-router-dom'
import api from '../axios'

const Reservation = () => {
  const [totalPrice, setTotalPrice] = useState(0)

  const [userInfo, setUserInfo] = useState()
  const [planInfo, setPlanInfo] = useState({})
  const [reservationInfoList, setReservationInfoList] = useState([])

  const { plan_no } = useParams()

  useEffect(() => {
    const getUserInfo = () => {
      api
        .get(`/member/me`, {
          headers: { authorization: localStorage.getItem('jwtToken') },
        })
        .then((res) => {
          setUserInfo(res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const getPlanInfo = () => {
      api
        .get(`/plan/${plan_no}`, {
          headers: { authorization: localStorage.getItem('jwtToken') },
        })
        .then((res) => {
          console.log(res.data.data)
          const { started_date, ended_date, ...result } = res.data.data
          const days =
            (new Date(ended_date) - new Date(started_date)) /
            (1000 * 60 * 60 * 24)
          setPlanInfo({
            ...result,
            started_date: new Date(started_date)
              .toLocaleDateString()
              .replace(/ /gi, '-')
              .replace(/\./gi, ''),
            ended_date: new Date(ended_date)
              .toLocaleDateString()
              .replace(/ /gi, '-')
              .replace(/\./gi, ''),
            days,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const getReservationInfo = () => {
      api
        .get(`/reservation/${plan_no}`, {
          headers: { authorization: localStorage.getItem('jwtToken') },
        })
        .then((res) => {
          console.log(res.data.data)
          setReservationInfoList(res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    getUserInfo()
    getPlanInfo()
    getReservationInfo()
  }, [])

  return (
    <div className="content-body">
      <p className="res-title">Reservation</p>
      <div className="res-bg">
        <div className="top">
          <span className="user-travel">{userInfo?.mb_name}님의 여행 일정</span>
          <div className="travel-info">
            <span>{planInfo.plan_region}</span>
            <span className="travel-dat">
              {planInfo.started_date} ~ {planInfo.ended_date}
            </span>
            <span>
              {planInfo.days}박 {planInfo.days + 1}일
            </span>
          </div>
        </div>
        {/* 일정에 담긴 숙소 */}
        {reservationInfoList.map((item, idx) => (
          <ReservationInfo
            place={item}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
            key={idx}
            dorm={idx}
          />
        ))}

        {/* 결제정보 */}
        <div className="pay-div">
          <PayInfo totalPrice={totalPrice} userInfo={userInfo} plan_no={plan_no} />
        </div>
      </div>
    </div>
  )
}

export default Reservation
