import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import { data } from '../pages/MakePlan'
import 'bootstrap/dist/css/bootstrap.min.css'

const List = ({
  resData,
  key1,
  setData,
  setData2,
  selectedKey,
  bgList,
  daysss,
  setCenter,
  setMarkerImage,
  setMarkerImgToggle,
  markerImgToggle,
  markerImg,
  listCheckList,
  setListCheckList,
  listCheckCount,
  setListCheckCount
}) => {


  const listClickCheck = (e) => {
    console.log(markerImg, "     console.log(markerImg)");
    console.log(resData, "     resData");
    if(!listCheckCount) {
      setListCheckCount(1)
      setMarkerImgToggle(!markerImgToggle);
    }
   // 우선 listCheckList 에 클릭한 리스트 데이터 추가
    setListCheckList([...listCheckList, resData]);
  
 
    if(listCheckList.length>0){
      // 눌린 리스트 데이터와 기존에 있던 리스트 데이터가 같다면
      if (resData.pla_no === listCheckList[0]?.pla_no) {
        // 마커 새로 보여주기
        setMarkerImgToggle(!markerImgToggle);
    
      }
      // 리스트마커가 안찍힌상태(false인상태)에서 다른 리스트 누르면 true로 바꿀수없기때문에 조건 추가
      if(markerImgToggle==false){
        setMarkerImgToggle(!markerImgToggle);
      }
      // 무조건 배열의 0번째(기존에 존재했던 비교할 리스트데이터)는 없애기
      setListCheckList(list => {
        const temp = [...list];
        temp.shift(); // Remove the first element
        return temp;
      });
    };
    }
  
  // 지워두됩니다 (확인용)
  useEffect(()=>{
    console.log(listCheckList[0],"    console.log(listCheckList[0])")
    console.log(listCheckList,"    console.log(listCheckList)")
    // console.log(resData.pla_no,"    console.log(listCheckList)")
  },[listCheckList])


  const plaNoList = bgList.map((item) => item.pla_no)
  // console.log(plaNoList, 'plaNoList plaNoList')
  const myData2 = useContext(data)

  // 모달 state
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true);

  // const [resName, setResName] = useState(resData?.text);
  const [resName, setResName] = useState(resData.text)
  // console.log(resName);
  // console.log(props.resData?.text);
  // console.log("222222222222222222222resData?.text");
  const setDataFun = () => {
    setData(key1)
    // key1: 요소의 순서
    // console.log(key1)
    setShow(true)
  }
  // console.log(resData, 'resData resData resData')
  // console.log(bgList, '2222222222222222222222222222222222222222222')

  // useEffect(() => {
  //   console.log(myData2, 'myData2myData2myData2')
  // }, [myData2])
  return (
    <Card
      className={'mb-2 d-flex me-1'}
      style={{
        border: plaNoList.includes(resData.pla_no)
          ? '0px solid orange'
          : '0px solid #ffffff',
        backgroundColor: plaNoList.includes(resData.pla_no) ? '#ECEFF7' : '',
      }}
      onClick={(e) => {
        setMarkerImage(resData)
        listClickCheck((e))
        setCenter(resData.latlng)
  
        // console.log(resData)
      }}
    >
      {/* style={{ backgroundColor: bgList.myDay == 1 ? "gray" : "" }} */}
      <Card.Body style={{ display: 'flex', padding: '2%' }}>
        {/* 이미지 */}
        <div style={{ width: '100px', height: '100px' }}>
          <Card.Img
            style={{ width: '100%', height: '100%' }}
            src={resData.img}
          />
        </div>
        {/* 텍스트 */}
        <div style={{ marginLeft: '1rem', width: '65%' }}>
          <div>
            <span
              style={{
                fontSize: '15px',
                fontWeight: '700',
              }}
            >
              {resData.pla_name}
            </span>
            <span
              className="ms-4"
              style={{ fontSize: '14px', color: 'orange', fontWeight: '700' }}
            >
              {/* {resData?.code} */}
              {resData.pla_code_main}
            </span>
          </div>
          <div className="mt-3" style={{ fontSize: '12px', color: 'gray' }}>
            {/* {resData?.latlng.lat}-{resData?.latlng.lng} */}
            {resData.pla_addr}
          </div>
          <div
            className="mt-3"
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{ fontWeight: '600', color: '#838383', fontSize: '13px' }}
            >
              월요일 휴무
            </span>
            <span
              style={{ fontWeight: '600', color: '#838383', fontSize: '13px' }}
            >
              {resData.pla_period}
            </span>
          </div>
        </div>
        <div className="temppppppppp">
          {/* <button className="list-btn" onClick={setDataFun}>+</button> */}
          {/* 버튼을 클래스 css로 바꾸기 */}
          {/* <button
            className={`list-btn ${
              bgList.map((item) => item.pla_name).includes(resData.pla_name)
                ? 'list-check-btn'
                : ''
            }`}
            onClick={setDataFun}
          >
            +
          </button> */}
          {/* 체크버튼으로 바꾸기 */}
          {bgList.map((item) => item.pla_name).includes(resData.pla_name) ? (
            <button className={'list-btn list-check-btn'} onClick={setDataFun}>
              ✅
            </button>
          ) : (
            <button className={'list-btn'} onClick={setDataFun}>
              +
            </button>
          )}
        </div>
        {show && (
          <Modal
            show={show}
            onHide={handleClose}
            animation={false}
            centered
            className="anothermodal"
            closeButton
          >
            <Modal.Header>
              <Modal.Title>추가할 요일을 선택하세요</Modal.Title>
            </Modal.Header>
            {daysss.map((item, index) => (
              <Modal.Body key={index} className="se">
                <button onClick={(e) => setData2(e, handleClose)} value={item}>
                  day{item}
                </button>
              </Modal.Body>
            ))}
            <div style={{ height: '20px' }}></div>
          </Modal>
        )}
      </Card.Body>
    </Card>
  )
}

export default List
