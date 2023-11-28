import React, { useState } from 'react'
import Dormitory from '../img/dormitory.jpg'
import styled from 'styled-components'
import RegionModal from './RegionModal'
import M1 from '../img/m1.jpg'
import M3 from '../img/pup.jpg'
import M4 from '../img/m4.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'

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

const RegionCom = () => {
  const [showModal, setShowModal] = useState(false)
  const [heart, setHeart] = useState(false)

  const handleHeart = () => {
    setHeart(!heart)
  }

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <div className="reg-div">
        <DivCard className="reg-info">
          <img src={M1} alt="" onClick={handleShowModal} />
          <p>orrn</p>
          <span>제주특별자치도 서귀포시 성산읍 해맞이해안로</span>
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
          <img src={M3} alt="" onClick={handleShowModal} />
          <p>제주 약수터</p>
          <span>제주특별자치도 서귀포시 중앙로 35</span>
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
          <img src={M4} alt="" onClick={handleShowModal} heart={setHeart} />
          <p>고흐의 정원</p>
          <span>제주 서귀포시 성산읍 삼달신풍로 126-5</span>
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
      {showModal && <RegionModal onClose={handleCloseModal} />}
    </>
  )
}

export default RegionCom
