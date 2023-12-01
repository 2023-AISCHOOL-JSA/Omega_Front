import '../css//App.css'
import '../css/reset.css'
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from 'react-bootstrap/Nav'
import List from '../components/List'
import Accordion from 'react-bootstrap/Accordion'
import AccordionList from '../components/AccordionList'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { createContext } from 'react'
// import 'react-calendar/dist/Calendar.css'; // css import
import Calendar from 'react-calendar'
import '../css//CalendarCustom.css'
import moment from 'moment'
import MakeModal from '../components/MakeModal'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import api from '../axios'

export const data = createContext()
export const checkNumber = createContext()

const MakePlan = (props) => {
  // 메이크페이지 모달 state
  const [makePageModal, setMakePageModal] = useState(false)
  const [modalDataTemp, setModalDataTemp] = useState({})
  const navigate = useNavigate()
  const location = useLocation()
  // 마커 이미지 관리,토글 state
  const [listCheckCount, setListCheckCount] = useState(0)
  const [listCheckList, setListCheckList] = useState([])
  const [markerImg, setMarkerImage] = useState('')
  const [markerImgToggle, setMarkerImageToggle] = useState(false)
  // 최종 리스트 (이거 쓰시면 됩니다)
  const [lastMakePlan, setLastMakePlan] = useState()

  // 지역 이름, 위도, 경도
  const [region_name, setRegion_name] = useState(location?.state?.region_name)
  const [latlng, setLatlng] = useState(location?.state?.latlng)
  const [region_no, setRegion_no] = useState(location?.state?.region_no / 1000)

  /* back 통신 */
  // 불러올 플랜 state
  const [myPlanNo, setMyPlanNo] = useState(useParams().plan_no)
  const [myPlan, setMyPlan] = useState()
  const [myPlanDetail, setMyPlanDetail] = useState(null)
  const [myWishList, setMyWishList] = useState(null)
  const [isPlanUpdated, setIsPlanUpdated] = useState(false)

  const [cate, setCate] = useState({})

  useEffect(() => {
    const getList = async (url) => {
      const data33 = await api.get(url, {
        headers: { authorization: localStorage.getItem('jwtToken') },
      })
      return await data33.data.data
    }

    // 카테고리별 가져옴
    const cate1 = ['음식점', '명소', '숙박', '카페', '체험']

    cate1.map((item) => {
      getList(`/search/place?pla_code=${item}&region_no=${11}`)
        .then((res) => {
          console.log(res)
          setCate((prev) => {
            return { ...prev, [item]: res }
          })
        })
        .catch((err) => {
          console.log(err)
        })
    })

    if (localStorage.getItem('jwtToken')) {
      console.log('로그인되어있어서 위시리스트 가져옴..')
      // 로그인 되어있다면 위시리스트 가져옴
      getList(`/wish/me`)
    }
  }, [])

  useEffect(() => {
    console.log(cate, 'cate1 cate1')
  }, [cate])

  useEffect(() => {
    const getPlan = () => {
      api
        .get(`/plan/${myPlanNo}`, {
          headers: { authorization: localStorage.getItem('jwtToken') },
        })
        .then((res) => {
          console.log('불러온 일정...', res.data.data)
          const { started_date, ended_date, ...result } = res.data.data
          setMyPlan({
            started_date: new Date(started_date),
            ended_date: new Date(ended_date),
            ...result,
          })
        })
        .catch((err) => console.log(err))
    }

    // 상세 플랜 가져오기
    const getPlanDetail = () => {
      api
        .get(`/plan/${myPlanNo}/plan_detail`, {
          headers: { authorization: localStorage.getItem('jwtToken') },
        })
        .then((res) => {
          console.log('불러온 일정 상세...', res.data.data)
          setMyPlanDetail(res.data.data)
        })
        .catch((err) => console.log(err))
    }

    if (myPlanNo !== 'new') {
      // url이 new가 아니면 저장된 플랜을 가져옴
      getPlan()
      getPlanDetail()
    }
  }, [myPlanNo])

  // 플랜 저장 및 갱신
  const savePlan = () => {
    setMyPlan({
      plan_name: newText,
      plan_info: 'plan_info',
      started_date: new Date(dateRange[0])
        .toLocaleDateString()
        .replace(/ /gi, '-')
        .replace(/\./gi, ''),
      ended_date: new Date(dateRange[1])
        .toLocaleDateString()
        .replace(/ /gi, '-')
        .replace(/\./gi, ''),
      plan_region: region_name,
      region_no: region_no,
    })
    setIsPlanUpdated(true)
  }

  useEffect(() => {
    if (myPlanNo !== 'new') {
      setNewText(myPlan?.plan_name)
      setDateRange([myPlan?.started_date, myPlan?.ended_date])
      setRegion_name(myPlan?.plan_region)
      setRegion_no(myPlan?.region_no)
    }
    // 플랜 생성
    const createPlan = () => {
      api
        .post(
          '/plan',
          {
            myPlan,
          },
          {
            headers: { authorization: localStorage.getItem('jwtToken') },
          },
        )
        .then((res) => {
          console.log('일정 저장...', res.data.data)
          savePlanDetail(res.data.data.plan_no)
          setMyPlanNo(res.data.data.plan_no)
          setIsPlanUpdated(false)
        })
        .catch((err) => console.log(err))
    }

    // 플랜 갱신
    const updatePlan = () => {
      console.log(myPlan, '....')
      api
        .put(
          `/plan/${myPlanNo}`,
          {
            myPlan,
          },
          {
            headers: { authorization: localStorage.getItem('jwtToken') },
          },
        )
        .then((res) => {
          console.log(res)
          savePlanDetail()
          setIsPlanUpdated(false)
        })
        .catch((err) => console.log(err))
    }

    // 상세 플랜 저장 및 갱신
    const savePlanDetail = async (plan_no) => {
      await api
        .put(
          `/plan/${plan_no || myPlanNo}/plan_detail`,
          {
            1: [1, 2, 3, 4, 31961],
            2: [3, 4, 5, 6, 31961],
            3: [3, 4, 5, 6, 7, 3, 31961],
            4: [3, 4, 5, 6, 7, 31962],
          },
          {
            headers: { authorization: localStorage.getItem('jwtToken') },
          },
        )
        .then((res) => {
          console.log('상세 일정 저장...', res.data.data)
        })
        .catch((err) => console.log(err))
    }
    if (isPlanUpdated) {
      if (myPlanNo === 'new') {
        createPlan()
      } else {
        updatePlan()
      }
    }
  }, [myPlan])

  // 텍스트 검색 기능
  const searchRef = useRef()
  const handleSearch = () => {
    api
      .get(
        `/search/place?keyword=${searchRef.current.value}&center_lat=35.15573723324999&center_lng=126.83543483014738`,
      )
      .then((res) => {
        console.log(res.data.data)
      })
      .catch((err) => console.log(err))
  }
  /* back 통신 끝 */

  const makePlanStrat = () => {
    console.log('일정 생성 대기')
    console.log(myList)

    let myListObj = {}

    for (let [i, j] of myList.entries()) {
      myList
        .filter((item) => item.myDay == i + 1)
        .forEach((item) => {
          if (!myListObj[`${i + 1}`]) {
            myListObj[`${i + 1}`] = []
          }
          myListObj[`${i + 1}`].push(item.pla_no)
        })
    }


    console.log(myListObj, 'myListObjmyListObj')
    setLastMakePlan(myListObj)
    // navigate('/create')
    navigate('/create', {
      state: {
        lastMakePlan1: myListObj,
        myList1: myList,
        days1: days,
        dateRange21: dateRange2,
        dateRange31: dateRange3,
        region_name1: region_name,
        newText1: newText,
      },
    })
  }

  // 마지막일정
  useEffect(() => {
    console.log(lastMakePlan, '마지막 일정 배열 확인')
    console.log(JSON.stringify(lastMakePlan), '마지막 일정 배열 확인22222222')
    console.log(
      JSON.parse(JSON.stringify(lastMakePlan ?? '')),
      '마지막 일정 배열 확인333333333333333',
    )
  }, [lastMakePlan])

  // 마커클릭함수

  const markerClick = (e) => {
    const [markerClickEventData] = cate[selectedKey].filter(
      (item) => item.pla_name == e.Gb,
    )

    console.log(markerClickEventData, 'markerClickEventData')
    console.log([markerClickEventData], '[markerClickEventData]')
    console.log(e.Gb)
    setModalDataTemp(markerClickEventData)
    setMakePageModal(!makePageModal)
  }

  // 카테고리 리스트 변수(state안써도될듯)
  const categories = [
    { sequence: '1', title: '추천', path1: '../img/recom.png' },
    { sequence: '2', title: '음식점', path1: '../img/ress.png' },
    { sequence: '3', title: '명소', path1: '../img/plac.png' },
    { sequence: '4', title: '숙박', path1: '../img/reser.png' },
    { sequence: '5', title: '카페', path1: '../img/cafe.png' },
    { sequence: '6', title: '체험', path1: '../img/exercise.png' },
    { sequence: '7', title: '나의저장', path1: '../img/hhhh.png' },
  ]

  // 마커 센터 state
  const [markerCenterList, setMarkerCenterList] = useState([])
  // 이미지 돌리기 테스트
  const [rotation, setRotation] = useState(0)
  ////////////////////////////////////// 일정 토글 함수
  const scheduleToggle = () => {
    setRotation(rotation + 180)
    setTempCssVisibility(!isTempCssVisible)
  }

  // 해야할일 테스트
  const [edited, setEdited] = useState(false)
  const [newText, setNewText] = useState('나의 일정')
  const myScheduleTitleRef = useRef(null)

  const handleEditChange = () => {
    setEdited(!edited)
  }

  useEffect(() => {
    // console.log(edited)
    if (edited) {
      myScheduleTitleRef.current.focus()
    }
  }, [edited])

  const handleInputBlur = () => {
    // 수정 상태에서 포커스를 잃으면 수정 상태를 해제
    setEdited(false)
  }

  // 캘린더 테스트
  const [showCalendar, setShowCalendar] = useState(true)
  const [dateRange, setDateRange] = useState([new Date(), new Date()]) // 시작일과 마감일을 저장하는 state
  const [dateRange2, setDateRange2] = useState('여행 기간 설정하기') // 시작일과 마감일을 저장하는 state
  const [dateRange3, setDateRange3] = useState('') // 시작일과 마감일을 저장하는 state
  const [days, setDays] = useState([]) // 시작일과 마감일을 저장하는 state

  // 설정하기 버튼 클릭시 캘린더 숨기고 나머지 일정기간 등 설정하기
  const handleColClick = (e) => {
    setShowCalendar(!showCalendar)
    if (e.target.innerText == '설정하기') {
      // console.log(e.target.innerText)
      const formattedDate1 = `${dateRange[0].getFullYear() - 2000}년 ${
        dateRange[0].getMonth() + 1
      }월 ${dateRange[0].getDate()}일`
      const formattedDate2 = `${
        dateRange[1].getMonth() + 1
      }월 ${dateRange[1].getDate()}일`
      const periodText = [formattedDate1, '  -  ', formattedDate2]
      setDateRange2(periodText)

      // console.log(dateRange[1].getDate() - dateRange[0].getDate(), '박')
      // console.log(dateRange[1].getDate() - dateRange[0].getDate() + 1, '일')

      setDateRange3(
        `${dateRange[1].getDate() - dateRange[0].getDate()}박${
          dateRange[1].getDate() - dateRange[0].getDate() + 1
        }일`,
      )
      const tempp = Array(dateRange[1].getDate() - dateRange[0].getDate() + 1)
        .fill(null)
        .map((_, i) => (i + 1).toString())
      setDays(tempp)
    }
  }

  const handleCalendarChange = (newDate) => {
    // console.log(newDate,"newDate 어떻게 생겼는지?")
    // console.log(dateRange,"dateRange 어떻게 생겼는지")
    setDateRange(newDate)
  }

  const [myList, setList] = useState([])
  const items = [...myList]
  const mydata2 = useContext(data)

  // 드래그앤드랍 함수
  const handleDragEnd = (result) => {
    // console.log(result, 'result')
    // console.log(result.draggableId, 'draggableId')
    // console.log(result.source, 'source')
    // console.log(mydata2)

    if (!result.destination) {
      return
    }
    // 같은영역에서 드래그엔드랍 할시 우선막기
    if (
      result.destination.droppableId + result.destination.index ==
      result.source.droppableId + result.source.index
    ) {
      return
    }
    console.log(
      ~~result.destination.droppableId[10] + ~~result.destination.index,
      'zz',
    )
    // console.log(~~result.source.index + ~~result.source.droppableId[10], 'xx')
    // Shallow copy of the array

    // console.log(items, 'myList복사한 items')
    const itemIndex = items.findIndex(
      (item) => item.pla_name === result.draggableId,
    )
    // console.log(items.findIndex((item) => item.text === result.draggableId),"제발 흑흑")
    // Remove the item from the source index
    const [reorderedItem] = items.splice(itemIndex, 1)
    // console.log(reorderedItem, '리로드아이템')
    if (result.destination.droppableId == 'droppable-1') {
      reorderedItem.myDay = '1'
      reorderedItem.bgColor = { backgroundColor: '#34EAAD' }
    } else if (result.destination.droppableId == 'droppable-2') {
      reorderedItem.myDay = '2'
      reorderedItem.bgColor = { backgroundColor: '#EBDA34' }
    } else if (result.destination.droppableId == 'droppable-3') {
      reorderedItem.myDay = '3'
      reorderedItem.bgColor = { backgroundColor: '#1F3871' }
    }else if (result.destination.droppableId == 'droppable-4') {
      reorderedItem.myDay = '4'
      reorderedItem.bgColor = { backgroundColor: '#1F3871' }
    }else if (result.destination.droppableId == 'droppable-5') {
      reorderedItem.myDay = '5'
      reorderedItem.bgColor = { backgroundColor: '#1F3871' }
    }else if (result.destination.droppableId == 'droppable-6') {
      reorderedItem.myDay = '6'
      reorderedItem.bgColor = { backgroundColor: '#1F3871' }
    }else if (result.destination.droppableId == 'droppable-7') {
      reorderedItem.myDay = '7'
      reorderedItem.bgColor = { backgroundColor: '#1F3871' }
    }else if (result.destination.droppableId == 'droppable-8') {
      reorderedItem.myDay = '8'
      reorderedItem.bgColor = { backgroundColor: '#1F3871' }
    }else if (result.destination.droppableId == 'droppable-9') {
      reorderedItem.myDay = '9'
      reorderedItem.bgColor = { backgroundColor: '#1F3871' }
    }else if (result.destination.droppableId == 'droppable-10') {
      reorderedItem.myDay = '10'
      reorderedItem.bgColor = { backgroundColor: '#1F3871' }
    }

    // 리로드아이템에 드래그영역의 인덱스번호로 변경
    // if (result.destination.droppableId == result.source.droppableId) {
    //   console.log('들어오는지')
    //   console.log(
    //     '인덱스올릴 아이템',
    //     items.filter((item) => item.pla_name == result.draggableId)
    //   )
    // }

    // console.log(result.destination.droppableId[10], '영역1인지 2인지 3인지')
    // console.log(
    //   items.filter((item) => item.myDay == result.destination.droppableId[10]),
    //   '드랍된영역들의 아이템'
    // )
    // console.log(
    //   items.filter((item) => item.myDay == result.destination.droppableId[10])[
    //     result.destination.index
    //   ]?.pla_name,
    //   '드랍된영역인덱스의 아이템'
    // )
    // console.log(
    //   items.findIndex(
    //     (item) =>
    //       item.pla_name ==
    //       items.filter(
    //         (item) => item.myDay == result.destination.droppableId[10]
    //       )[result.destination.index]?.pla_name
    //   ),
    //   '드랍된영역인덱스의 아이템의 전체 배열에서의 index'
    // )
    let reorderedItemIndex = items.findIndex(
      (item) =>
        item ==
        items.filter(
          (item) => item.myDay == result.destination.droppableId[10],
        )[result.destination.index],
    )

    //////////////////////////////
    if (
      !items.filter((item) => item.myDay == result.destination.droppableId[10])[
        result.destination.index
      ]?.pla_name
    ) {
      // console.log(
      //   items.filter((item) => item.myDay == result.destination.droppableId[10])
      //     .length
      // )

      items.splice(myList.length + 1, 0, reorderedItem)
    } else {
      items.splice(reorderedItemIndex, 0, reorderedItem)
    }

    // 우선 임시 마커찍는 인덱스추가하는 함수 이거 쓰기
    for (let i = 1; i <= days.length; i++) {
      // console.log('들어오긴하지?')
      // console.log(
      //   items
      //     .filter((item) => item.myDay == i)
      //     .map((item, index) => (item.markerIndex = index + 1))
      // )
      setList(
        items
          .filter((item) => item.myDay == i)
          .map((item, index) => (item.markerIndex = index + 1)),
      )
    }

    setList(items.sort((a, b) => a.myDay - b.myDay))
  }

  useEffect(() => {
    if (!myList.length == 0) {
      // console.log(mydata2, '어캐생김?')
      // console.log(markerCenterList, 'markerCenterList어캐생김?')

      setCenter(markerCenterList[0].latlng)
    }
  }, [myList])

  const [chData, setData] = useState()

  const [num1, setNum1] = useState(0)

  // 일정일수 state
  const [day, setDay] = useState(['context'])
  // 일정 토글 state
  const [isTempCssVisible, setTempCssVisibility] = useState(true)

  // 선택된 리스트게시물 찾기위한 state
  const [selectedItems, setSelectedItems] = useState([])
  const [teb, setTab] = useState(0)
  // 카테고리 클릭시 토글기능
  const [isActive, setIsActive] = useState(false)
  const [selectedKey, setSelectedKey] = useState('')
  const [cateList, setCateList] = useState([])
  /////////////////////////////////// 사이드바 STATE

  // 임시 데이터 초기화

  // console.log(firstData2)
  // [[{},{},{},{}],[{},{}],[{},{},{}],[{}]]
  const [travelDestination, setTravelDestination] = useState([]) // 여행지 초기화
  const [restaurant, setRestaurant] = useState([]) // 식당
  const [dormitory, setDormitory] = useState([]) // 기숙사(숙소)

  ////////////////////////////////////////////////////////////////////////////////////////////
  const [position, setPosition] = useState([]) // 임시 마커 좌표 state
  // const [first, setFirst] = useState([]);   // 2. 일정추가할 배열 만들기
  const [center, setCenter] = useState({ lat: 37.5665734, lng: 126.978179 }) // 초기 마커 센터값
  ////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////  카테고리 클릭 함수(카테고리 별로 전부 수정해야함 11/26 미완)
  const cateClick = (e, title) => {
    // console.log(key)
    console.log(title)
    setSelectedKey(title)
    setIsActive(!isActive)
    setCateList(cate[title])
    // else if (ti === '6') {
    //   setCateList(firstData2)
    // }
  }

  const className = `${isActive ? 'active-class' : ''}`

  //////////////////////////////////////////////////////////////////// setData2 ///////////////////////////////////////
  function setData2(e, handleClose) {
    let data = {}
    let selectList = []

    selectList = [...cate[selectedKey]]

    // console.log(e.target.value, '몇일에 들어갈건지')
    // console.log(chData, '선택된 리스트가 무엇인지')
    let checkData = selectList[chData] // 선택된리스트를 checkData에 저장
    // 안에 있다면 안넣기

    // console.log(
    //   myList.findIndex((item) => item.pla_name == checkData.pla_name),
    //   'myList에 추가한 요소가 있는지'
    // )
    // 만약 이미 myList에 checkData 가 있다면 아무일도 X

    if (
      myList.findIndex((item) => item.pla_name == checkData.pla_name) !== -1
    ) {
      handleClose()
      return
      // 없다면 저장
    } else {
      // 맞는 리스트돌려서 데이터만들기
      for (let i = 0; i < selectList.length; i++) {
        if (i === chData) {
          data = { ...selectList[i] }
        }
      }
      // 색지정
      data.myDay = e.target.value
      if (data.myDay === '1') {
        data.bgColor = { backgroundColor: '#34eaad' }
      }
      if (data.myDay === '2') {
        data.bgColor = { backgroundColor: '#ebda34' }
      }
      if (data.myDay === '3') {
        data.bgColor = { backgroundColor: '#1f3871' }
      }
      if (data.myDay === '4') {
        data.bgColor = { backgroundColor: 'red' }
      }
      if (data.myDay === '5') {
        data.bgColor = { backgroundColor: 'red' }
      }
      if (data.myDay === '6') {
        data.bgColor = { backgroundColor: 'red' }
      }
      if (data.myDay === '7') {
        data.bgColor = { backgroundColor: 'red' }
      }
      if (data.myDay === '8') {
        data.bgColor = { backgroundColor: 'red' }
      }
      if (data.myDay === '9') {
        data.bgColor = { backgroundColor: 'red' }
      }
      if (data.myDay === '10') {
        data.bgColor = { backgroundColor: 'red' }
      }

      data.markerIndex =
        [...myList].filter((item) => item.myDay == e.target.value).length + 1

      // 배경,일차수 만들어진 데이터 원본에 합치기
      // myList.sort((a, b) => a.myDay - b.myDay);
      setList((List) => [...List, data].sort((a, b) => a.myDay - b.myDay))
      // 센터마커에 넣어서 관리하기
      setMarkerCenterList([data])

      // console.log(
      //   [...myList].filter((item) => item.myDay == e.target.value).length,
      //   '마이리스트에 몇일차의 데이터들 길이'
      // )
    }
    handleClose()
  }

  // 리스트 인덱스,pla_name 확인하기
  useEffect(() => {
    console.log(myList, 'app.js-드래그앤드랍이 끝난 이후 마이리스트')
    for (let [i, j] of myList.entries()) {
      console.log(i, j.pla_name, j.myDay)
    }
  }, [myList])

  return (
    // <div>
    // <Container style={{ padding: '0px' }}>
    <div
      className="root-wrap"
      style={{
        height: '100%',
        width: '100%',
        padding: '0px 100px',
      }}
    >
      {/* <Navbar bg="white" className="mb-3">
        <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Navbar style={{ flex: 1 }}>
            <Navbar.Brand href="#home">Campus Stay</Navbar.Brand>
          </Navbar>
          <Nav className="me-auto" style={{ flex: 1 }}>
            <Nav.Link href="#">여행일정</Nav.Link>
            <span style={{ fontSize: '30px' }}>|</span>
            <Nav.Link href="#">숙소예약</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}
      {/* <Container style={{ padding: '0px 100px' }}> */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          // alignItems: 'center',
        }}
      >
        {makePageModal ? (
          <MakeModal
            setMakePageModal={setMakePageModal}
            makePageModal={makePageModal}
            modalDataTemp={modalDataTemp}
            show1={makePageModal}
          />
        ) : (
          ''
        )}
      </div>
      {/* //////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////// SIDE BAR START ////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////// */}
      <Row style={{ overflow: 'hidden' }}>
        {/*///////////////////////////////// 검색 INPUT  ////////////////////////////////////*/}
        <Col
          sm={3}
          style={{
            // width: '400px!important',
            backgroundColor: '#f6f6f6',
            zIndex: '20',
            height: 'calc(100vh-76px)',
          }}
        >
          <div className="search-container">
            <input
              type="search"
              className="main-input mt-3 mb-3"
              placeholder="텍스트 혹은 이미지로 검색해보세요."
            />
            <button className="search-btn">
              <img
                className="input-img search-img"
                src="https://cdn.icon-icons.com/icons2/2406/PNG/512/search_magnifier_icon_145939.png"
              />
            </button>
            <button className="search-btn">
              <img
                className="input-img img-search-img"
                src="https://cdn.icon-icons.com/icons2/2440/PNG/512/gallery_icon_148533.png"
              />
            </button>
          </div>
          <Nav variant="tabs">
            {categories.map((item, index) => (
              <Nav.Item
                key={index}
                className={selectedKey === item.sequence ? 'active' : ''}
                onClick={(e) => cateClick(e, item.title)}
                // eventKey={`link${index}`}
              >
                <img className="cate-img" src={item.path1}></img>
                <div className="item-text mt-1 mb-3">{item.title}</div>
              </Nav.Item>
            ))}
          </Nav>
          {/*///////////////////////////////// 리스트 시작 ////////////////////////////////////*/}
          {/*///////////////////////////////// 셀렉트키 전부 만들어야함 (11/26) ////////////////////////////////////*/}
          <div className="scrollable-div1">
            {cate[selectedKey]?.map((item, index) => (
              <List
                listCheckCount={listCheckCount}
                setListCheckCount={setListCheckCount}
                listCheckList={listCheckList}
                setListCheckList={setListCheckList}
                setMarkerImgToggle={setMarkerImageToggle}
                setMarkerImage={setMarkerImage}
                markerImg={markerImg}
                setCenter={setCenter}
                key={index}
                daysss={days}
                resData={item}
                key1={index}
                setData={setData}
                setData2={setData2}
                bgList={myList} /* 다른 속성들 추가 */
              />
            ))}
          </div>
        </Col>

        <Col className="p-0" sm={9} style={{ position: 'relative' }}>
          <Col className={`temp-css ${isTempCssVisible ? '' : 'hidden'}`}>
            {/* <div className={`temp33 ${isTempCssVisible ? '' : 'hidden'}`} onClick={handleButtonClick}> */}
            <Container>
              <Row className="mt-3 text-center" style={{ fontSize: '14px' }}>
                <Col sm={3} className="travel-region-text pe-0">
                  <span>{region_name}</span> 여행
                </Col>
                {/* 캘린더 테스트 */}
                <Col sm={6} className="pe-0" onClick={handleColClick}>
                  {/* <div travelPeriodRef={}>2023.10.11~2023.10.14</div> */}
                  <div className="travel-period-text">{dateRange2}</div>
                  {/* <div className="travel-period-text">23.10.11(일) - 10.14(목)</div> */}
                </Col>

                <Col className="travel-days-text" sm={3}>
                  {dateRange3}
                </Col>
                {showCalendar && (
                  <Modal
                    // size="lg"
                    show={showCalendar}
                    onHide={() => setMakePageModal(false)}
                    centered
                    animation={false}
                    aria-labelledby="contained-modal-title-vcenter"
                  >
                    <Modal.Body>
                      <Row className="text-center mt-2 mb-2">
                        <Col className="plan-page-modal-title">
                          <p>여행기간을 설정해주세요!</p>
                        </Col>
                      </Row>
                      <Row className="text-center">
                        <Col className="me-3 start-end-text" sm={5}>
                          시작 일자
                        </Col>
                        <Col className="ms-3 start-end-text" sm={5}>
                          종료 일자
                        </Col>
                      </Row>
                      <Row className="text-center mt-1 mb-2">
                        <Col className="start-end me-3" sm={5}>
                          <div>
                            {moment(dateRange[0]).format('YY년 MM월 DD일')}
                          </div>
                        </Col>
                        <Col className="start-end ms-3" sm={5}>
                          <div>
                            {moment(dateRange[1]).format('YY년 MM월 DD일')}
                          </div>
                        </Col>
                      </Row>
                      {/* 캘린더@@ */}
                      <Row>
                        <Col className="d-flex justify-content-center align-items-center">
                          <Calendar
                            minDetail="month"
                            // maxDetail="month"
                            onChange={handleCalendarChange}
                            value={dateRange}
                            selectRange={true}
                            formatDay={(locale, date) =>
                              date.toLocaleString('en', { day: 'numeric' })
                            }
                            // nextLabel={<NextIcon />}
                            // prevLabel={<PrevIcon />}
                            next2Label={null}
                            prev2Label={null}
                            showNeighboringMonth={false}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          className="mt-5 d-flex justify-content-center align-items-center"
                          style={{ width: '100%' }}
                        >
                          <button
                            className="list-btn2"
                            style={{ width: '90%' }}
                            onClick={(e) => handleColClick(e)}
                          >
                            설정하기
                          </button>
                        </Col>
                      </Row>
                    </Modal.Body>
                  </Modal>
                )}
              </Row>
              <Row className="mt-4">
                <Col sm={9}>
                  {/* 나의 일정 */}
                  {!edited ? (
                    <>
                      <span
                        style={{ fontWeight: '600', fontSize: '15px' }}
                        onClick={handleEditChange}
                      >
                        {newText}
                      </span>
                      <span onClick={handleEditChange}>✏️</span>
                    </>
                  ) : (
                    <input
                      className="my-schedule-title"
                      type="text"
                      ref={myScheduleTitleRef}
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      onBlur={handleInputBlur}
                      onKeyDown={(e) => {
                        // 엔터 키를 눌렀을 때 edited 상태 변경
                        if (e.key === 'Enter') {
                          setEdited(false)
                        }
                      }}
                    />
                  )}
                </Col>
                <Col className="save-btn" onClick={savePlan}>
                  <button>저장</button>
                </Col>
              </Row>
              <Row className="mt-4">
                {/* //////////////////////////////아코디언 시작////////////////////////////////// */}
                <checkNumber.Provider value={num1}>
                  <data.Provider value={myList}>
                    <DragDropContext onDragEnd={handleDragEnd}>
                      {/* defaultActiveKey 일차수별로 리스트로만들어서 할당해야함 (11/26 미완) */}
                      <Accordion
                        alwaysOpen
                        className="scrollable-div2"
                        defaultActiveKey={['0', '1', '2', '3', '4', '5']}
                      >
                        {/* 나중에 day state로 일정 리스트 관리 1127 수정 */}
                        {days.map((item, index) => (
                          <AccordionList
                            days={days}
                            key={index}
                            myList={myList}
                            setList={setList}
                            selectedKey={selectedKey}
                            item={item}
                            index={index}
                          />
                        ))}
                      </Accordion>

                      {myList.length > 0 ? (
                        <div
                          onClick={makePlanStrat}
                          className="schedule-creation-col"
                        >
                          <button className="schedule-creation">
                            일정 생성하기
                          </button>
                        </div>
                      ) : (
                        ''
                      )}
                    </DragDropContext>
                  </data.Provider>
                </checkNumber.Provider>
              </Row>
            </Container>

            {/* 이미지 변경하던지 해야함 */}
            <div
              className="temp33"
              onClick={() => {
                scheduleToggle()
              }}
            >
              <IoIosArrowBack
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: 'transform 0.3s ease',
                }}
              />
              {/* <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK0eHiAMMfCelxrvHk8KAnOyakw8WPFaG5iXaoLHlc&s"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: 'transform 0.3s ease',
                }}
              /> */}
            </div>
          </Col>

          <Col />

          {/* 지도 생성하기 */}

          <Map
            center={center}
            style={{
              width: '100%',
              height: '100%',
              marginLeft: isTempCssVisible ? '220px' : '',
              transition: 'margin-left 0.3s ease', // 여기서 오류 수정: margin-left 대신 'margin-left'를 사용
            }}
            level={10}
          >
            {/* Map 내용 */}

            {/* 리스트 클릭 마커 */}
            {markerImgToggle ? (
              <React.Fragment key={uuidv4()}>
                <MapMarker
                  clickable={true} // 임시(지도클릭막기)
                  position={markerImg.latlng}
                  title={markerImg.pla_name}
                  image={{
                    // 임시로 블로그에 투명이미지 올려서 사용 (투명이미지만들어서 변경해야함(변경완료))
                    src: '../img/map-marker-2-24.png',
                    // src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6DBqiID-0MCt6N6ATmxuHms-3v4HwMnyhw-pwx-MFIYxJyPdd7HwDhpCCZkMo3uhVR18&usqp=CAU',
                    size: {
                      width: 24,
                      height: 24,
                    }, // 마커이미지의 크기입니다
                    options: {
                      // offset: {
                      //   x: 27,
                      // y: 69,
                      // y: 0,
                      // }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    },
                  }}
                  onClick={(e) => markerClick(e)}
                />
                {/* 커스텀오버레이도 같이 찍기 */}
                <CustomOverlayMap
                  position={markerImg.latlng}
                  // xAnchor={0.4}
                  yAnchor={1.9}
                  // 커스텀 오버레이 위치 설정
                >
                  <div className="custom-overlay-div">
                    <div
                      className="center"
                      style={{
                        fontWeight: 400,
                        fontSize: '16px',
                        color: 'white',
                        padding: '3px 10px 3px 10px',
                        borderRadius: '50px',
                        // width: '21px',
                        // marginTop: '5px',
                        // marginLeft: '3px',
                        textAlign: 'center',
                      }}
                    >
                      {markerImg.pla_name}
                    </div>
                  </div>
                </CustomOverlayMap>
              </React.Fragment>
            ) : (
              ''
            )}

            {/* positions로 마커찍기 */}
            {myList.map((position, index) => (
              // React.Fragment: map안에서 여러개의 컴포넌트를 사용할때
              // <React.Fragment key={`${position.title}-${position.latlng}`}>
              <React.Fragment key={uuidv4()}>
                <MapMarker
                  clickable={true} // 임시(지도클릭막기)
                  position={position.latlng}
                  title={position?.pla_name}
                  image={{
                    // 임시로 블로그에 투명이미지 올려서 사용 (투명이미지만들어서 변경해야함)
                    src: '../img/invimage.png',
                    size: {
                      width: 24,
                      height: 24,
                    }, // 마커이미지의 크기입니다
                    options: {
                      offset: {
                        x: 11,
                        y: 10,
                      }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    },
                  }}
                  onClick={(e) => markerClick(e)}
                />
                {/* 커스텀오버레이도 같이 찍기 */}
                <CustomOverlayMap
                  zIndex={-99}
                  position={position.latlng}
                  // xAnchor={0.4}
                  // yAnchor={1}
                  // 커스텀 오버레이 위치 설정
                >
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
        </Col>
      </Row>
    </div>
    // </div>
    ////////////////////
    ////////////////////
  )
}

export default MakePlan
