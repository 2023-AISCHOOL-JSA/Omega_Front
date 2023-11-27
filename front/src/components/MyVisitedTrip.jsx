import React from 'react'
import Right from '../img/right.png'
import styled from 'styled-components'

const RightImg = styled.img`
  width: 18px;
  height: 18px;
  position: absolute;
  right: 7%;
  top: 40%;
  filter: opacity(0.4);
  cursor: pointer;
`

const MyVisitedTrip = () => {
  return (
    <>
      <div
        className="mydiv"
        style={{
          backgroundColor: '#fff6d8',
          border: 'none',
          boxShadow: 'box-shadow: 2.5px 2.5px 5px 0 rgba(0, 0, 0, 0.05);',
        }}
      >
        <p className="travel-reg">여수 여행</p>
        <RightImg src={Right} />
        <p className="travel-date">2023.09.21~2023.09.21 | 1일</p>
      </div>

      <div
        className="mydiv"
        style={{
          backgroundColor: '#fff6d8',
          border: 'none',
          boxShadow: 'box-shadow: 2.5px 2.5px 5px 0 rgba(0, 0, 0, 0.05);',
        }}
      >
        <p className="travel-reg">속초 여행</p>
        <RightImg src={Right} />
        <p className="travel-date">2023.08.02~2023.08.04 | 2박3일</p>
      </div>

      <div
        className="mydiv"
        style={{
          backgroundColor: '#fff6d8',
          border: 'none',
          boxShadow: 'box-shadow: 2.5px 2.5px 5px 0 rgba(0, 0, 0, 0.05);',
        }}
      >
        <p className="travel-reg">울산 부산 여행</p>
        <RightImg src={Right} />
        <p className="travel-date">2023.02.04~2023.02.08 | 4박5일</p>
      </div>
    </>
  )
}

export default MyVisitedTrip
