import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Map,
  CustomOverlayMap,
  MapMarker,
  Polyline,
} from 'react-kakao-maps-sdk'
import { useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Draggable from 'react-draggable'
import { Col, Container, Row } from 'react-bootstrap'
const CreateSchedule = () => {
  const { kakao } = window
  // 데이터 꺼내기
  const location = useLocation()
  const lastMakePlan2 = location.state && location.state.lastMakePlan1
  const myList2 = location.state && location.state.myList1
  const dateRange212 = location.state && location.state.dateRange21
  const dateRange312 = location.state && location.state.dateRange31
  const days2 = location.state && location.state.days1
  const region_name2 = location.state && location.state.region_name1
  const newText2 = location.state && location.state.newText1

  console.log(myList2, 'myList1 myList1')
  console.log(lastMakePlan2, 'lastMakePlan2 lastMakePlan2')

  const [center, setCenter] = useState({ lat: 0, lng: 0 })
  const [level, setLevel] = useState(8) // 초기 레벨 설정 (크게 의미X)
  const [markerList, setMarkerList] = useState([]) // 초기 레벨 설정
  const [myList3, setMyList3] = useState([]) // 초기 레벨 설정

  // 지도 마커 위치센터 조정
  const mapRef = useRef()
  useEffect(() => {
    // myList2를 사용하여 markerList 업데이트
    setMarkerList([...myList2].map((item) => item.latlng))
  }, [myList2])

  // markerList 변경 후에 로그 찍기
  // 마커의 중심으로 지도의 센터를 조정합니다.

  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds()

    markerList.forEach((markerList) => {
      bounds.extend(new kakao.maps.LatLng(markerList.lat, markerList.lng))
    })
    return bounds
  }, [markerList])

  useEffect(() => {
    const map = mapRef.current
    if (map) map.setBounds(bounds)
  }, [markerList])

  // 드래그 영역관련
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 })

  const handleDrag = (e, ui) => {
    const { y } = deltaPosition
    setDeltaPosition({
      //   x: x + ui.deltaX,
      y: y + ui.deltaY,
    })
  }

  const renderLines = () => {
    const lines = []

    // 같은 일(myDay)을 가진 마커끼리 그룹화
    const markerGroups = myList2.reduce((groups, marker) => {
      const key = marker.myDay
      if (!groups[key]) groups[key] = []
      groups[key].push(marker)
      return groups
    }, {})

    // 그룹 내의 마커에 대해 선 추가
    Object.values(markerGroups).forEach((group) => {
      for (let i = 0; i < group.length - 1; i++) {
        const startPoint = group[i].latlng
        const endPoint = group[i + 1].latlng

        lines.push(
          <Polyline
            key={`${startPoint.lat}-${startPoint.lng}-${endPoint.lat}-${endPoint.lng}`}
            path={[startPoint, endPoint]}
            options={{
              strokeColor: '#ff0000', // 선 색상
              strokeWeight: 3, // 선 두께
              strokeOpacity: 0.7, // 선 투명도
            }}
          />
        )
      }
    })

    return lines
  }

  return (
    <div className="create-map-wrap" style={{ padding: '0px 10%' }}>
      <Draggable
        onDrag={handleDrag}
        axis="y"
        bounds={{ top: -550, bottom: 4 }}
        allowAnyClick={true}
      >
        <div className="scrollable-content">
          <Container style={{ height: '60vh' }}>
            <Row className="mt-5 align-items-center" style={{ height: '10%' }}>
              <Col
                sm={3}
                className="create-page-my d-flex justify-content-center"
              >
                {newText2}
              </Col>
              <Col
                sm={2}
                className="create-page-my1 d-flex justify-content-center"
              >
                {region_name2}여행
              </Col>
              <Col
                sm={3}
                className="create-page-my2 d-flex justify-content-center"
              >
                {dateRange212}
              </Col>
              <Col
                sm={2}
                className="create-page-my3 d-flex justify-content-center"
              >
                {dateRange312}
              </Col>
              <Col sm={2} className="d-flex justify-content-center">
                <button className="create-page-btn">일정 가져오기</button>
              </Col>
            </Row>

            <Row
              className="create-page-content"
              style={{ overflowY: 'scroll', padding: '0px 10%' }}
            >
              {days2.map((item, index1) => (
                <div key={index1}>
                  <Row className="mt-5">
                    {/* 최종데이터 map */}
                    <Col className="create-day-text">day {index1 + 1}</Col>
                  </Row>

                  {myList2
                    .filter((filteredItem) => filteredItem.myDay == index1 + 1)
                    .map((filteredItem, index2) => (
                      <Row
                        key={index2}
                        className="mt-3 create-page-content-list"
                      >
                        <Col
                          className="create-page-markerIndex"
                          sm={1}
                          style={{
                            backgroundColor:
                              filteredItem.bgColor.backgroundColor,
                          }}
                        >
                          {filteredItem.markerIndex}
                        </Col>
                        <Col
                          sm={5}
                          className=" ms-2 text-center2 d-flex justify-content-center align-items-center"
                        >
                          {filteredItem.pla_name}
                        </Col>
                        <Col>{filteredItem.pla_code_main}</Col>
                        <Col className="create-page-addr-text">
                          {filteredItem.region_sub} {filteredItem.pla_addr}
                        </Col>
                      </Row>
                    ))}
                </div>
              ))}
            </Row>
          </Container>
        </div>
      </Draggable>
      <Map
        id="map"
        center={center}
        style={{
          width: '100%',
          height: '63vh',
          borderRadius: '10px',
        }}
        level={level}
        ref={mapRef}
      >
        {markerList.map((markerList) => (
          <MapMarker
            key={`${markerList.lat}-${markerList.lng}`}
            position={markerList}
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
        ))}
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
        {renderLines()} {/* 마커 간의 선을 그리는 함수 호출 */}
      </Map>
    </div>
  )
}

export default CreateSchedule
