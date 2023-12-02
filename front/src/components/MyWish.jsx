import React, { useState } from 'react'
import Heart from '../img/fillh.png'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'
import api from '../axios'

const HeartImg = styled.img`
  width: 25px;
  height: 30px;
`
const MyWish = ({ wish }) => {
  const [heart, setHeart] = useState(false)

  const setWish = () => {
    console.log('위시리스트 등록')
    api
      .post(
        '/wish',
        { pla_no: wish.pla_no },
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

  const deleteWish = () => {
    console.log('위시리스트 제거')
    api
      .delete(`/wish/${wish.pla_no}`, {
        headers: { authorization: localStorage.getItem('jwtToken') },
      })
      .then((res) => {
        console.log(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleHeart = () => {
    if (!heart) {
      setWish()
    } else {
      deleteWish()
    }
    setHeart(!heart)
  }

  return (
    <>
  {wish ?  <div className="wishlist">
        <p className="wishlist-name">{wish.pla_name}</p>
        <p className="wishlist-address">
          {wish.sd_nm} {wish.region_sub} {wish.pla_addr}
        </p>
        <span onClick={handleHeart} className="wish-heart">
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
        </span>
      </div>: <div className="wishlist">위시리스트가 비어있습니다.</div>}

     
    </>
  )
}

export default MyWish
