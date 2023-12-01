import React, { useContext, useEffect, useRef } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { checkNumber, data } from '../pages/MakePlan'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { num1, setNum } from '../pages/MakePlan'
import 'bootstrap/dist/css/bootstrap.min.css'

const AccordionContent = ({ myvalue, selectedKey, myList, setList, dayss }) => {
  const myData2 = useContext(data)
  // const checkNumber1 = useContext(checkNumber);

  // const isPlacesEmpty = myData2.length === 0;

  // const deleteList = (deleteItem) => {
  //   console.log(myData2, "돌릴배열");
  //   console.log(deleteItem, "삭제 아이템");
  //   setList(myData2.filter((item) => item !== deleteItem));
  //   setList(myData2.sort((a, b) => a.myDay - b.myDay));
  // };

  const deleteList = (deleteItem) => {
    console.log(myData2, '돌릴배열')
    console.log(deleteItem, '삭제 아이템')

    // 배열에서 삭제할 아이템을 제외한 배열을 생성
    const updatedList = myData2.filter((item) => item !== deleteItem)
    for (let i = 0; i < dayss; i++) {
      // console.log('들어오긴하지?')
      // console.log(
      //   updatedList
      //     .filter((item) => item.myDay == i)
      //     .map((item, index) => (item.markerIndex = index + 1))
      // )
      setList(
        updatedList
          .filter((item) => item.myDay == i)
          .map((item, index) => (item.markerIndex = index + 1))
      )
    }
    setList(updatedList.sort((a, b) => a.myDay - b.myDay))
  }
  // 정렬된 배열을 상태로 업데이트
  // setList(updatedList.sort((a, b) => a.myDay - b.myDay));

  // 마커인덱스 변경함수(폐기)
  // const changeIndex=(indexData) =>{
  //   console.log(myData2, "돌릴배열1");
  //   console.log(myData2.map((item)=>item.markerIndex=indexData),"임시 함수테스트")
  //   // for(let i of myData2){
  //   //   console.log(i.markerIndex, "돌린후 배열");
  //   // }
  //   console.log(indexData,"indexData")
  // }
  return (
    <Droppable
      droppableId={`droppable-${myvalue}`}
      // type="ITEM"
      // autoScroll={true} // 스크롤 활성화
      // autoScrollMode="controlled" // 스크롤 방식 설정
      // style={{ width: "1000" }}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{ minHeight: '50px' }}
        >
          {myData2
            .filter((item) => item.myDay == myvalue)
            .map((item, index) => (
              <Draggable
                key={`${item.pla_name}-${myvalue}`}
                draggableId={`${item.pla_name}`}
                index={index}

                // style={{ position: "relative" }}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided?.draggableProps}
                    {...provided?.dragHandleProps}
                    className="plan-list mb-3"
                    // key1={item.text}
                    key={item.pla_name}
                    style={{
                      ...provided.draggableProps.style,
                    }}
                  >
                    <div className="div1 ms-2">
                      <div style={item.bgColor}>{index + 1}</div>
                      {/* {changeIndex(`${index+1}`)} */}
                    </div>
                    <div className="text-center">
                      <span>{item.pla_name}</span>
                    </div>
                    <div>
                      <span id="acco-category">{item.pla_code_main}</span>
                    </div>
                    <div
                      className="temp-img-container"
                      onClick={() => deleteList(item)}
                    >
                      <div className="temp-img"></div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          {provided?.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default AccordionContent

// import React, { useContext, useEffect } from "react";
// import Accordion from "react-bootstrap/Accordion";
// import { data } from "../App";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const AccordionContent = ({ myvalue, selectedKey, myList, setList }) => {
//   const myData2 = useContext(data);
//   // const isPlacesEmpty = myData2.length === 0;

//   const deleteList = (deleteItem) => {
//     console.log(myData2, "돌릴배열");
//     console.log(deleteItem, "삭제 아이템");
//     setList(myData2.filter((item) => item !== deleteItem));
//   };

//   return (
//     <Droppable droppableId={`droppable-${myvalue}`}>
//       {(provided) => (
//         <div ref={provided?.innerRef} {...provided?.droppableProps}>
//           {myData2
//             .filter((item) => item.myDay == myvalue)
//             .map((item, index) => (
//               <Draggable
//                 key={`${item.text}-${myvalue}`}
//                 draggableId={`${item.text}-${myvalue}`}
//                 index={index}
//               >
//                 {(provided) => (
//                   <div
//                     ref={provided?.innerRef}
//                     {...provided?.draggableProps}
//                     {...provided?.dragHandleProps}
//                     className="plan-list mb-3"
//                     key1={item.text}
//                   >
//                     <div className="div1 ms-2">
//                       <div style={item.bgColor}>{index + 1}</div>
//                     </div>
//                     <div className="text-center">
//                       <span>{item.text}</span>
//                     </div>
//                     <div>
//                       <span id="acco-category">식당</span>
//                     </div>
//                     <div
//                       className="temp-img-container"
//                       onClick={() => deleteList(item)}
//                     >
//                       <div className="temp-img"></div>
//                     </div>
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//           {provided?.placeholder}
//         </div>
//       )}
//     </Droppable>
//   );
// };

// export default AccordionContent;
