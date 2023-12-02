import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const MyVisitedTrip = ({ plan }) => {
  const navigate = useNavigate()

  return (
    <>
      {plan ? (
        <div
          className="mydiv"
          style={{
            backgroundColor: '#fff6d8',
            border: 'none',
            boxShadow: 'box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.05);',
          }}
        >
          <p className="travel-date">
            {new Date(plan.started_date).toLocaleDateString()}~
            {new Date(plan.ended_date).toLocaleDateString()} |{' '}
            {(new Date(plan.ended_date) - new Date(plan.started_date)) /
              (1000 * 60 * 60 * 24)}
            일
          </p>
          <button
            className="more-btn"
            onClick={() => {
              navigate(`/plan/${plan.plan_no}`)
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
        <div
          className="mydiv"
          style={{
            backgroundColor: '#fff6d8',
            border: 'none',
            boxShadow: 'box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.05);',
          }}
        >
          <p className="travel-date">플랜이 없습니다.</p>
        </div>
      )}
    </>
  )
}

export default MyVisitedTrip
