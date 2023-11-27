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
}) => {
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
  return (
    <Card
      className={'mb-2 d-flex me-1'}
      style={{
        border: plaNoList.includes(resData.pla_no)
          ? '0px solid orange'
          : '0px solid #ffffff',
        backgroundColor: plaNoList.includes(resData.pla_no) ? '#ECEFF7' : '',
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
          <button className="list-btn" onClick={setDataFun}>
            +
          </button>
        </div>
        {show && (
          <Modal show={show} onHide={handleClose} animation={false} centered>
            <Modal.Header closeButton>
              <Modal.Title>추가할 요일을 선택하세요</Modal.Title>
            </Modal.Header>
            {daysss.map((item, index) => (
              <Modal.Body key={index}>
                <button onClick={(e) => setData2(e, handleClose)} value={item}>
                  day{item}
                </button>
              </Modal.Body>
            ))}
          </Modal>
        )}
      </Card.Body>
    </Card>
  )
}

export default List
