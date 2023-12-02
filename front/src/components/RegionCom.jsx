import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import RegionModal from './RegionModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'
import { WishContext } from '../context/WishContext'

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
  const [hearts, setHearts] = useState({})
  const { addWish, removeWish } = useContext(WishContext)
  const [data, setData] = useState([
  //   {
  //     pla_no: 4211,
  //     image: '',
  //     pla_name: '맥퀸즈바',
  //     pla_addr: '부산 기장군 기장읍 기장해안로 268-32',
  //   },
  //   {
  //     pla_no: 4212,
  //     image: '',
  //     pla_name: '밀락더마켓',
  //     pla_addr: '부산 수영구 민락수변로17번길 56',
  //   },
  //   {
  //     pla_no: 4212,
  //     image: '',
  //     pla_name: '밀락더마켓',
  //     pla_addr: '부산 수영구 민락수변로17번길 56',
  //   },
  //   {
  //     pla_no: 4213,
  //     image: '',
  //     pla_name: '선유도원',
  //     pla_addr: '부산 금정구 상현로 64',
  //   },
  //   {
  //     pla_no: 4214,
  //     image: '',
  //     pla_name: '송도 해상 케이블카',
  //     pla_addr: '부산 서구 송도해변로 171',
  //   },
  //   {
  //     pla_no: 4215,
  //     image: '',
  //     pla_name: '수변최고돼지국밥',
  //     pla_addr: '부산 서구 송도해변로 171',
  //   },
  //   {
  //     pla_no: 4216,
  //     image: '',
  //     pla_name: '코랄라니',
  //     pla_addr: '부산 해운대구 청사포로 116 청사포정거장',
  //   },
  //   {
  //     pla_no: 4217,
  //     image: '',
  //     pla_name: '해운대 블루라인 파크',
  //     pla_addr: '부산 해운대구 청사포로 116 청사포정거장',
  //   },
  //   {
  //     pla_no: 4218,
  //     image: '',
  //     pla_name: '흰여울 해안터',
  //     pla_addr: '부산 영도구 영선동4가 1210-38',
  //   },
  ])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('url')
      const data = await response.json()
      setData(data)
    }
    fetchData()
  }, [])

  const handleHeart = (id) => {
    const newHearts = { ...hearts, [id]: !hearts[id] }
    setHearts(newHearts)

    if (newHearts[id]) {
      addWish(id)
    } else {
      removeWish(id)
    }
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
        {data.map((item) => (
          <DivCard
            className="reg-info"
            key={item.pla_no}
            onClick={handleShowModal}
          >
            <img src={item.image} alt="" />
            <p>{item.pla_name}</p>
            <span>{item.pla_addr}</span>
            <p onClick={() => handleHeart(item.pla_no)} className="heart-card">
              {hearts[item.pla_no] ? (
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
        ))}
      </div>
      {showModal && <RegionModal onClose={handleCloseModal} />}
    </>
  )
}

export default RegionCom
