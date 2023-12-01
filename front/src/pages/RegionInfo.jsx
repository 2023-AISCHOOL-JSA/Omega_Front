import React, { useEffect } from 'react'
import RegionCom from '../components/RegionCom'
import '../css/RegionInfo.css'
import RegionTop from '../components/RegionTop'
import RegionBest from '../components/RegionBest'
import { useParams } from 'react-router-dom'
import api from '../axios'
import { useState } from 'react'

const RegionInfo = () => {
  const { region_no } = useParams()
  const [region, setRegion] = useState()

  useEffect(() => {
    api
      .get(`/region/${region_no}`)
      .then((res) => {
        setRegion(res.data.data)
        console.log(res.data.data)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <>
      <div className="content-body">
        {/* 상단 지역명 및 일정 생성 버튼 div */}
        <RegionTop region={region} />
        {/* 대표 장소 이미지 및 설명글 */}
        <RegionBest />
        {/* 자세한 지역 정보 */}
        <div className="reg-bot">
          <p className="reg-mini-title">
            구석구석 둘러보는 <span>{region?.region_name}</span>
          </p>
          <RegionCom />
          <p className="reg-mini-title">
            머무르기 좋은 <span>{region?.region_name}</span> 숙소
          </p>
          <RegionCom />

          <p className="reg-mini-title">
            <span>{region?.region_name}</span>에서 우리 뭐할까?
          </p>
          <RegionCom />
        </div>
      </div>
    </>
  )
}

export default RegionInfo
