import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io'
import api from '../axios'
const MakeModal = ({
  makePageModal,
  modalDataTemp,
  setMakePageModal,
  show1,
  cate,
  setCate,
  myWish,
  setMyWish,
}) => {
  // 하트 토글 관리 state
  const [heartToggle, setHeartToggle] = useState(
    myWish?.includes(Number(modalDataTemp?.pla_no)) ? true : false,
  )

  const modalRef = useRef(null)
  const PlaceName = useRef(null)
  const target = useRef(null)
  const [show, setShow] = useState()
  // useEffect(() => {
  //   console.log(modalRef)
  //   // document에 이벤트 리스너 추가
  //   const handleClickOutside = (event) => {
  //     // 모달 외부를 클릭하면 모달을 닫음
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       setMakePageModal(false)
  //     }
  //   }

  //   document.addEventListener('click', handleClickOutside)

  //   // 컴포넌트가 언마운트되면 이벤트 리스너 제거
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside)
  //   }
  // }, [setMakePageModal])

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

  const handleHeart = () => {
    const setWish = () => {
      console.log('위시리스트 등록')
      api
        .post(
          '/wish',
          { pla_no: modalDataTemp?.pla_no },
          {
            headers: { authorization: localStorage.getItem('jwtToken') },
          },
        )
        .then((res) => {
          console.log(res.data.data)
          setCate({
            ...cate,
            ['나의저장']: [...cate['나의저장'], modalDataTemp],
          })
          setMyWish([...myWish, Number(modalDataTemp?.pla_no)])
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const deleteWish = () => {
      console.log('위시리스트 제거')
      api
        .delete(`/wish/${modalDataTemp?.pla_no}`, {
          headers: { authorization: localStorage.getItem('jwtToken') },
        })
        .then((res) => {
          console.log(res.data.data)
          setCate({
            ...cate,
            ['나의저장']: [
              ...cate['나의저장'].filter(
                (item) => item.pla_no !== modalDataTemp?.pla_no,
              ),
            ],
          })
          let myWishArr = [...myWish]
          myWishArr.splice(myWishArr.indexOf(Number(modalDataTemp?.pla_no)), 1)
          setMyWish(myWishArr)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    if (heartToggle) {
      deleteWish()
    } else {
      setWish()
    }
    setHeartToggle(!heartToggle)
  }

  return (
    <Modal
      size="lg"
      show={show1}
      onHide={() => setMakePageModal(false)}
      centered
      animation={false}
    >
      <Container ref={modalRef}>
        <Row>
          <Col className="p-0">
            <div
              className="make-modal-close-btn"
              onClick={() => setMakePageModal(!makePageModal)}
            >
              X
            </div>
            <img
              className="make-modal-img"
              // style={{ width: '100%', borderRadius: '0px', height: '100%' }}
              src={`${process.env.REACT_APP_IMG_API_URL}${modalDataTemp?.img}`}
            ></img>
          </Col>
        </Row>

        <Container className="ps-4 pe-4 mb-4">
          <Row className="mt-4">
            <Col className="make-modal-title" ref={PlaceName}>
              {modalDataTemp?.pla_name}
              <span className="ms-2">{modalDataTemp?.pla_code_main}</span>
            </Col>
            {/* <Col></Col> */}
            <Col className="d-flex justify-content-end" sm={3}>
              <div
                className="d-flex align-items-center"
                style={{ display: 'inline-block' }}
              >
                <img
                  className="make-modal-search-img me-4"
                  src="https://clova-phinf.pstatic.net/MjAxODAzMjlfOTIg/MDAxNTIyMjg3MzM3OTAy.WkiZikYhauL1hnpLWmCUBJvKjr6xnkmzP99rZPFXVwgg.mNH66A47eL0Mf8G34mPlwBFKP0nZBf2ZJn5D4Rvs8Vwg.PNG/image.png"
                  onClick={handleNaverClick}
                />
              </div>
              <div
                className="d-flex align-items-center"
                style={{ display: 'inline-block' }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                  className="make-modal-search-img me-4"
                  onClick={handleGoogleClick}
                />
              </div>
            </Col>
            <Col sm={3} className="d-flex justify-content-end">
              {!heartToggle ? (
                <IoIosHeartEmpty onClick={handleHeart} className="heart-icon" />
              ) : (
                <IoMdHeart onClick={handleHeart} className="heart-icon" />
              )}
            </Col>
          </Row>
          <Row className="mt-2 make-modal-addr">
            <Col>
              {modalDataTemp?.region_main} {modalDataTemp?.region_sub}{' '}
              {modalDataTemp?.pla_addr}
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
            <Col>
              {['음식점', '카페'].includes(modalDataTemp?.pla_code_main)
                ? '대표메뉴'
                : '입장요금'}
            </Col>
            <Col>주차장</Col>
          </Row>

          <Row className="make-modal-detail">
            <Col>
              <p>{modalDataTemp?.pla_tel}</p>
            </Col>
            <Col>
              <p>
                {modalDataTemp?.pla_time
                  .replaceAll('<br />', '\n')
                  .replaceAll('<br>', '\n')
                  .split('\n')
                  .map((item) => (
                    <span>
                      {item}
                      <br />
                    </span>
                  ))}
              </p>
            </Col>
            <Col>
              <p>{modalDataTemp?.pla_price}</p>
            </Col>
            <Col>
              <p>
                {modalDataTemp?.pla_parking_yn === 'y' ? '주차가능' : '주차불가'}
              </p>
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
                padding: '20px',
                fontWeight: '400',
                lineHeight: '1.6rem',
                fontSize: '15px',
                color: '6D6D6D',
                opacity: '1',
                textAlign: 'left',
                maxHeight: '150px',
                overflow: 'hidden',
                overflowY: 'auto',
              }}
            >
              {modalDataTemp?.pla_info
                .replaceAll('<br />', '\n')
                .replaceAll('<br>', '\n')
                .split('\n')
                .map((item) => (
                  <span>
                    {item}
                    <br />
                  </span>
                ))}
            </Col>
          </Row>
        </Container>
      </Container>
    </Modal>
  )
}

export default MakeModal
