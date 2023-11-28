import React, { useState } from 'react'
import Heart from '../img/fillh.png'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'

const HeartImg = styled.img`
  width: 25px;
  height: 30px;
`
const MyWish = () => {
  const [heart, setHeart] = useState(false)

  const handleHeart = () => {
    setHeart(!heart)
  }

  return (
    <>
      <div className="wishlist">
        <p className="wishlist-name">orrn</p>
        <p className="wishlist-address">
          제주특별자치도 서귀포시 성산읍 해안로
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
      </div>
    </>
  )
}

export default MyWish
