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

const MyTrip = () => {
  return (
    <>
      <div className="mydiv">
        <p className="travel-reg">제주 여행</p>
        <RightImg src={Right} />
        <p className="travel-date">2023.10.11~2023.10.12 | 1박2일</p>
      </div>

      <div className="mydiv">
        <p className="travel-reg">경주 여행</p>
        <RightImg src={Right} />
        <p className="travel-date">2023.10.11~2023.10.12 | 1박2일</p>
      </div>
    </>
  )
}

export default MyTrip
