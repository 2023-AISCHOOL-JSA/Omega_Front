import React from 'react'
import Heart from '../img/fillh.png'
import styled from 'styled-components'

const HeartImg = styled.img`
  width: 25px;
  height: 30px;
`
const MyWish = () => {
  return (
    <>
      <div className="wishlist">
        <p className="wishlist-name">orrn</p>
        <p className="wishlist-address">
          제주특별자치도 서귀포시 성산읍 해안로
          <HeartImg
            src={Heart}
            alt=""
            style={{ marginLeft: '10px', paddingBottom: '5px' }}
          />
        </p>
      </div>

      <div className="wishlist1">
        <p className="wishlist-name">수풍석 뮤지엄</p>
        <p className="wishlist-address">
          제주 서귀포시 안덕면 산록남로762번길
          <HeartImg
            src={Heart}
            alt=""
            style={{ marginLeft: '10px', paddingBottom: '5px' }}
          />
        </p>
      </div>

      <div className="wishlist2">
        <p className="wishlist-name">여수카페하멜</p>
        <p className="wishlist-address">
          전남 여수시 하멜로 94-1 3층~5층
          <HeartImg
            src={Heart}
            alt=""
            style={{ marginLeft: '10px', paddingBottom: '5px' }}
          />
        </p>
      </div>
    </>
  )
}

export default MyWish
