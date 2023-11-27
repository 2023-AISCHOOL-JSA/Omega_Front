import React from 'react'
import Intro from '../img/down.jpg'
import Pig from '../img/pig.jpg'
const RegionBest = () => {
  return (
    <>
      <div className="reg-middle">
        <div className="reg-rep">
          <img src={Intro} alt="" className="reg-rep-img" />
          <div className="reg-rep-content">
            <div className="reg-rep-content-l">
              <p className="txt">여긴 꼭 둘러보세요!</p>
              <p className="place">#제주도올레길7코스</p>
            </div>
            <div className="reg-rep-content-r">
              <p className="explain">
                난이도가 조금 있지만 곳곳에 카페나 쉼터가
                <br />
                다른 올레길에 비해 많은 편이며 풍경이 예뻐
                <br /> 사람들이 가장 많이 찾는 코스이다
              </p>
            </div>
          </div>
        </div>

        <div className="reg-rep">
          <img className="reg-rep-img" src={Pig} alt="" />
          <div className="reg-rep-content">
            <div className="reg-rep-content-l">
              <p className="txt">이건 꼭 먹어보세요!</p>
              <p className="place">#제주 흑돼지</p>
            </div>
            <div className="reg-rep-content-r">
              <p className="explain">
                제주 흑돼지 삼겹살이 서울로 진출 한 후
                <br />
                인기를 끌며 '오겹살'이라는 메뉴의 원조가 되었으며
                <br />
                제주도에 오면 꼭 먹어야할 메뉴중에 하나이다
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegionBest
