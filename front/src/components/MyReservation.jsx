import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const MyReservation = ({ reservation }) => {
  const navigate = useNavigate()

  return (
    <>
      {reservation ? (
        <div
          className="mydiv"
          style={{
            border: 'solid 0.5px #eee',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.08);',
          }}
        >
          <span className="date">Day{reservation.plan_day}.</span>
          <span className="place-name">{reservation.pla_name}</span>
          <span className="pay">
            {reservation.reservation_yn == 'y' ? '결제완료' : '결제필요'}
          </span>
          <button
            className="more-btn-pay"
            onClick={() => {
              navigate(`/reservation/${reservation.plan_no}`)
            }}
          >
            <FontAwesomeIcon
              icon={faAngleRight}
              size="xl"
              style={{ color: '#000000' }}
            />
          </button>

          <p className="travel-date">
            {reservation.start_day}({reservation.days}박)
            <span className="alreay-price">
              {(
                reservation.reservation_cost * reservation.room_n
              ).toLocaleString()}
              원
            </span>
          </p>
        </div>
      ) : (
        <div
          className="mydiv"
          style={{
            border: 'solid 0.5px #eee',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.08);',
          }}
        >
          {' '}
          <p className="travel-date">플랜이 없습니다.</p>
        </div>
      )}
    </>
  )
}

export default MyReservation
