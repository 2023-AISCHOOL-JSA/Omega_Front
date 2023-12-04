import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import RegionModal from './RegionModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'
import { WishContext } from '../context/WishContext'
import api from '../axios'

const DivCard = styled.div`
  width: 300px;

  img {
    width: 100%;
    height: 250px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
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

const RegionCom = ({ placeList }) => {
  const [showModal, setShowModal] = useState(false)
  const [hearts, setHearts] = useState({})
  const { addWish, removeWish } = useContext(WishContext)


  const setWish = (pla_no) => {
    console.log('위시리스트 등록')
    api
      .post(
        '/wish',
        { pla_no: pla_no },
        {
          headers: { authorization: localStorage.getItem('jwtToken') },
        },
      )
      .then((res) => {
        console.log(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteWish = (pla_no) => {
    console.log('위시리스트 제거')
    api
      .delete(`/wish/${pla_no}`, {
        headers: { authorization: localStorage.getItem('jwtToken') },
      })
      .then((res) => {
        console.log(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleHeart = (pla_no) => {
    const newHearts = { ...hearts, [pla_no]: !hearts[pla_no] }
    setHearts(newHearts)

    if (newHearts[pla_no]) {
      addWish(pla_no)
      setWish(pla_no)
    } else {
      removeWish(pla_no)
      deleteWish(pla_no)
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
        {placeList?.map((item) => (
          <DivCard
            className="reg-info"
            key={item.pla_no}
          >
            <img
              src={`${process.env.REACT_APP_IMG_API_URL}${item.img_original_name}`}
              alt=""
            />
            <p className='p-2 fw-bold'>{item.pla_name}</p>
            <span className='p-2 mb-3'>{item.region_sub} {item.pla_addr}</span>
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
        {showModal && <RegionModal onClose={handleCloseModal} />}
      </div>
    </>
  )
}

export default RegionCom
