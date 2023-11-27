import React from 'react'
import { Link } from 'react-router-dom'

const RegionTop = () => {
  return (
    <>
      <div className="reg-top">
        <p className="reg-title">제주특별자치도</p>
        <Link to="/make-plan">
          <button className="reg-plan">일정만들기</button>
        </Link>
      </div>
    </>
  )
}

export default RegionTop
