import React from 'react'
import { useNavigate } from 'react-router-dom'

const RegionTop = ({ region }) => {
  const navigate = useNavigate()

  const handelClick = () => {
    console.log(region,'dfjowejfiew');
    navigate('/plan/new', {
      state: {
        region_name: region.region_name,
        latlng: { lat: region.lat, lng: region.lng },
        region_no: region.region_no,
      },
    })
  }

  return (
    <>
      <div className="reg-top">
        <p className="reg-title">{region?.sgg_nm}</p>
        <button className="reg-plan" onClick={handelClick}>
          일정만들기
        </button>
      </div>
    </>
  )
}

export default RegionTop
