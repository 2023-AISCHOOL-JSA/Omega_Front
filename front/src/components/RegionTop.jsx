import React from 'react'
import { useNavigate } from 'react-router-dom'

const RegionTop = () => {
  const navigate = useNavigate()

  const handelClick = () => {
    navigate('/plan', { state: { value: '제주' } })
  }

  return (
    <>
      <div className="reg-top">
        <p className="reg-title">sd_nm</p>
        <button className="reg-plan" onClick={handelClick}>
          일정만들기
        </button>
      </div>
    </>
  )
}

export default RegionTop
