import React, { useState } from 'react'
import RegionCom from '../components/RegionCom'
import '../css/RegionInfo.css'
import RegionTop from '../components/RegionTop'
import RegionBest from '../components/RegionBest'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import Domi from '../img/dormitory.jpg'
import Domi1 from '../img/domi1.png'
import Domi2 from '../img/domi2.png'
import Mui from '../img/mui.jpg'
import Hor from '../img/hor.jpg'

const DivCard = styled.div`
  width: 300px;
  height: 300px;

  img {
    width: 100%;
    height: 250px;
    border-radius: 10px;
    cursor: pointer;
  }
  p {
    font-size: 1.2rem;
    font-family: omnigothic, sans-serif;
    font-style: normal;
    font-weight: 400;
    margin-left: 5px;
    margin-top: 10px;
    margin-bottom: 0;
  }
  span {
    font-size: 0.8rem;
    font-family: omnigothic, sans-serif;
    font-style: normal;
    font-weight: 300;
    margin-left: 5px;
  }
`

const RegionInfo = () => {
  const [heart, setHeart] = useState(false)

  const handleHeart = () => {
    setHeart(!heart)
  }
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
          <div
            style={{
              display: 'flex',
              gap: '100px',
              marginBottom: '100px',
              marginTop: '40px',
            }}
          >
            <DivCard className="reg-info">
              <img src={Domi} alt="" />
              <p>제주대학교</p>
              <span>제주 제주시 아라일동 제주대학로 102 제주대학교</span>
              <p onClick={handleHeart} className="heart-card">
                {heart ? (
                  <FontAwesomeIcon
                    icon={faSolidHeart}
                    size="xl"
                    style={{ color: '#ff000d' }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faRegularHeart}
                    size="xl"
                    style={{ color: '#ff000d' }}
                  />
                )}
              </p>
            </DivCard>

            <DivCard className="reg-info">
              <img src={Domi1} alt="" />
              <p>제주국제대학교</p>
              <span>제주 제주시 516로 2870</span>
              <p onClick={handleHeart} className="heart-card">
                {heart ? (
                  <FontAwesomeIcon
                    icon={faSolidHeart}
                    size="xl"
                    style={{ color: '#ff000d' }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faRegularHeart}
                    size="xl"
                    style={{ color: '#ff000d' }}
                  />
                )}
              </p>
            </DivCard>

            <DivCard className="reg-info">
              <img src={Domi2} alt="" heart={setHeart} />
              <p>제주대학교 사라캠퍼스</p>
              <span>제주특별자치도 제주시 일주동로 61</span>
              <p onClick={handleHeart} className="heart-card">
                {heart ? (
                  <FontAwesomeIcon
                    icon={faSolidHeart}
                    size="xl"
                    style={{ color: '#ff000d' }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faRegularHeart}
                    size="xl"
                    style={{ color: '#ff000d' }}
                  />
                )}
              </p>
            </DivCard>
          </div>

          <p className="reg-mini-title">
            <span>제주</span>에서 우리 뭐할까?
          </p>
          <div
            style={{
              display: 'flex',
              gap: '100px',
              marginBottom: '100px',
              marginTop: '40px',
            }}
          >
            <DivCard className="reg-info">
              <img src={Mui} alt="" />
              <p>수풍석 뮤지엄</p>
              <span>제주 서귀포시 안덕면 산록남로762번길 79</span>
              <p onClick={handleHeart} className="heart-card">
                {heart ? (
                  <FontAwesomeIcon
                    icon={faSolidHeart}
                    size="xl"
                    style={{ color: '#ff000d' }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faRegularHeart}
                    size="xl"
                    style={{ color: '#ff000d' }}
                  />
                )}
              </p>
            </DivCard>

            <DivCard className="reg-info">
              <img
                src="https://naverbooking-phinf.pstatic.net/20230824_143/1692846008169HzTBT_JPEG/2.jpg"
                alt=""
              />
              <p>윈드1947 테마파크</p>
              <span>제주 서귀포시 토평공단로 78-27</span>
              <p onClick={handleHeart} className="heart-card">
                {heart ? (
                  <FontAwesomeIcon
                    icon={faSolidHeart}
                    size="xl"
                    style={{ color: '#ff000d' }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faRegularHeart}
                    size="xl"
                    style={{ color: '#ff000d' }}
                  />
                )}
              </p>
            </DivCard>

            <DivCard className="reg-info">
              <img src={Hor} alt="" heart={setHeart} />
              <p>승마체험</p>
              <span>제주 제주시 구좌읍 번영로 2015 송당승마장</span>
              <p onClick={handleHeart} className="heart-card">
                {heart ? (
                  <FontAwesomeIcon
                    icon={faSolidHeart}
                    size="xl"
                    style={{ color: '#ff000d' }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faRegularHeart}
                    size="xl"
                    style={{ color: '#ff000d' }}
                  />
                )}
              </p>
            </DivCard>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegionInfo
