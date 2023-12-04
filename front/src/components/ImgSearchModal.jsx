import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import api from '../axios'
import { FaRegImage } from "react-icons/fa6";
import { Spinner } from 'react-bootstrap'

const ImgSearchModal = (props) => {
// 로딩 state
const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const [isDragging, setIsDragging] = useState(false)
  const [droppedImage, setDroppedImage] = useState(null)
  const [searchImg, setSearchImg] = useState(null)
  const [searchImgData, setSearchImgData] = useState(null)

  const handleDragEnter = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = e.dataTransfer.files
    setSearchImgData(droppedFiles[0])
    if (droppedFiles.length > 0) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const blob = new Blob([e.target.result])
        setSearchImg(blob)
        const urlCreator = window.URL || window.webkitURL
        const imageUrl = urlCreator.createObjectURL(blob)
        console.log(urlCreator, 'urlCreator')
        console.log(blob, 'blob')
        setDroppedImage(imageUrl)
        console.log(e.target.result, 'e.target.result]e.target.result]')
        console.log(e, 'e')
        console.log(blob, 'blob')
        console.log(imageUrl, 'imageUrl')
        console.log(droppedFiles[0], 'droppedFiles[0] droppedFiles[0]')
      }
      reader.readAsArrayBuffer(droppedFiles[0])
    }
  }
  useEffect(() => {
    if (!props.ImgSearchModal) {
      setDroppedImage(null)
      console.log(droppedImage)
    }
  }, [props.show])

  // 이미지 보내는 함수

  const searchSendImg = () => {
    setIsLoading(true)
    console.log('click@@@@@@@@@@@@')
    console.log(searchImg, 'searchImg searchImg')

    function blobToFile(theBlob, fileName) {
      // Blob의 MIME 타입을 가져옵니다.
      const type = theBlob.type

      // Blob에서 File 객체를 생성합니다.
      const file = new File([theBlob], fileName, { type })

      return file
    }

    // FormData 객체 생성
    const formData = new FormData()

    const searchImgFile = blobToFile(searchImg, searchImgData.name)
    formData.append('img', searchImgFile) // 'filename.ext'는 실제 파일 이름을 나타냅니다.
    formData.append('region_no', props.region_no*1000)
    formData.append('lng', props.center.lng)
    formData.append('lat', props.center.lat)

    // Axios를 사용하여 서버로 전송
    api
      .post('/search/img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('File uploaded successfully:', response.data)
        props.setCate({...props.cate, ['추천']:response.data.data})
        setIsLoading(false)
        props.onHide()
        props.handleClick()
        // 서버의 응답을 처리할 수 있습니다.
      })
      .catch((error) => {
        console.error('Error:', error)
        setIsLoading(false)
        // 오류가 발생했을 때의 처리를 추가할 수 있습니다.
      })
  }

  console.log(props, 'props props')
  return (
    <Modal {...props} centered animation={false} className="search-modal-wrap">
      <Modal.Body>
        <Container>
          <Row>
            <Col className="mt-3 mb-4 img-search-title text-center">
              사진으로 검색하는 여행지
            </Col>
          </Row>
          <Row>
            <Col>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`img-search-main d-flex justify-content-center align-items-center ${
                  isDragging ? 'dragging' : ''
                }`}
                style={{ backgroundColor: isDragging ? '#ABABAB' : '' }}
              >
                {droppedImage ? (
                  <img
                    src={droppedImage}
                    alt="Dropped"
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <style>
                    {`
                      .img-search-main::before {
                        content: 
                       '${isDragging ? '이미지 업로드하기!' : '이미지를 올려주세요!'}';
                        ${isDragging ? 'color: white': 'color: #6C6D6E'};
                        font-size: 20px;
                        font-weight: 500;
                      }
                    `}
                  </style>
                )}
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="text-muted text-center img-search-info">
              평소 저장해두었던 여행지 이미지를 올려주시면
              <br />
              인공지능 AI가 가장 유사한 장소를 찾아드립니다.
              <br />
              당신이 계획하는 여행 일정을 좀 더 쉽게 만들 수 있도록
              도와드릴게요!
            </Col>
          </Row>
          <Row className="mt-4">
            {/* <Col className=''> */}
            {droppedImage ? (
              <button
                onClick={searchSendImg}
                type="submit"
                className="list-btn2"
              >
               {
  isLoading 
    ? (
      <Row>
      <Col sm={5} className=" d-flex justify-content-end align-items-center">
        <Spinner animation="border" size="lg" variant="primary" />
      </Col>
      <Col sm={7} className="p-0 d-flex justify-content-start">
        <span className="align-items-center">검색중...</span>
      </Col>
    </Row>
    ) 
    : '검색 하기!'
}
              </button>
            ) : (
              ''
            )}

            {/* </Col> */}
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default ImgSearchModal