import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

const MyVisitedTrip = () => {
  return (
    <>
      <div
        className="mydiv"
        style={{
          backgroundColor: '#fff6d8',
          border: 'none',
          boxShadow: 'box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.05);',
        }}
      >
        <p className="travel-reg">여수 여행</p>
        <p className="travel-date">2023.09.21~2023.09.21 | 1일</p>
        <button className="more-btn">
          <FontAwesomeIcon
            icon={faAngleRight}
            size="xl"
            style={{ color: '#000000' }}
          />
        </button>
      </div>
    </>
  )
}

export default MyVisitedTrip
