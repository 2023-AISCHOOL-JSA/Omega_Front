import React from 'react'
import styled from 'styled-components'
import '../css/Main.css'
import MainBg from '../components/MainBg'
import MainCard from '../components/MainCard'

const MainCon = styled.div`
  h2 {
    font-family: omnigothic, sans-serif;
    font-style: normal;
    font-weight: 600;
    text-align: center;
    margin-top: 40px;
  }
  p {
    font-family: omnigothic, sans-serif;
    font-style: normal;
    font-weight: 300;
    text-align: center;
    color: gray;
  }
`
const Main = () => {
  return (
    <>
      {/* 메인 배너 */}

      <MainBg />

      {/* 유명인들의 여행 일정 */}
      <div className="content-body">
        <MainCon className="main-content">
          <h2>여행 고수들의 여행기</h2>
          <p>인플루언서들이 직접 다녀온 여행지를 따라가보세요.</p>
        </MainCon>

        {/* 일정 카드 */}
        <div className="main-card">
          <MainCard />
        </div>
      </div>
    </>
  )
}

export default Main
