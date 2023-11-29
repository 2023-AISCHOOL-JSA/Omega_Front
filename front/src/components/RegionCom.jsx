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
  const [data, setData] = useState([])

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
          <DivCard className="reg-info" key={item.id} onClick={handleShowModal}>
            <img src={item.image} alt="" />
            <p>{item.name}</p>
            <span>{item.address}</span>
            <p onClick={() => handleHeart(item.id)} className="heart-card">
              {hearts[item.id] ? (
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
