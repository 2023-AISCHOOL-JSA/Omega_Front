import React, { useEffect, useState } from 'react'
import { Map, CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk'
import { useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const CreateSchedule = () => {
  const location = useLocation()
  const lastMakePlan2 = location.state && location.state.lastMakePlan1
  const myList2 = location.state && location.state.myList1
  console.log(lastMakePlan2, 'lastMakePlan lastMakePlan')
  console.log(myList2, 'myList1 myList1')
  const [center, setCenter] = useState({})
  //   const [center1, setCenter1] = useState({})
  useEffect(() => {
    // 마커들의 평균 좌표 계산
    if (myList2 && myList2.length > 0) {
      const sumLat = myList2.reduce((sum, marker) => sum + marker.latlng.lat, 0)
      const sumLng = myList2.reduce((sum, marker) => sum + marker.latlng.lng, 0)
      const avgLat = sumLat / myList2.length
      const avgLng = sumLng / myList2.length

      // 계산된 평균 좌표를 지도의 중심으로 설정

      setCenter({ lat: avgLat, lng: avgLng })
    }
  }, [myList2])

  return (
    <div className="create-map-wrap">
      <Map
        id="map"
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          width: '100%',
          height: '70vh',
        }}
        level={13}
      >
        {/* positions로 마커찍기 */}
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
            {/* 커스텀오버레이도 같이 찍기 */}
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
