import React, { useEffect, useRef, useState } from 'react'
import { Overlay, Tooltip } from 'react-bootstrap'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'

const MakeModal = ({ makePageModal, modalDataTemp, setMakePageModal }) => {
  const modalRef = useRef(null)
  const PlaceName = useRef(null)
  const target = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    console.log(modalRef)
    // document에 이벤트 리스너 추가
    const handleClickOutside = (event) => {
      // 모달 외부를 클릭하면 모달을 닫음
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setMakePageModal(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [setMakePageModal])

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
  return (
    <div className="make-page-modal">
      <Container className="make-page-modal-1" ref={modalRef}>
        <Row>
          <Col className="p-0">
            <div
              className="make-modal-close-btn"
              onClick={() => setMakePageModal(!makePageModal)}
            >
              X
            </div>
            <img
              style={{ width: '100%', borderRadius: '5px', height: '330px' }}
              src={modalDataTemp.img}
            ></img>
          </Col>
        </Row>

        <Container className="ps-4 pe-4">
          <Row className="mt-3">
            <Col className="make-modal-title" ref={PlaceName}>
              {modalDataTemp.pla_name}
              <span className="ms-2">{modalDataTemp.pla_code_main}</span>
            </Col>
            {/* <Col></Col> */}
            <Col>
              <p className="domain" onClick={handleNaverClick}>
                네이버
              </p>
            </Col>
            <Col>
              <p className="domain" onClick={handleGoogleClick}>
                구글
              </p>
            </Col>
          </Row>
          <Row className="mt-2  make-modal-addr">
            <Col>
              {modalDataTemp.region_sub} {modalDataTemp.pla_addr}
              <button
                ref={target}
                className="copy-btn ms-3"
                onClick={() => setShow(!show)}
              >
                주소복사
              </button>
            </Col>
          </Row>

          <Row className="mt-3 make-modal-detail">
            <Col>연락처</Col>
            <Col>운영시간</Col>
            <Col>입장요금</Col>
            <Col>주차장</Col>
            <Col>키즈 펫존</Col>
          </Row>

          <Row className="make-modal-detail">
            <Col>
              <p>{modalDataTemp.pla_tel}</p>
            </Col>
            <Col>
              <p>{modalDataTemp.pla_time}</p>
            </Col>
            <Col>
              <p>{modalDataTemp.pla_price}</p>
            </Col>
            <Col>
              <p>{modalDataTemp.pla_parking_yn}</p>
            </Col>
            <Col>
              <p>{modalDataTemp.region_sub}</p>
            </Col>
          </Row>
          <Row className="mt-3 make-modal-info">
            <Col>장소소개</Col>
          </Row>

          <Row
            className="mt-2 make-modal-info"
            style={{
              // height: '100px',
              padding: '0px 10px',
            }}
          >
            <Col
              style={{
                backgroundColor: '#eeeeee',
                borderRadius: '15px',
                padding: '25px',
                fontWeight: '400',
                lineHeight: '1.6rem',
                fontSize: '15px',
                color: '6D6D6D',
                opacity: '1',
                textAlign: 'left',
              }}
            >
              <div>{modalDataTemp.pla_info}</div>
            </Col>
          </Row>
          <div style={{ height: '40px' }}></div>
        </Container>
      </Container>
    </div>
  )
}

export default MakeModal

//    <Row className="mt-3 make-modal-detail">
// <Col>연락처</Col>
// <Col>운영시간</Col>
// <Col>입장요금</Col>
// <Col>주차장</Col>
// <Col>키즈 펫존</Col>
// </Row>

// <Row className=" make-modal-detail">
// <Col>
//   <p>{modalDataTemp.pla_tel}</p>
// </Col>
// <Col>
//   <p>{modalDataTemp.pla_time}</p>
// </Col>
// <Col>
//   <p>{modalDataTemp.pla_price}</p>
// </Col>
// <Col>
//   <p>{modalDataTemp.pla_parking_yn}</p>
// </Col>
// <Col>
//   <p>{modalDataTemp.region_sub}</p>
// </Col>
// </Row>

{
  /* <Row className="mt-3 make-modal-detail">
<Col>
  연락처<p>{modalDataTemp.pla_tel}</p>
</Col>
<Col>
  운영시간<p>{modalDataTemp.pla_time}</p>
</Col>
<Col>
  입장요금<p>{modalDataTemp.pla_price}</p>
</Col>
<Col>
  주차장<p>{modalDataTemp.pla_parking_yn}</p>
</Col>
<Col>
  키즈 펫존<p>{modalDataTemp.region_sub}</p>
</Col>
</Row>
<Row className="mt-3 make-modal-info"> */
}
