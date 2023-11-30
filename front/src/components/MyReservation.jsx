import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

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
        <button className="more-btn-pay">
          <FontAwesomeIcon
            icon={faAngleRight}
            size="xl"
            style={{ color: '#000000' }}
          />
        </button>

        <p className="travel-date">
          2023.09.21(1박) | 2인
          <span className="alreay-price">50,000원</span>
        </p>
      </div>
    </>
  )
}

export default MyReservation
