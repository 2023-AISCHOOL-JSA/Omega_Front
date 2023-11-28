import React from 'react'
import RegionCom from '../components/RegionCom'
import '../css/RegionInfo.css'
import RegionTop from '../components/RegionTop'
import RegionBest from '../components/RegionBest'

const RegionInfo = () => {
  return (
    <>
      <div className="content-body">
        {/* 상단 지역명 및 일정 생성 버튼 div */}
        <RegionTop />
        {/* 대표 장소 이미지 및 설명글 */}
        <RegionBest />
        {/* 자세한 지역 정보 */}
        <div className="reg-bot">
          <p className="reg-mini-title">
            구석구석 둘러보는 <span>제주</span>
          </p>
          <RegionCom />
          <p className="reg-mini-title">
            머무르기 좋은 <span>제주</span> 숙소
          </p>
          <RegionCom />

          <p className="reg-mini-title">
            <span>제주</span>에서 우리 뭐할까?
          </p>
          <RegionCom />
        </div>
      </div>
    </>
  )
}

export default RegionInfo
