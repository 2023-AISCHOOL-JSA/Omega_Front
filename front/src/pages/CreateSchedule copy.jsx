import React, { useEffect, useState } from 'react'
import { Map, CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk'
import { useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Draggable from 'react-draggable'
import { Col, Container, Row } from 'react-bootstrap'
const CreateSchedule = () => {
  const location = useLocation()
  const myList2 = location.state && location.state.myList1
  console.log(myList2, 'myList1 myList1')
  const [center, setCenter] = useState({ lat: 0, lng: 0 })
  const [level, setLevel] = useState(8) // 초기 레벨 설정

  // 드래그 영역관련
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 })

  const handleDrag = (e, ui) => {
    const { y } = deltaPosition
    setDeltaPosition({
      //   x: x + ui.deltaX,
      y: y + ui.deltaY,
    })
  }
  useEffect(() => {
    if (myList2 && myList2.length > 0) {
      // 모든 마커의 좌표를 포함하는 경계 사각형 계산
      let minLat = myList2[0].latlng.lat
      let maxLat = myList2[0].latlng.lat
      let minLng = myList2[0].latlng.lng
      let maxLng = myList2[0].latlng.lng

      myList2.forEach((marker) => {
        const { lat, lng } = marker.latlng
        minLat = Math.min(minLat, lat)
        maxLat = Math.max(maxLat, lat)
        minLng = Math.min(minLng, lng)
        maxLng = Math.max(maxLng, lng)
      })

      // 경계 사각형의 중심을 계산하여 지도의 중심으로 설정
      const newCenter = {
        lat: (minLat + maxLat) / 2,
        lng: (minLng + maxLng) / 2,
      }

      setCenter(newCenter)

      // 경계 사각형의 너비와 높이를 계산하여 줌 레벨 조정
      const latDelta = maxLat - minLat
      const lngDelta = maxLng - minLng

      // 모든 마커가 화면에 표시되도록 패딩 추가
      const padding = 0.1

      const zoomLevel = calculateZoomLevel(
        latDelta + padding,
        lngDelta + padding
      )

      setLevel(zoomLevel)
    }
  }, [myList2])

  const calculateZoomLevel = (latDelta, lngDelta) => {
    const MAX_ZOOM = 14
    const zoomLevel = Math.min(
      Math.floor(Math.log2(360 / lngDelta)) - 1,
      Math.floor(Math.log2(180 / latDelta)) - 1,
      MAX_ZOOM
    )
    return zoomLevel
  }

  // 휠 이벤트

  const handleWheel = (e) => {
    // 마우스 휠 이벤트 처리
    setDeltaPosition((prevDelta) => ({
      ...prevDelta,
      y: prevDelta.y - e.deltaY,
    }))
  }

  return (
    <div className="create-map-wrap" style={{ padding: '0px 10%' }}>
      <Draggable
        onDrag={handleDrag}
        axis="y"
        bounds={{ top: -500, bottom: 10 }}
        allowAnyClick={true}
        handle=".handle" // 이 부분을 추가합니다
      >
        <div className="scrollable-content " onWheel={handleWheel}>
          <Container className="create-page-content ps-5 pe-5">
            <Row className="mt-5">
              <Col>ㅇㅇㅇ님의 여행일정</Col>
              <Col>경주여행</Col>
              <Col>2023~10.11~ 2023.10.12</Col>
              <Col>1박 2일</Col>
              <Col>일정 가져오기</Col>
            </Row>
            <Row className="mt-5">
              {/* 최종데이터 map */}
              <Col style={{ borderBottom: `2px solid black` }}>day1</Col>
            </Row>
          </Container>
        </div>
      </Draggable>
      <Map
        id="map"
        center={center}
        style={{
          width: '100%',
          height: '60vh',
          borderRadius: '10px',
        }}
        level={level}
      >
        {myList2?.map((position, index) => (
          <React.Fragment key={uuidv4()}>
            <MapMarker
              clickable={true}
              position={position.latlng}
              title={position?.pla_name}
              image={{
                src: './img/invimage.png',
                size: {
                  width: 24,
                  height: 24,
                },
                options: {
                  offset: {
                    x: 11,
                    y: 10,
                  },
                },
              }}
            />
            <CustomOverlayMap zIndex={-99} position={position.latlng}>
              <div>
                <div
                  className="center"
                  style={{
                    fontWeight: 'bold',
                    fontSize: '10px',
                    color: 'white',
                    backgroundColor: `${position.bgColor.backgroundColor}`,
                    padding: '3px',
                    borderRadius: '50px',
                    width: '21px',
                    marginTop: '5px',
                    marginLeft: '3px',
                    textAlign: 'center',
                  }}
                >
                  {`${position.markerIndex}`}
                </div>
              </div>
            </CustomOverlayMap>
          </React.Fragment>
        ))}
      </Map>
    </div>
  )
}

export default CreateSchedule
