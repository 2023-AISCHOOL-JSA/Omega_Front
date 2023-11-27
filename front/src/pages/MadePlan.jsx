import React from 'react'
import '../css/MadePlan.css'
import Youtube from '../img/youtube.png'
const MadePlan = () => {
  return (
    <>
      {/* 지도 */}
      <div className="made-map"></div>
      {/* 일정 */}
      <div className="made-date">
        <div className="made-date-plan"></div>
        <div className="youtube">
          <img src={Youtube} alt="" />
          <p>유튜브 영상 보러가기</p>
        </div>
      </div>
    </>
  )
}

export default MadePlan
