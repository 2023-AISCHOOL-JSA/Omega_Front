import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

const MyTrip = () => {
  return (
    <>
      <div className="mydiv">
        <p className="travel-reg">제주 여행</p>
        <p className="travel-date">2023.10.11~2023.10.12 | 1박2일</p>
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

export default MyTrip
