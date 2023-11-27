import React, { useRef, useState } from 'react'
import SearchIcon from '../img/search.png'
import styled from 'styled-components'
import { EnvironmentOutlined } from '@ant-design/icons'

const IconImg = styled.img`
  width: 32px;
  height: 32px;
  background: none;
`
const MainBg = () => {
  const [active, setActive] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  var inputRef = useRef(null)
  const recommendations = {
    서울: '서울특별시',
    인천: '인천광역시',
    부산: '경상남도 부산',
    제주: '제주특별시',
    대구: '대구광역시',
  } // 추천 지역

  const handleBlur = () => {
    setTimeout(() => setActive(false), 100)
  }

  const handleClick = (key) => {
    console.log(key)
    inputRef.current.value = key
    setActive(false)
  }

  const handleInputChange = (event) => {
    const inputValue = event.target.value
    setSearchTerm(inputValue)
    if (inputValue && inputValue.length > 0) {
      setActive(true)
    } else {
      setActive(false)
    }
  }

  return (
    <>
      <div className="main">
        <div className="bg">
          <div className="main-int">
            <p className="main-intro">여행 어디가?</p>
            {/* <p className="main-intro-sub">Your Moment</p> */}
            {/* <p className="main-intro-txt">찾고 있는 장소가 있으신가요?</p>
            <p className="main-intro-txt-1">
              이미지 검색을 통해 원하는 장소를 찾고
            </p>
            <p className="main-intro-txt-2">여행을 계획해보세요</p> */}
          </div>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <div>
              <input
                type="text"
                className="bg-input"
                placeholder="지역명으로 검색"
                onFocus={() => setActive(true)}
                onBlur={() => handleBlur()}
                ref={inputRef}
                onChange={handleInputChange}
              />
            </div>
            {active && (
              <div className="recommend-container">
                {Object.keys(recommendations)
                  .filter((key) => key.includes(searchTerm))
                  .map((key, index) => (
                    <div
                      className="recommend"
                      key={index}
                      onMouseDown={(e) => {
                        e.preventDefault()
                      }}
                      onClick={() => handleClick(key)}
                    >
                      <div className="region-icon">
                        <EnvironmentOutlined style={{ fontSize: '15px' }} />
                      </div>

                      <div className="recommend1">{key}</div>
                      <div className="recommend2">{recommendations[key]}</div>
                    </div>
                  ))}
                {Object.keys(recommendations).filter((key) =>
                  key.includes(searchTerm)
                ).length === 0 && (
                  <div
                    className="recommend"
                    style={{ fontSize: '14px', fontWeight: '300' }}
                  >
                    해당하는 값이 존재하지 않습니다.
                  </div>
                )}
              </div>
            )}
            <div>
              <button type="submit" className="searchbtn">
                <IconImg src={SearchIcon} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainBg
