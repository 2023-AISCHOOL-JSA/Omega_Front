import React, { useContext } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import AccordionContent from './AccordionContent'
import 'bootstrap/dist/css/bootstrap.min.css'
// import { AccordionContext } from '../Context/AccordionContext'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// import { data } from "../pages/MakePlan';

const AccordionList = ({ item, index, selectedKey, myList, setList, days }) => {
  // const mydata2 = useContext(data);

  // const { day, setDay } = useContext(AccordionContext);
  // console.log(day, "123123");
  // 색 지정하기
  let backColor = ''
  // if (index + 1 == "1") backColor = "#34eaad";
  if (index + 1 == '1') backColor = '#34eaad'
  if (index + 1 == '2') backColor = '#e7d84a'
  if (index + 1 == '3') backColor = '#1f3871'
  if (index + 1 == '4') backColor = '#ea3434'
  if (index + 1 == '5') backColor = '#58ea34'
  if (index + 1 == '6') backColor = '#ea3489'
  if (index + 1 == '7') backColor = '#ea8334'
  if (index + 1 == '8') backColor = '#34bdea'
  if (index + 1 == '9') backColor = '#3440ea'
  if (index + 1 == '10') backColor = '#9234ea'

  return (
    <Accordion.Item eventKey={`${index}`}>
      <Accordion.Header style={{ borderBottom: `2px solid ${backColor}` }}>
        {/* <img className="accordion-img" src="/img/위치.png"></img> */}
        <div className="day-detail" style={{ color: `${backColor}` }}>
          {item}일차
        </div>
      </Accordion.Header>

      <Accordion.Body className="mt-3">
        <AccordionContent
          dayss={days}
          myList={myList}
          setList={setList}
          selectedKey={selectedKey}
          myvalue={item}
        />
      </Accordion.Body>
    </Accordion.Item>
  )
}

export default AccordionList
