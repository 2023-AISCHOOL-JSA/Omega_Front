import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const MyTrip = ({ plan }) => {
  const navigate = useNavigate()

  return (
    <>
      {plan ? (
        <div className="mydiv">
          <p className="travel-reg">{plan.plan_region} 여행</p>
          <p className="travel-date">
            {new Date(plan.started_date).toLocaleDateString()}~
            {new Date(plan.ended_date).toLocaleDateString()} |{' '}
            {(new Date(plan.ended_date) - new Date(plan.started_date)) /
              (1000 * 60 * 60 * 24)}
            박
            {(new Date(plan.ended_date) - new Date(plan.started_date)) /
              (1000 * 60 * 60 * 24) +
              1}
            일
          </p>
          <button
            className="more-btn"
            onClick={() => {
              navigate(`/create/${plan.plan_no}`)
            }}
          >
            <FontAwesomeIcon
              icon={faAngleRight}
              size="xl"
              style={{ color: '#000000' }}
            />
          </button>
        </div>
      ) : (
        <div className="mydiv">
          {' '}
          <p className="travel-date">여행이 없습니다.</p>
        </div>
      )}
    </>
  )
}

export default MyTrip
