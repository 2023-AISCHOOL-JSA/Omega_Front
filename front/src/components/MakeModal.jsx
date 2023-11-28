import React, { useRef, useState } from 'react'
import { Modal, Carousel, Overlay, Tooltip } from 'react-bootstrap'
import M2 from '../img/m2.jpg'
import M1 from '../img/m1.jpg'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'

import '../css/Common.css'

const ImgSet = styled.img`
  height: 500px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`

const MakeModal = ({ onClose, data }) => {
  const [lgShow, setLgShow] = useState(true)
  const [show, setShow] = useState(false)
  const [heart, setHeart] = useState(false)
  const target = useRef(null)
  const PlaceName = useRef(null)

  const handleHeart = () => {
    setHeart(!heart)
  }

  // 네이버 검색 이벤트 핸들러
  const handleNaverClick = () => {
    if (PlaceName.current) {
      const url = `https://search.naver.com/search.naver?query=${PlaceName.current.textContent}`
      window.open(url, '_blank')
    }
  }

  // 구글 검색 이벤트 핸들러
  const handleGoogleClick = () => {
    if (PlaceName.current) {
      const url = `https://www.google.com/search?q=${PlaceName.current.textContent}`
      window.open(url, '_blank')
    }
  }
  const handleClose = () => {
    onClose && onClose()
  }

  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
        centered="true"
      >
        <Carousel
          style={{ borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }}
        >
          <Carousel.Item>
            <ImgSet className="d-block w-100" src={M2} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <ImgSet className="d-block w-100" src={M1} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <ImgSet className="d-block w-100" src={M2} alt="Third slide" />
          </Carousel.Item>
        </Carousel>
        <Modal.Body>
          <div className="modal-con">
            <div className="con-first">
              <p className="place-name-mod" ref={PlaceName}>
                {data.pla_name}
              </p>
              <div className="category">{data.code_main}</div>{' '}
              <p className="domain" onClick={handleNaverClick}>
                네이버 1,110
              </p>{' '}
              <p className="domain" onClick={handleGoogleClick}>
                구글 805
              </p>
              {/* <p onClick={handleHeart} className="heart">
                {heart ? (
                  <FontAwesomeIcon
                    icon={faSolidHeart}
                    size="lg"
                    style={{ color: '#ff000d' }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faRegularHeart}
                    size="lg"
                    style={{ color: '#ff000d' }}
                  />
                )}
              </p> */}
              <Link to="/make-plan">
                <button className="mk-plan">일정 만들기</button>
              </Link>
            </div>

            <div className="con-second">
              <p className="address">{data.pla_addr}</p>
              <button
                ref={target}
                className="copy-btn"
                onClick={() => setShow(!show)}
              >
                주소복사
              </button>

              <Overlay target={target.current} show={show} placement="bottom">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    복사됨
                  </Tooltip>
                )}
              </Overlay>
            </div>

            <div className="modal-info">
              <div>
                <span className="coll">연락처</span>{' '}
                <span className="coll-con">{data.pla_tel}</span>
              </div>
              <div>
                <span className="coll">운영시간</span>{' '}
                <span className="coll-con"></span>
              </div>
              <div>
                <span className="coll">주차장</span>{' '}
                <span className="coll-con">{data.pla_parking_yn}</span>
              </div>
              <div>
                <span className="coll">휴무일</span>{' '}
                <span className="coll-con"></span>
              </div>
            </div>
            {/* 숙소
            <p className="title">숙소 소개</p>
            <div className="modal-txt">
              학교법인 건국대학교는 식민지로 전락한 조국 땅에서 구료제민과
              의료보국의 정신을 펼치기 위해 1931년에 민중병원을 설립하신 상허
              유석창 박사께서 이 병원을 모태로 하여 교육을 통한 구국의 일념으로
              1946년에 본교를 세우신 이래 빛나는 전통을 면면히 이어오고
              있습니다.성·신·의의 교시아래 참된 복지 문화 국가의 건설에 앞장서는
              유능한 인재들을 양성하는 등, 국가와 사회의 발전에 중요하고 보람
              있는 역할을 충실히 수행해 왔습니다.서울, 충주의 2개 캠퍼스 및
              2개의 대학 부속학교를 운영하고 있습니다.
            </div>

            <p className="title">이용안내</p>
            <div className="modal-txt">
              카페테리아 - 기숙사 레이크홀 1층에 위치 <br />
              200명 동시 식사 가능, 특식 가능 (별도 협의) <br />
              커피 및 각종 음료 판매 카페테리아, 편의점, 세탁소, 분식점,
              퓨전레스토랑, 문구점, 미용실, 은행ATM, 강의실
              <br />
              <br />
              강의장 <br /> - 소강의장 8개(12명) 220,000원 / 중강의장 4개(70명)
              770,000원 / 대강의장 1개(120명-진행실무료제공) 990,000원 /
              국제회의실 1개(200명) 별도 <br />
              <br />
              식사 <br />- 일반식(조,중,석식) 5,000원 / 특식(별도문의)
              8,000~10,000원
            </div>

            <p className="title">오시는 길 안내</p>
            <div className="modal-txt">
              지하철 이용 시 - 2호선 건대입구역 2번 출구 / 7호선 건대입구역 4번
              출구 / 7호선 어린이대공원역 3번 출구
              <br /> 버스 이용 시 - 건대입구역 240, 721, 2222, 2223, 2224 <br />
              <br /> - 건국대학교 앞 302, 3216 <br /> - 건국대학교 앞 2223,
              2224, 3220 <br /> - 건국대학교 병원 240, 721, 2222, 3220, 4212
            </div> */}

            {/* 숙소가 아닌 모든 장소 */}
            <p className="title">매장 소개</p>
            <div className="modal-txt">{data.pla_detail}</div>

            {/* <p className="title">상세정보</p>
            <div className="modal-txt">pla_detail</div> */}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default MakeModal
