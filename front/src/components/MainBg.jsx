import React, { useEffect, useRef, useState } from 'react'
import SearchIcon from '../img/search.png'
import styled from 'styled-components'
import { EnvironmentOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import api from '../axios'

const IconImg = styled.img`
  width: 30px;
  height: 30px;
  background: none;
`
const MainBg = () => {
  const [active, setActive] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  var inputRef = useRef(null)
  const navigate = useNavigate()

  // 연관 지역 검색어 리스트
  const [recommendations, setRecommendations] = useState([])

  // 넘어갈 지역 코드
  const [region_cd, setRegion_cd] = useState()

  const handleBlur = () => {
    setTimeout(() => setActive(false), 100)
  }

  const handleClick = (obj) => {
    console.log(obj)
    inputRef.current.value = obj.sd_nm
    setRegion_cd(obj.sgg_cd)
    setSearchTerm(obj.sd_nm)
    setActive(false)
  }

  const handlePage = () => {
    if (!region_cd) {
      alert('여행 하고 싶은 지역을 입력하세요')
    } else {
      navigate(`/info/${region_cd}`)
    }
  }

  const handleInputChange = (event) => {
    const inputValue = event.target.value
    if (inputValue.length >= 2 || inputValue.length == 0) {
      setSearchTerm(inputValue)
    }
    setActive(true)
  }

  useEffect(() => {
    api.get(`/region?keyword=${searchTerm}`).then((res) => {
      console.log(res.data.data)
      setRecommendations(res.data.data)
    })
  }, [searchTerm])

  return (
    <>
      <div className="main">
        <div className="bg">
          <div className="main-int">
            <p className="main-intro">여행 어디가?</p>
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
                      onClick={() => handleClick(recommendations[key])}
                    >
                      <div className="region-icon">
                        <EnvironmentOutlined style={{ fontSize: '15px' }} />
                      </div>

                      <div className="recommend1">
                        {recommendations[key].sd_nm}
                      </div>
                      <div className="recommend2">
                        {recommendations[key].full_nm}
                      </div>
                    </div>
                  ))}
                {Object.keys(recommendations).filter((key) =>
                  key.includes(searchTerm),
                ).length === 0 && (
                  <div
                    className="recommend"
                    style={{
                      fontSize: '14px',
                      fontWeight: '550',
                      paddingTop: '20px',
                      paddingLeft: '10px',
                    }}
                  >
                    해당하는 값이 존재하지 않습니다.
                  </div>
                )}
              </div>
            )}
            <div>
              {/* 지역소개 페이지로 넘길 값 sd_nm */}
              <button type="submit" className="searchbtn" onClick={handlePage}>
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
