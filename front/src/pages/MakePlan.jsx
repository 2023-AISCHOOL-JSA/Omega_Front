import '../css//App.css'
import '../css/reset.css'
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
import ListGroup from 'react-bootstrap/ListGroup'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Tab } from 'bootstrap'
import Tabs from 'react-bootstrap/Tabs'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import List from '../components/List'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Accordion from 'react-bootstrap/Accordion'
import AccordionList from '../components/AccordionList'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { createContext } from 'react'
// import 'react-calendar/dist/Calendar.css'; // css import
import Calendar from 'react-calendar'
import '../css//CalendarCustom.css'
import moment from 'moment'
import MakeModal from '../components/MakeModal'

export const data = createContext()
export const checkNumber = createContext()

const MakePlan = () => {
  // 메이크페이지 모달 state
  const [makePageModal, setMakePageModal] = useState(false)
  const [modalDataTemp, setModalDataTemp] = useState({})

  // 마커 이미지 관리 state
  const [markerImg, setMarkerImage] = useState('')
  // 최종 리스트 (이거 쓰시면 됩니다)
  const [lastMakePlan, setLastMakePlan] = useState()

  const makePlanStrat = () => {
    console.log('일정 생성 대기')
    console.log(myList)

    let myListObj = {}

    for (let [i, j] of myList.entries()) {
      myList
        .filter((item) => item.myDay == i + 1)
        .forEach((item) => {
          if (!myListObj[`day${i + 1}`]) {
            myListObj[`day${i + 1}`] = []
          }
          myListObj[`day${i + 1}`].push(item.pla_no)
        })
    }

    setLastMakePlan(myListObj)
  }

  // 마지막일정
  useEffect(() => {
    console.log(lastMakePlan, '마지막 일정 배열 확인')
    // console.log(JSON.stringify(lastMakePlan), '마지막 일정 배열 확인22222222')
    // console.log(
    //   JSON.parse(JSON.stringify(lastMakePlan ?? '')),
    //   '마지막 일정 배열 확인333333333333333'
    // )
  }, [lastMakePlan])

  // 마커클릭함수

  const markerClick = (e) => {
    const [markerClickEventData] = firstData2.filter(
      (item) => item.pla_name == e.Gb
    )

    console.log(markerClickEventData, 'markerClickEventData')
    console.log([markerClickEventData], '[markerClickEventData]')
    console.log(e.Gb)
    setModalDataTemp(markerClickEventData)
    setMakePageModal(!makePageModal)
  }

  // 카테고리 리스트 변수(state안써도될듯)
  const categories = [
    { sequence: '1', title: '추천', path1: './img/recom.png' },
    { sequence: '2', title: '식당', path1: './img/ress.png' },
    { sequence: '3', title: '명소', path1: './img/plac.png' },
    { sequence: '4', title: '숙소', path1: './img/reser.png' },
    { sequence: '5', title: '카페', path1: './img/cafe.png' },
    { sequence: '6', title: '체험', path1: './img/exercise.png' },
    { sequence: '7', title: '나의저장', path1: './img/hhhh.png' },
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
  const [showCalendar, setShowCalendar] = useState(false)
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
        }일`
      )
      const tempp = Array(dateRange[1].getDate() - dateRange[0].getDate() + 1)
        .fill(null)
        .map((_, i) => (i + 1).toString())
      setDays(tempp)
      console.log(tempp, 'tempptempptempptempp')
    }
  }
  useEffect(() => {
    // console.log(tempp, 'tempptempptempptempp')
    console.log(
      days.map((item) => (parseInt(item) - 1).toString()),
      '777777777777777777777777'
    )
  }, [days])

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
    // console.log(mydata2);

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
    // console.log(
    //   ~~result.destination.droppableId[10] + ~~result.destination.index,
    //   'zz'
    // )
    // console.log(~~result.source.index + ~~result.source.droppableId[10], 'xx')
    // Shallow copy of the array

    // console.log(items, 'myList복사한 items')
    const itemIndex = items.findIndex(
      (item) => item.pla_name === result.draggableId
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
          (item) => item.myDay == result.destination.droppableId[10]
        )[result.destination.index]
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
          .map((item, index) => (item.markerIndex = index + 1))
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
  // firstdata
  const firstData = [
    {
      pla_no: 1816,
      region_no: 26,
      region_sub: '영도구',
      pla_addr: '동삼동 1165',
      latlng: {
        lat: 35.0772042891,
        lng: 129.0819836173,
      },
      pla_name: '영도다리축제',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '영도구',
      pla_tel: '051-419-4064',
      pla_period: '20231013~20231015',
      pla_time: '11:00~21:00',
      pla_price: '무료',
      pla_info:
        '전국 유일의 도개식 다리축제로 전국적인 문화관광 명소로써의 영도브랜드 가치를 제고하고- 지역 주민과 함께 주민화합을 기반으로 한 민간 주도형 축제로서 영도다리축제를 운영하여- 영도의 관광산업 육성 및 관광상품 부가가치를 창출하는 문화관광축제이다.',
      pla_detail:
        '행사소개:전국 유일의 도개식 다리축제로 전국적인 문화관광 명소로써의 영도브랜드 가치를 제고하고- 지역 주민과 함께 주민화합을 기반으로 한 민간 주도형 축제로서 영도다리축제를 운영하여- 영도의 관광산업 육성 및 관광상품 부가가치를 창출하는 문화관광축제이다.\n행사내용:1. 대표프로그램 : 개막주제공연- 도개퍼포먼스- 영도다리야!- 만남의 다리- 해상 불꽃쇼- 축하공연(홍경민?고현주- 송가인)<br>2. 공연프로그램 : 영도트롯歌왕- Local star in 영도- 도전!영도골든벨- 영도다리축제 사생대회- 버스킹 공연<br>3. 부대프로그램 : 영도다리강습소- 영도씨네마- 쉼터 운영- 플리마켓- 아미르 구름놀이터- 응답하라 1950- 푸드트럭- 영도다리포차- 체험?전시?홍보부스(총 26개부스 운영)<br>4. 연계프로그램 : 영도낚시대회(동삼어촌계)- 아카이브 영도(영도문화도시센터)- 파친코로 만나는 영도투어(영도문화도시센터)- 해양레저체험(해양대학교)\n\n',
      pla_parking_yn: 'n',
      img: 'https://tong.visitkorea.or.kr/cms/resource/14/2738814_image2_1.jpg',
    },
    {
      pla_no: 1817,
      region_no: 44,
      region_sub: '논산시',
      pla_addr: '양촌면 양촌리454',
      latlng: {
        lat: 36.129305127,
        lng: 127.2472140672,
      },
      pla_name: '양촌곶감축제',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '논산시',
      pla_tel: '041-730- 2983',
      pla_period: '20231208~20231210',
      pla_time: '10:00 ~ 22:00',
      pla_price: '무료',
      pla_info:
        '대둔산과 접해있는 양촌면은 일교차가 크고 안개가 많다 예로부터 곶감 생산지로 유명한 곳이었으며- 곶감특구 지정- 품질인증 Q마크- 우수특산품 대상 선정 등 그 우수성은 이미 널리 알려져 있다.<br>\n맛과 과육이 탁월한 양촌 곶감의 우수성을 홍보하기 위해 개최 되는 양촌곶감축제에서는 감따기- 곶감깍기 등의 다양한 이벤트와 함께 수확의 기쁨을 체험할 수 있는 장이다.양촌곶감은 400여 농가가 대둔산 자락에 심어놓은 14만 그루의 감나무에서 연간 52톤을 생산- 60억원의 소득을 올리고 있다. 양촌면은 대둔산과 접해 있어 일교차가 크고 안개가 많아 예부터 곶감 생산지로 유명한 곳이며- 쫀득한 맛과 높은 당도로 도시 소비자에게 인기다.<br>\n맑고 깨끗한 환경에서 자란 품질 좋은 양촌의 농ㆍ특산물과 양촌사람들의 넉넉한 인심을 널리 알리는 계기가 되고 있는 충청도 특유의 인심 좋고 다양한 볼거리- 즐길거리가 있는 테마가 있는 축제로 지역 주민이나 전국에서 관광객들이 해마다 늘어나는 추세로 시민축제가 아닌 전국적인 축제로 거듭나고 있다.',
      pla_detail:
        '행사소개:대둔산과 접해있는 양촌면은 일교차가 크고 안개가 많다 예로부터 곶감 생산지로 유명한 곳이었으며- 곶감특구 지정- 품질인증 Q마크- 우수특산품 대상 선정 등 그 우수성은 이미 널리 알려져 있다.<br>\n맛과 과육이 탁월한 양촌 곶감의 우수성을 홍보하기 위해 개최 되는 양촌곶감축제에서는 감따기- 곶감깍기 등의 다양한 이벤트와 함께 수확의 기쁨을 체험할 수 있는 장이다.양촌곶감은 400여 농가가 대둔산 자락에 심어놓은 14만 그루의 감나무에서 연간 52톤을 생산- 60억원의 소득을 올리고 있다. 양촌면은 대둔산과 접해 있어 일교차가 크고 안개가 많아 예부터 곶감 생산지로 유명한 곳이며- 쫀득한 맛과 높은 당도로 도시 소비자에게 인기다.<br>\n맑고 깨끗한 환경에서 자란 품질 좋은 양촌의 농ㆍ특산물과 양촌사람들의 넉넉한 인심을 널리 알리는 계기가 되고 있는 충청도 특유의 인심 좋고 다양한 볼거리- 즐길거리가 있는 테마가 있는 축제로 지역 주민이나 전국에서 관광객들이 해마다 늘어나는 추세로 시민축제가 아닌 전국적인 축제로 거듭나고 있다.\n행사내용:1. 메인프로그램 : 양촌곶감요리경진대회- 메추리·송어·고구마 구워먹기- 양촌 감스토랑- 양촌곶감가요제- 양촌막춤경연대회<br>\n2. 부대프로그램 : 주민자치프로그램- 곶감덕장 포토존- 명품 양촌곶감 판매장<br>\n3. 소비자 참여 프로그램 : 송어낚시 체험- 논산시 농특산물 판매·홍보관- 논산딸기 홍보관 등<br>\n4. 기타 내용 : 푸드트럭- 인기가수 공연 등\n',
      pla_parking_yn: 'n',
      img: 'https://cdn.asiacenews.com/news/photo/201510/1029_949_1410.jpg',
    },
    {
      pla_no: 1818,
      region_no: 28,
      region_sub: '부평구',
      pla_addr: '부평대로 166 원평빌딩',
      latlng: {
        lat: 37.506198346,
        lng: 126.7216155851,
      },
      pla_name: '부평풍물대축제',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '인천광역시부평구',
      pla_tel: '032-509-7516',
      pla_period: '20230922~20230924',
      pla_price: '무료',
      pla_info:
        '부평풍물대축제는 풍물과 지역의 문화관광콘텐츠(세계최대의 지하상가-기네스 등재- 재즈의 발상지 부평음악도시- 미군부대 등)를 결합하여 공연문화와 풍성한 볼거리를 선보인다. 도심 속 8차선 대로가 축제의 장으로 펼쳐지는 거리축제로써- 시민이 직접 참여하여 만들어 가는 시민축제- 풍물난장- 거리공연과 더불어 풍성한 볼거리- 다양한 체험행사를 만나볼 수 있다.',
      pla_detail:
        '행사소개:부평풍물대축제는 풍물과 지역의 문화관광콘텐츠(세계최대의 지하상가-기네스 등재- 재즈의 발상지 부평음악도시- 미군부대 등)를 결합하여 공연문화와 풍성한 볼거리를 선보인다. 도심 속 8차선 대로가 축제의 장으로 펼쳐지는 거리축제로써- 시민이 직접 참여하여 만들어 가는 시민축제- 풍물난장- 거리공연과 더불어 풍성한 볼거리- 다양한 체험행사를 만나볼 수 있다.\n행사내용:1. 메인 프로그램<br>  - 개/폐막식 공식행사- 기원제- 전통풍물공연- 부평만만세(퍼레이드)<br><br>  2. 부대 프로그램<br>  - 인증공연- 창작연희 우수공연 초청프로그램- 청년DJ파티- 예술놀이터- 전국국악경연대회<br><br>  3. 체험 프로그램<br>  - 전통문화체험 및 민속놀이체험 등\n',
      pla_parking_yn: 'n',
      img: 'https://img6.yna.co.kr/etc/inner/PR/2023/09/25/RPR20230925005700353_01_i_P2.jpg',
    },
    {
      pla_no: 1819,
      region_no: 42,
      region_sub: '원주시',
      pla_addr: '단구로 170(명륜동)',
      latlng: {
        lat: 37.3363874827,
        lng: 127.9464176429,
      },
      pla_name: '원주 댄싱카니발',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '원주시',
      pla_tel: '033-760-9881~4',
      pla_period: '20230922~20230924',
      pla_info:
        '원주 댄싱카니발은 댄스를 주제로 하여 시민이 직접 기획부터 무대에 오르기까지 단계별 참여할 수 있는 구조를 마련한 시민주도형 축제이다. 2023년 새롭게 선보이는 기존 퍼레이드형 무대가 아닌 무대형 퍼포먼스로 다채로운 콘텐츠를 감상할 수 있으며- 매년 국내외 많은 팀이 개성있는 무대를 펼친다.',
      pla_detail:
        '행사소개:원주 댄싱카니발은 댄스를 주제로 하여 시민이 직접 기획부터 무대에 오르기까지 단계별 참여할 수 있는 구조를 마련한 시민주도형 축제이다. 2023년 새롭게 선보이는 기존 퍼레이드형 무대가 아닌 무대형 퍼포먼스로 다채로운 콘텐츠를 감상할 수 있으며- 매년 국내외 많은 팀이 개성있는 무대를 펼친다.\n행사내용:1. 메인 프로그램<br>  - 댄싱카니발 경연: 퍼레이드형 퍼포먼스 경연으로 30~100여명으로 구성된 참가팀의 경연<br><br> 2. 부대 프로그램<br>  - 문화예술공연: 테마형 대형 퍼포먼스- 일자별 주제공연 등<br>  - 프린지 페스티벌<br>  - 프리 댄싱페스타<br><br> 3. 소비자 참여 이벤트<br>  - 플레이 그라운드: 기획 체험전- 놀이마당- 체험부스 운영<br><br>  4. 기타(먹거리 등)<br>  - 마켓 플레이스: 프리마켓- 푸드코드- 지역 특산품 판매<br><br>[축제 먹거리 알리오] 축제 1주일 전 공개 예정\n',
      pla_parking_yn: 'n',
      img: 'https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/Z5IIIHUCROYFIGNA5E6XMHMUZ4.jpg',
    },
    {
      pla_no: 1820,
      region_no: 44,
      region_sub: '서산시',
      pla_addr: '남문2로 143 해미읍성',
      latlng: {
        lat: 36.7136037541,
        lng: 126.5503944175,
      },
      pla_name: '서산해미읍성축제',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '서산시',
      pla_tel: '041-660-2697',
      pla_period: '20231006~20231008',
      pla_time:
        '1일차 : 17:00 ~ 22:00 (개막식 : 19:00)<br>2일차 : 11:00 ~ 22:00<br>3일차 : 11:00 ~ 22:00',
      pla_price: '무료(일부프로그램 유료)',
      pla_info:
        '서산해미읍성축제는 개최 20회차를 맞아- 선조들의 축성기술과 천혜의 자연풍광이 빚어낸 600년 역사를 품은 고성(古城)인 서산해미읍성을 활용해 낮에는 따사로운 가을 햇살 아래 한가로이 품격있는 문화공연을 감상하며 즐기는 피크닉을 통해 쉼과 여유를 만끽하고- 밤에는 드론쇼 및 야간 테마파크 조성과 유등 전시 등 기존 축제에서는 찾아볼 수 없었던 다채로운 신규 야간 컨텐츠를 도입한다.',
      pla_detail:
        '행사소개:서산해미읍성축제는 개최 20회차를 맞아- 선조들의 축성기술과 천혜의 자연풍광이 빚어낸 600년 역사를 품은 고성(古城)인 서산해미읍성을 활용해 낮에는 따사로운 가을 햇살 아래 한가로이 품격있는 문화공연을 감상하며 즐기는 피크닉을 통해 쉼과 여유를 만끽하고- 밤에는 드론쇼 및 야간 테마파크 조성과 유등 전시 등 기존 축제에서는 찾아볼 수 없었던 다채로운 신규 야간 컨텐츠를 도입한다.\n',
      pla_parking_yn: 'n',
      img: 'https://www.goodmorningcc.com/news/photo/202210/277607_301866_2936.jpg',
    },
    {
      pla_no: 1821,
      region_no: 48,
      region_sub: '통영시',
      pla_addr: '중앙로 65 통영시립박물관',
      latlng: {
        lat: 34.8406409026,
        lng: 128.4169561456,
      },
      pla_name: '통영한산대첩축제',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '통영시',
      pla_tel: '055-644-5222',
      pla_period: '20230804~20230812',
      pla_time: '18:00 ~ 22:00<br>일부 프로그램 상이함',
      pla_price: '무료(부분 유료)',
      pla_info:
        '제62회 통영한산대첩축제는 2023년8월4일(금) ~ 8월12일(토)까지 9일간 통영 삼도수군통제영 및 통영시 일원(도서지역 포함)에서 개최된다. 축제는 (재)통영한산대첩문화재단에서 주관하고 문화체육관광부- 경상남도- 한국관광공사- 해군본부에서 후원한다. 축제에는 한산대첩 431주년 및 한산도 통제영 설치 430주년을 기념하고 충무공 이순신 장군의 구국 정신을 기리는 프로그램이 구성되어 있다. 또한- 제62회 축제에는 외국인을 대상으로 K-컬쳐 관광이벤트를 펼치며- 축제의 시간적·공간적 확장을 통해 지역의 야간상권과 관광시장을 활성화 시킨다.',
      pla_detail:
        '행사소개:제62회 통영한산대첩축제는 2023년8월4일(금) ~ 8월12일(토)까지 9일간 통영 삼도수군통제영 및 통영시 일원(도서지역 포함)에서 개최된다. 축제는 (재)통영한산대첩문화재단에서 주관하고 문화체육관광부- 경상남도- 한국관광공사- 해군본부에서 후원한다. 축제에는 한산대첩 431주년 및 한산도 통제영 설치 430주년을 기념하고 충무공 이순신 장군의 구국 정신을 기리는 프로그램이 구성되어 있다. 또한- 제62회 축제에는 외국인을 대상으로 K-컬쳐 관광이벤트를 펼치며- 축제의 시간적·공간적 확장을 통해 지역의 야간상권과 관광시장을 활성화 시킨다.\n행사내용:1. 대표행사<br>    - 삼도수군통제사 행차 및 임진왜란 3대 대첩지 ‘수문장 사열식’ <br>    - 삼도수군 군점 및 수조재현<br>    - 한산대첩 재현(대한민국 공군 ‘블랙이글스’ 에어쇼- 수군수군 콘서트(해군군악연주회)- 해상선박 퍼레이드- 조선수군 무예시연 및 퍼포먼스- 한산해전재현- 한산해전 승전불꽃놀이 및 해상 레이져쇼- 풍물패 승전 길놀이)<br>    - 제14회 통영 거북선 노젓기대회(학생부- 일반부)<br><br>  2.한산대첩기념행사 <br>    - 고유제<br>    - 제62회 통영한산대첩축제 개막식 및 특별기획공연(드론라이트쇼 및 개막 축하 불꽃놀이)<br>    - 제62회 통영한산대첩축제 축하음악회<br>    - 한산해전 출정식(강강술래 공연- 국가무형문화재‘승전무’ 공연- 조선수군 무예시연)<br>    - K-컬쳐 관광이벤트 100선 선정기념 ‘K-POP 랜덤플레이댄스’<br>    - 통영한산대첩축제 62주년 축하공연 ‘통제영의 밤’<br>    - 통제영 300년 ‘수조도’ 깃발전<br>    - 판옥선다이닝<br><br>  3. 이순신학교<br>    - 한산대첩 ‘승전고를 울려라’<br>    - 통제영 역사탐험 ‘통제사의 일기’<br>    - 이순신 장군 해전승리 및 삼도수군통제영 병영체험마당<br>    - 삼도수군통제영 무과 체험마당 및 무예극 ‘방비’ 공연<br>    - 꿈틀꿈틀 청소년뮤지컬 ‘학의 날개’ 공연<br>    - 통제영 어린이극장<br><br>  4. 해양레져스포츠 행사<br>    - 한산대첩 워터파크 및 해양레져스포츠타운<br>    - 제11회 해양수산부장관배 전국 카약대회<br>    - 한산대첩재현 해상관람<br>    - 한산대첩 승전항로 해상투어<br><br>  5. 문화예술행사<br>    - 국가무형문화재 ‘남해안별신굿- 통영오광대- 승전무’ 공연<br>    - 찾아가는 통영한산대첩축제(용남면- 한산도- 사량도- 욕지도)<br>    - 통영 거북선 음악회<br>    - 1318!! 통영의 꿈(청소년댄싱경연대회)<br>    - 통제영 12공방 in 통영 전통공예 체험마당<br>    - 버블 코스프레 거리퍼레이드 및 시민대동한마당<br>    - 한 여름밤의 EDM SHOW<br>    - 추억의 DJ MUSIC BOX 및 푸드트럭 존<br>    - 한산대첩 플리마켓 및 통영 술 문화축제<br><br>  6. 축제 교류 및 협력 행사<br>    - 자매도시 과천시 예술단 초청공연<br>    - 명량대첩축제 교류 행사 ‘강강술래’<br>    - 임진왜란 3대 대첩 교류 행사(경남 통영시- 경남 진주시- 경기도 고양시)<br>    - 임진왜란 3대 대첩 지역 캐릭터 유등 전시회 <br><br>  7. 학술발표회<br>    - 한산도 통제영 설치 430주년 기념 학술발표회 ‘최초의 통제영 한산도’ \n',
      pla_parking_yn: 'n',
    },
    {
      pla_no: 1822,
      region_no: 44,
      region_sub: '서천군',
      pla_addr: '한산면 충절로 1089',
      latlng: {
        lat: 36.079925195,
        lng: 126.7987054614,
      },
      pla_name: '한산모시문화제',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '서천군',
      pla_tel: '041-950-4256',
      pla_period: '20230609~20230611',
      pla_price: '무료 / 일부 체험 프로그램 유료 운영',
      pla_info:
        '주민주도형 축제인 한산모시문화제는 주민이 직접 기획부터 행사장 구성까지 축제 전 준비과정에 참여한다. 한산모시문화제는 매년 6월 둘째주 서천 한산면 한산모시관 일원에서 개최되며- 한산모시학교- 미니베틀짜기- 저산팔읍길쌈놀이 등 유네스코 인류무형문화유산을 직접 체험하는 프로그램이 준비되어 있다.',
      pla_detail:
        "행사소개:주민주도형 축제인 한산모시문화제는 주민이 직접 기획부터 행사장 구성까지 축제 전 준비과정에 참여한다. 한산모시문화제는 매년 6월 둘째주 서천 한산면 한산모시관 일원에서 개최되며- 한산모시학교- 미니베틀짜기- 저산팔읍길쌈놀이 등 유네스코 인류무형문화유산을 직접 체험하는 프로그램이 준비되어 있다.\n행사내용:1. 메인 프로그램<br> - 한산모시학교: 무형문화재인 방연옥 선생님과 함꼐 유네스코 인류무형문화유산 '한산모시짜기' 배우기<br> - 저산팔읍길쌈놀이: 모시의 생산 과정을 공연의 형태로 보여주며 전통문화의 명맥을 잇기 위하여 지역 청소년들이 함께 참가하는 공연<br> - 모시미니베틀 체험: 한산모시의 본질을 그대로 느낄 수 있는 프로그램으로 소형베틀로 모시를 짜는 참여형 프로그램<br><br> 2. 부대 프로그램<br> - 신진 디자이너 공모전<br> - 어린이모시동요대회<br><br> 3. 소비자 참여 프로그램<br> - 모시전통마당: 한산모시학교- 전통문화체험<br> - 모시맞이마당: 모시옷입기체험<br> - 모시체험마당: 미니베틀짜기 체험- 한산주막- 농촌 체험- 119 안전 체험<br> - 모시놀이마당: 키자니아고- 공방상설체험- 모빌리티&드론 체험<br><br> 4. 기타(먹거리 등)<br> - 모시만남마당: 주민예술공연- 먹거리부스- 특산품 판매\n출     연:6.10. 송가인- 6.11. 알리\n",
      pla_parking_yn: 'n',
    },
    {
      pla_no: 1823,
      region_no: 11,
      region_sub: '송파구',
      pla_addr: '올림픽로 424 올림픽공원',
      latlng: {
        lat: 37.5206092598,
        lng: 127.1150682209,
      },
      pla_name: '한성백제문화제',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '송파구',
      pla_tel: '02-2147-2800',
      pla_period: '20230922~20230924',
      pla_time: '10:00~21:00',
      pla_price: '유/무료(유료 체험프로그램은 2000원~12000원)',
      pla_info:
        '고대왕국인 한성백제의 도읍지인 송파에서 백제가 남긴 위대한 문화유산을 토대로 백제의 자취를 느낄 수 있는 체험마당을 운영하고- 한성백제 때부터 이어져 내려온 문화를 느낄 수 있는 공연 프로그램을 기획하여 한성백제 시대를 시민들에게 알리고 외국인들과 함께하는 문화축제이다.',
      pla_detail:
        '행사소개:고대왕국인 한성백제의 도읍지인 송파에서 백제가 남긴 위대한 문화유산을 토대로 백제의 자취를 느낄 수 있는 체험마당을 운영하고- 한성백제 때부터 이어져 내려온 문화를 느낄 수 있는 공연 프로그램을 기획하여 한성백제 시대를 시민들에게 알리고 외국인들과 함께하는 문화축제이다.\n행사내용:1. 메인프로그램 : 개막식<br>2. 부대프로그램 : 폐막식- 한성문화콘서트<br>3. 소비자 참여 프로그램 : 체험마을- 먹거리장터<br>4. 기타 내용 :  한마음 어울마당- 송파구민의 날 기념식\n',
      pla_parking_yn: 'n',
    },
    {
      pla_no: 1824,
      region_no: 46,
      region_sub: '함평군',
      pla_addr: '함평읍 곤재로 27',
      latlng: {
        lat: 35.0592031554,
        lng: 126.5222114574,
      },
      pla_name: '함평나비대축제',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '함평군',
      pla_tel: '061-320-2238',
      pla_period: '20230428~20230507',
      pla_time: '9:00 ~ 18:00',
      pla_price: '유료(홈페이지 참조)',
      pla_info:
        '4월- 전라남도 함평에서 나비와 꽃- 곤충을 주제로 한 함평나비대축제가 열린다. 알에서부터 애벌레를 거쳐 나비가 되기까지의 성장과장을 알아보거나 세계 각국의 나비와 곤충 표본 450종 9-000여 마리를 구경하고- 생태환경에 대한 다양한 체험이 가능한 축제이다.',
      pla_detail:
        '행사소개:4월- 전라남도 함평에서 나비와 꽃- 곤충을 주제로 한 함평나비대축제가 열린다. 알에서부터 애벌레를 거쳐 나비가 되기까지의 성장과장을 알아보거나 세계 각국의 나비와 곤충 표본 450종 9-000여 마리를 구경하고- 생태환경에 대한 다양한 체험이 가능한 축제이다.\n행사내용:1. 체험프로그램<br>  - 가족과 함께하는 나비날리기(실내 / 실외)<br>  - 나비놀이터<br>  - 젓소목장 나들이 체험<br>  - VR체험장<br>  - 전통민속놀이 체험장 등<br><br>  2. 문화 예술행사<br>  - 개막식 주제공연<br>  - 어린이날 한마당 잔치 및 경연대회<br>  - 군민의날 행사 및 어버이날 기념행사<br>  - 지역예술단체 공연<br><br>  3. 전시행사<br>  - 나비곤충생태관<br>  - 수생식물관<br>  - 다육식물관<br>  - 친환경농업관<br>  - 군립미술관(특별 기획전)<br>  - 황금박쥐 전시관<br><br>  4. 판매장터<br>  - 농특산물 전시- 판매장<br>  - 수공예품 판매장<br>  - 함평천지 한우 판매장<br>  - 먹거리 장터\n',
      pla_parking_yn: 'n',
    },
    {
      pla_no: 1825,
      region_no: 42,
      region_sub: '화천군',
      pla_addr: '화천읍 산천어길 137',
      latlng: {
        lat: 38.1126818434,
        lng: 127.7099022603,
      },
      pla_name: '얼음나라화천 산천어축제',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '화천군',
      pla_tel: '1688-3005',
      pla_period: '20230107~20230129',
      pla_time: '9:00~18:00<br>(얼음낚시 야간 19:00~21:00)',
      pla_price:
        '행사 홈페이지 참고<a href=http://www.narafestival.com"" target=""_blank"" title=""새창: 산천어 축제 홈페이지로 이동"">http://www.narafestival.com</a>""',
      pla_info:
        '강원도 화천에서 열리는 얼음나라 화천산천어축제는 2011년 미국 CNN이 선정한 ‘겨울의 7대불가사의’ 중 하나로 꼽힌 이색 겨울축제이다. 물 맑기로 유명한 화천천이 겨울 추위에 꽁꽁 얼어붙는 매년 1월에 축제가 열리며- 얼음낚시로 ‘계곡의 여왕’이라 불리는 산천어를 잡을 수 있다. 산천어 얼음낚시의 손맛을 즐길 수 있어서 매년 100만 명 이상이 방문하고 있다. 산천어축제에서는 직접 잡은 산천어를 그 자리에서 맛볼 수 있다. 300마리를 한꺼번에 구울 수 있는 초대형 구이통을 이용해서 산천어를 구워 먹을 수 있으며- 회센터에서 회를 떠서 산천어의 맛을 즐길 수도 있다. 얼음낚시 이외에도 루어낚시- 수상낚시- 산천어 맨손잡기 체험도 할 수 있다. 얼음 미끄럼틀과 눈썰매- 봅슬레이- 피겨스케이트- 얼음축구 등의 체험도 가능하다. <br><br>[축제TIP] 산천어란?<br>연어과에 속하는 어종으로 물이 맑고 수온이 연중 20℃를 넘지 않는 1급수 맑은 계곡에서 서식한다. <br>아미노산- 필수지방산- 비타민 등이 풍부해 몸에도 좋고 맛도 좋은 물고기다.',
      pla_detail:
        '행사소개:강원도 화천에서 열리는 얼음나라 화천산천어축제는 2011년 미국 CNN이 선정한 ‘겨울의 7대불가사의’ 중 하나로 꼽힌 이색 겨울축제이다. 물 맑기로 유명한 화천천이 겨울 추위에 꽁꽁 얼어붙는 매년 1월에 축제가 열리며- 얼음낚시로 ‘계곡의 여왕’이라 불리는 산천어를 잡을 수 있다. 산천어 얼음낚시의 손맛을 즐길 수 있어서 매년 100만 명 이상이 방문하고 있다. 산천어축제에서는 직접 잡은 산천어를 그 자리에서 맛볼 수 있다. 300마리를 한꺼번에 구울 수 있는 초대형 구이통을 이용해서 산천어를 구워 먹을 수 있으며- 회센터에서 회를 떠서 산천어의 맛을 즐길 수도 있다. 얼음낚시 이외에도 루어낚시- 수상낚시- 산천어 맨손잡기 체험도 할 수 있다. 얼음 미끄럼틀과 눈썰매- 봅슬레이- 피겨스케이트- 얼음축구 등의 체험도 가능하다. <br><br>[축제TIP] 산천어란?<br>연어과에 속하는 어종으로 물이 맑고 수온이 연중 20℃를 넘지 않는 1급수 맑은 계곡에서 서식한다. <br>아미노산- 필수지방산- 비타민 등이 풍부해 몸에도 좋고 맛도 좋은 물고기다.\n\n행사내용:산천어 체험 : 얼음낚시 (현장/예약)- 맨손잡기- 루어낚시<br>눈/얼음 체험 : 눈썰매- 얼음썰매- 하늘가르기- 얼곰이성 미끄럼틀- 얼음축구- 컬링- 피겨 스케이트- 빙판 버블슈트<br>문화/이벤트 : 축제 여는마당- 화천 복불복 이벤트- 얼음나라 방송국- 호국이 체험존- 화천 관광 홍보관- 산천어 신년운세 - 산천어와 화천 네컷 등<br>편의/안전 : 종합안내센터- 낚시 가이드- 몸녹임/유아쉼터- 이동도우미- 의료센터- 재난구조대-화천소방서 등<br>먹거리/살거리 : 산천어식당- 산천어 회센터/구이터- 농특산물 판매점- 기념품 판매점 등<br>연계 행사 및 관광지: 선등거리 페스티벌- 세계최대 실내 얼음조각광장- 산천어 공방- 산타우체국 한국 본점- 백암산 케이블카 등\n',
      pla_parking_yn: 'n',
    },
    {
      pla_no: 1826,
      region_no: 41,
      region_sub: '고양시',
      pla_addr: '일산동구 호수로 595',
      latlng: {
        lat: 37.6538792239,
        lng: 126.7686654803,
      },
      pla_name: '고양호수예술축제',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '고양시',
      pla_tel: '1588-7766',
      pla_period: '20231006.0~20231009.0',
      pla_time: '13:00 ~20:00',
      pla_price: '무료',
      pla_info:
        '2023 고양호수예술축제는 일상 속 공간인 거리를 특별함 가득한 무대로 전환하고- 관객의 발걸음 닿는 곳마다 예술을 만나는 새로운 경험을 선사하고자 한다. 호수·거리·자연·사람이 어우러진 도심의 축제- 대한민국을 대표하는 거리예술축제인 고양호수예술축제를 오는 10월에 개최된다.',
      pla_detail:
        '행사소개:2023 고양호수예술축제는 일상 속 공간인 거리를 특별함 가득한 무대로 전환하고- 관객의 발걸음 닿는 곳마다 예술을 만나는 새로운 경험을 선사하고자 한다. 호수·거리·자연·사람이 어우러진 도심의 축제- 대한민국을 대표하는 거리예술축제인 고양호수예술축제를 오는 10월에 개최된다. \n행사내용:대표 프로그램<br>1. 개막작 <호수 판타지아>- 폐막작 <파이오니어- 비상(飛上)!><br>2. 불꽃드론 쇼<br>3. 100회 이상의 거리공연\n',
      pla_parking_yn: 'n',
    },
    {
      pla_no: 1827,
      region_no: 45,
      region_sub: '고창군',
      pla_addr: '녹두로 1265 고창군농산물유통센타고창군 농산물유통센터 일원',
      latlng: {
        lat: 35.4337773663,
        lng: 126.6846960753,
      },
      pla_name: '고창해풍고추축제',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '고창해풍고추축제위원회',
      pla_tel: '063-564-2009- 063-564-6188',
      pla_period: '20230826.0~20230827.0',
      pla_time: '10:00~19:00',
      pla_price: '무료',
      pla_info:
        "유네스코 생물권 보전지역인 청정 고창의 바닷바람을 맞고 자란 고창해풍고추를 테마로 '제27회 고창해풍고추축제'를 개최한다. 게르마늄과 미네랄이 풍부한 고창 해풍고추를 저렴하게 살 수 있다.",
      pla_detail:
        "행사소개:유네스코 생물권 보전지역인 청정 고창의 바닷바람을 맞고 자란 고창해풍고추를 테마로 '제27회 고창해풍고추축제'를 개최한다. 게르마늄과 미네랄이 풍부한 고창 해풍고추를 저렴하게 살 수 있다.\n행사내용:1. 개막행사 : 식전공연- 기념식 등<br>2. 공연행사 : 개막 축하공연- 버스킹 등<br>3. 경연/체험행사 : 해풍고추 품평회- 해풍고추 깜짝 경매- 고추모종 심기 등<br>4. 부대행사 : 해풍고추 직거래 장터- 보부상 프로그램- 팸투어 등\n",
      pla_parking_yn: 'n',
    },
    {
      pla_no: 1828,
      region_no: 44,
      region_sub: '홍성군',
      pla_addr: '광천읍 광천로285번길 8-16',
      latlng: {
        lat: 36.5006767661,
        lng: 126.6249711176,
      },
      pla_name: '광천 김?토굴새우젓 대축제',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '광천 김?토굴새우젓 대축제 추진위원회',
      pla_tel: '041-641-3946',
      pla_period: '20231013.0~20231015.0',
      pla_time: '11:00 ~ 20:00',
      pla_price: '무료',
      pla_info:
        '국민반찬 광천 김과 가을 김장철의 전령사 광천토굴새우젓이 만났다.<br>\n미식의 계절 가을에 광천에서만 즐길 수 있는 광천 김?토굴새우젓 대축제에서는 안전한 우리 수산물과 제철 로컬푸드를 즐길 수 있을 뿐만 아니라 남녀노소 누구나 참여할 수 있는 다양한 체험프로그램이 준비되어 있다. 광천 김?토굴새우젓 대축제에서 맛있는 가을을 멋있는 가을을 즐길 수 있다.',
      pla_detail:
        "행사소개:국민반찬 광천 김과 가을 김장철의 전령사 광천토굴새우젓이 만났다.<br>\n미식의 계절 가을에 광천에서만 즐길 수 있는 광천 김?토굴새우젓 대축제에서는 안전한 우리 수산물과 제철 로컬푸드를 즐길 수 있을 뿐만 아니라 남녀노소 누구나 참여할 수 있는 다양한 체험프로그램이 준비되어 있다. 광천 김?토굴새우젓 대축제에서 맛있는 가을을 멋있는 가을을 즐길 수 있다.\t\n행사내용:1. 메인프로그램 <br>\n10월 13일(금) 첫째날  보부상 장꾼 행렬 퍼포먼스- 개막식- 개막축하공연<br>\n10월 14일(토) 둘째날 81m 김밥말기- 관광객 노래자랑- 군민노래자랑 <br>\n10월 15일(일) 셋째날 퓨전국악 해드림- 전국 주부가요제 본선<br><br>\n2. 부대프로그램 <br>\n10월 13일(금) 제10회 홍성 전국주부가요제 예선 10월 15일(일) 제10회 홍성 전국주부가요제 본선<br>\n10월 14일(토) 광천 특산품 수출 상담회<br><br>\n3. 소비자 참여 프로그램<br>\n81m 김밥말기- 김구이 체험- 토굴새우젓 김장김치 담그기- 광천 김.새우 떡매치기- 토굴체험- 김을 갖고 튀어라-\n찾아라! 깃발- 젓갈 백반 시식- 소고기&돼지고기 시식- 전통놀이 체험 등<br><br>\n4. 기타 내용 <br>\n세계최대! 세계최초! 바다새우 만마리 수묵화 '만하도 전시' <br>\n기간:9월 26일 ~ 11월 26일(10시~17시) 장소:광천 토굴새우젓 홍보전시관\t\n\n",
      pla_parking_yn: 'n',
    },
    {
      pla_no: 1829,
      region_no: 47,
      region_sub: '포항시',
      pla_addr: '남구 희망대로 850 문화예술회관',
      latlng: {
        lat: 36.0096547491,
        lng: 129.3660493028,
      },
      pla_name: '일월문화제',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '포항시',
      pla_tel: '054-289-7855',
      pla_period: '20231012.0~20231015.0',
      pla_time: '13:00 ~ 20:00',
      pla_price: '무료',
      pla_info:
        '일월문화제는 삼국유사에 등장하는 연오랑(해)- 세오녀(달) 부부의 설화에 얽힌 일월사상에서 비롯된 문화예술축제이다.<br>\n격년으로 개최되는 종합문화제로- 포항문화예술회관- 해도도시숲- 연오랑세오녀테마공원 등 포항시 곳곳에서 연오랑 세오녀 부부선발대회- 일월신제봉행- 주제공연- 기획전시 등 다채로운 프로그램이 진행된다.',
      pla_detail:
        '행사소개:일월문화제는 삼국유사에 등장하는 연오랑(해)- 세오녀(달) 부부의 설화에 얽힌 일월사상에서 비롯된 문화예술축제이다.<br>\n격년으로 개최되는 종합문화제로- 포항문화예술회관- 해도도시숲- 연오랑세오녀테마공원 등 포항시 곳곳에서 연오랑 세오녀 부부선발대회- 일월신제봉행- 주제공연- 기획전시 등 다채로운 프로그램이 진행된다.\t\t\n\n행사내용:1. 메인프로그램 : 개막행사- <연오랑세오녀 부부 선발대회>- 기획공연<연오랑이 사라졌다?>- 기획전시<세오와 비단의 숲> 등 <br>\n2. 체험 프로그램 : <어서온나 일월村>- <일월 文化財 야행>- <일월 村 예술장터> 등 <br>\n3. 연계 프로그램 : <열린세대전>- <전국사진공모전>- <포항서예대전> 등\t\t\n\n',
      pla_parking_yn: 'n',
    },
    {
      pla_no: 1830,
      region_no: 30,
      region_sub: '유성구',
      pla_addr: '엑스포로 107 대전컨벤션센터',
      latlng: {
        lat: 36.3750212633,
        lng: 127.391694541,
      },
      pla_name: '대전 국제 와인 EXPO',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '대전관광공사',
      pla_tel: '042-250-6235/6236',
      pla_period: '20230903.0~20230910.0',
      pla_time: '11:00 ~ 18:00 (단- 9.8(금)은 19:00까지 운영)',
      pla_price: '유료(가격미정)',
      pla_info:
        "대전 국제 와인 EXPO는 와인과 문화가 함께하는 대한민국 대표 와인 축제이다. <br>국제와인기구(OIV)의 승인을 받은 세계 3대 와인 품평회 중 하나인 '아시아와인트로피'와 연계하여 이탈리아- 프랑스- 독일 등 30여 개국에서 생산한 다양한 와인을 한자리에서 만나볼 수 있는 국내 최대의 와인 전문 박람회이다. 와인 산업 종사자에게는 비즈니스 교류의 장을- 일반 참관객에게는 각국의 문화와 와인을 접할 수 있는 기회를 제공한다. 와인 전문가는 물론 와인 애호가도 참가하여 와인에 대한 폭넓은 지식을 마련할 수 있는 '국제와인컨퍼런스'- '한국 국가대표 소믈리에 경기대회' 등의 연계행사와 각종 문화 공연과 같은 다채로운 부대행사도 마련된다.",
      pla_detail:
        "행사소개:대전 국제 와인 EXPO는 와인과 문화가 함께하는 대한민국 대표 와인 축제이다. <br>국제와인기구(OIV)의 승인을 받은 세계 3대 와인 품평회 중 하나인 '아시아와인트로피'와 연계하여 이탈리아- 프랑스- 독일 등 30여 개국에서 생산한 다양한 와인을 한자리에서 만나볼 수 있는 국내 최대의 와인 전문 박람회이다. 와인 산업 종사자에게는 비즈니스 교류의 장을- 일반 참관객에게는 각국의 문화와 와인을 접할 수 있는 기회를 제공한다. 와인 전문가는 물론 와인 애호가도 참가하여 와인에 대한 폭넓은 지식을 마련할 수 있는 '국제와인컨퍼런스'- '한국 국가대표 소믈리에 경기대회' 등의 연계행사와 각종 문화 공연과 같은 다채로운 부대행사도 마련된다. \n행사내용:1. 주요행사 : <br>와인&주류 박람회(9.8~10)<br>와인문화행사(9.4~9.10)<br><br>2. 와인전문프로그램 : <br>2023 아시아와인트로피(9.3~6)<br>2023 국제와인컨퍼런스(9.4~7)<br>제 19회 한국 국가대표 소믈리에 경기대회(9.8~9)\n",
      pla_parking_yn: 'n',
    },
    {
      pla_no: 1831,
      region_no: 47,
      region_sub: '경주시',
      pla_addr: '교동274 (경주 봉황대 및 월정교)',
      latlng: {
        lat: 35.8294084002,
        lng: 129.2173202887,
      },

      pla_name: '신라문화제',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '경주시',
      pla_tel: '054-777-5953~4',
      pla_period: '20231013.0~20231015.0',
      pla_time: '15:00~24:00',
      pla_price: '무료',
      pla_info:
        '신라문화제는 1962년 제1회를 시작으로 올해까지 제50회를 맞이하였다. <br>2023 제50회 신라문화제는 신라의 태동을 알리는 화려한 퍼포먼스가 펼쳐질 화백제전부터- 수많은 아티스트들의 화려한 공연이 연이어 펼쳐지는 거리예술축제- 실크로드 페스타 등 시민들과 관광객의 오감을 사로잡는 프로그램이 축제 기간 경주에서 선보인다.',
      pla_detail:
        '행사소개:신라문화제는 1962년 제1회를 시작으로 올해까지 제50회를 맞이하였다. <br>2023 제50회 신라문화제는 신라의 태동을 알리는 화려한 퍼포먼스가 펼쳐질 화백제전부터- 수많은 아티스트들의 화려한 공연이 연이어 펼쳐지는 거리예술축제- 실크로드 페스타 등 시민들과 관광객의 오감을 사로잡는 프로그램이 축제 기간 경주에서 선보인다.\n행사내용:예술제 : 10. 6.(금) ~ 8.(일)<br>축   제 : 10. 13.(금) ~ 15.(일)<br><br>경주 월정교 일원 주요 프로그램<br>1. 화백제전 <br>  - 일시 : 10. 13.(금) 19:00 ~ 20:00<br>  - 내용 : 월정교를 빛낼 화려한 불꽃과 수상공연으로 경주의 서사를 그리다<br><br>경주 시내 일원 주요 프로그램<br>1. 실크로드 페스타<br>  - 일시 : 10. 13.(금) ~ 15.(일) 15:00 ~ 22:00<br>  - 내용 : 거리에서 우연히 마주친 고품격 빅재미 공연! 경주만의 거리예술축제 <br><br>2. 달빛난장<br>  - 일시 : 10. 13.(금) ~ 15.(일) 15:00 ~ 24:00 <br>  - 내용 : 도심 속에서 즐기는 감성 한 스푼- 낭만 한 잔. <br><br>3. 화랑무도회<br>  - 일시 : 10. 14.(토) 17:00 ~ 22:00 <br>  - 내용 : 고분을 뒤흔들 힙합 비트! 화랑과 힙합이 만나다.<br><br>시민과 함께! 만들어가는 신라문화제<br>1. 시민 서포터즈 <br>  - 기간 : 3월 ~ 10월 <br>  - 내용 : 경주 시민의 눈으로 축제를 소개해요.<br><br>2. 청소년 그린리더 <화랑원화단><br>  - 기간 : 7월 ~ 10월 <br>  - 내용 : 우리가 차세대 그린리더! 아름다운 환경- 우리가 직접 가꾸어 가요<br><br>3. 시민축제학교<br>  - 기간 : 5월 ~ 10월<br>    - 내용 : 우리의 아이디어를 직접 실현해요\n',
      pla_parking_yn: 'n',
    },
    {
      pla_no: 1832,
      region_no: 47,
      region_sub: '영주시',
      pla_addr: '문수면 무섬로234번길 41(문수면) 무섬마을',
      latlng: {
        lat: 36.7316057476,
        lng: 128.6213025371,
      },
      pla_name: '영주 무섬외나무다리축제',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '영주시',
      pla_tel: '054-630-8707~10',
      pla_period: '20231007.0~20231008.0',
      pla_time: '10:00 ~ 18:00',
      pla_price: '무료',
      pla_info:
        '영주 외나무다리축제는 내성천 물줄기가 돌아 흐르는 육지 속의 섬마을- 무섬마을에서 세상과 통하는 유일한 통행수단인 외나무다리를 추억하고 전통문화를 체험할 수 있는 영주시 대표 축제이다.',
      pla_detail:
        '행사소개:영주 외나무다리축제는 내성천 물줄기가 돌아 흐르는 육지 속의 섬마을- 무섬마을에서 세상과 통하는 유일한 통행수단인 외나무다리를 추억하고 전통문화를 체험할 수 있는 영주시 대표 축제이다. \n행사내용:- 공연- 전시 프로그램 <br>무섬마을 열린 음악회- 무섬 외나무다리퍼포먼스&전통혼례 재연행사&전통상여행렬 재연행사- 갤러리 전시회<br><br>2. 체험 프로그램 <br>스탬프투어- 각종 대회- 체험부스 등\n',
      pla_parking_yn: 'n',
    },
    {
      pla_no: 1833,
      region_no: 41,
      region_sub: '남양주시',
      pla_addr: '다산로747번길 11 다산정약용선생유적지',
      latlng: {
        lat: 37.5163658756,
        lng: 127.299915423,
      },
      pla_name: '정약용 문화제',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '남양주시',
      pla_tel: '031-590-8842',
      pla_period: '20231014.0~20231015.0',
      pla_time: '10:00-17:00',
      pla_price: '무료 프로그램 운영 / 체험부스 유료(부스마다 이용 요금 상이)',
      pla_info:
        '유네스코가 선정한 세계기념인물인 정약용 선생님의 실사구시와 인문정신을 현대적으로 계승하고자 1986년부터 계속된 남양주시의 대표축제다.정약용 선생이 나고 자란 여유당 생가와 묘소- 문화관과 기념관이 자리한 정약용유적지와 다산생태공원 일원에서 진행된다.',
      pla_detail:
        '행사소개:유네스코가 선정한 세계기념인물인 정약용 선생님의 실사구시와 인문정신을 현대적으로 계승하고자 1986년부터 계속된 남양주시의 대표축제다.정약용 선생이 나고 자란 여유당 생가와 묘소- 문화관과 기념관이 자리한 정약용유적지와 다산생태공원 일원에서 진행된다. \n행사내용:1. 메인프로그램 : 헌화헌다례(문화제의 시작을 알리는 제례의식)/ 정약용문예대회(정약용 선생을 표현하는 청소년 백일장- 미술대회)<br>\n2. 특화프로그램 : 역사골든벨(정약용 선생에 대해 알아보는 역사 퀴즈대회)<br>\n3. 공연-전시 프로그램 : 정약용 뮤지컬(정약용 선생이 삶과 개혁정신을 주제로 한 뮤지컬 공연)/취타대행렬(풍성한 전통 음악으로 문화제의 개막을 알리는 취타대행렬)/진기명기 공연(어린이들이 좋아하는 다채로운 붐업 공연-마술쇼-풍선쇼-버블쇼 등)<br>\n4. 주민참여 프로그램 : 시민플리마켓- 체험부스(교육-전통-과학 등 분야)-다산춤꾼페스티벌-피크닉존<br>\n5. 부대 프로그램 : 역사체험연극- 회혼례<br>\n6. 기타 연계프로그램: 문화제 전-후 진행(스탬프투어- 월간 정약용- 정약용국제학술대회)\t\n\n',
      pla_parking_yn: 'n',
    },
    {
      pla_no: 1834,
      region_no: 48,
      region_sub: '남해군',
      pla_addr: '독일로 89-7남해군 독일마을',
      latlng: {
        lat: 34.8000859569,
        lng: 128.0383624398,
      },

      pla_name: '독일마을맥주축제',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '남해군',
      pla_tel: '055-860-8603',
      pla_period: '20231006.0~20231008.0',
      pla_time: '10:00~21:30',
      pla_price: '무료',
      pla_info:
        '1960년대부터 70년대까지 우리나라 경제발전에 이바지한 파독 광부 간호사들이 자리잡은 남해군 독일 마을에서 매년 10월 마을주민들과 함께 옥토버페스트를 개최한다. 오크통과 술잔을 가득채운 맥주- 사람들의 환호와 열기- 아름답고 세련된 유럽 공연 등 한국 속 독일을 만날 수 있다.',
      pla_detail:
        '행사소개:1960년대부터 70년대까지 우리나라 경제발전에 이바지한 파독 광부 간호사들이 자리잡은 남해군 독일 마을에서 매년 10월 마을주민들과 함께 옥토버페스트를 개최한다. 오크통과 술잔을 가득채운 맥주- 사람들의 환호와 열기- 아름답고 세련된 유럽 공연 등 한국 속 독일을 만날 수 있다. \n행사내용:1. 메인프로그램 : 퍼레이드- 유럽식 공연- 낭만콘서트- 옥토버나이트- 체험행사 등<br>2. 부대프로그램 : 파독광부간호사 토크쇼- 마술쇼 등<br>3. 소비자 참여 프로그램 : 옥토버챌린지- 술잔을beer 등 다양한 문화행사\n',
      pla_parking_yn: 'n',
    },
    {
      pla_no: 1835,
      region_no: 48,
      region_sub: '거제시',
      pla_addr: '거제면 거제남서로 3577',
      latlng: {
        lat: 34.8565698127,
        lng: 128.5795665696,
      },
      pla_name: '거제섬꽃축제',
      pla_code_main: '체험',
      pla_code_sub: '축제공연행사',
      pla_manager: '거제시(농업기술센터)',
      pla_tel: '055-639-6443',
      pla_period: '20231028.0~20231105.0',
      pla_price: '무료',
      pla_info:
        '『꽃으로 그린 섬』이라는 주제로 개최할 제17회 거제섬꽃축제가 여러분을 초대합니다. 각종 문화전시와 함께 섬꽃의 바다에 빠져보길 바란다.',
      pla_detail:
        '행사소개:『꽃으로 그린 섬』이라는 주제로 개최할 제17회 거제섬꽃축제가 여러분을 초대합니다. 각종 문화전시와 함께 섬꽃의 바다에 빠져보길 바란다.\n행사내용:- 대표 프로그램 : 각종 문화전시 \n',
      pla_parking_yn: 'n',
    },
  ]
  const positions1 = [
    { code: 'R', text: '제주 맛집1', latlng: { lat: 33.4775, lng: 126.5492 } },
    { code: 'R', text: '제주 맛집2', latlng: { lat: 33.4838, lng: 126.4812 } },
    { code: 'R', text: '제주 맛집3', latlng: { lat: 33.4551, lng: 126.569 } },
    { code: 'R', text: '제주 맛집4', latlng: { lat: 33.4796, lng: 126.4523 } },
    { code: 'R', text: '제주 맛집5', latlng: { lat: 33.5049, lng: 126.5148 } },
    { code: 'R', text: '제주 맛집6', latlng: { lat: 33.4602, lng: 126.5401 } },
    { code: 'R', text: '제주 맛집7', latlng: { lat: 33.4973, lng: 126.5548 } },
    { code: 'R', text: '제주 맛집8', latlng: { lat: 33.4697, lng: 126.5707 } },
    { code: 'R', text: '제주 맛집9', latlng: { lat: 33.4423, lng: 126.5001 } },
    { code: 'R', text: '제주 맛집10', latlng: { lat: 33.5156, lng: 126.5253 } },
    { code: 'R', text: '제주 맛집11', latlng: { lat: 33.4872, lng: 126.5362 } },
    { code: 'R', text: '제주 맛집12', latlng: { lat: 33.5069, lng: 126.4905 } },
    { code: 'R', text: '제주 맛집13', latlng: { lat: 33.4938, lng: 126.4746 } },
    { code: 'R', text: '제주 맛집14', latlng: { lat: 33.4765, lng: 126.5083 } },
    { code: 'R', text: '제주 맛집15', latlng: { lat: 33.4556, lng: 126.4872 } },
    { code: 'R', text: '제주 맛집16', latlng: { lat: 33.4657, lng: 126.5161 } },
    { code: 'R', text: '제주 맛집17', latlng: { lat: 33.4839, lng: 126.5463 } },
    { code: 'R', text: '제주 맛집18', latlng: { lat: 33.5012, lng: 126.5734 } },
    { code: 'R', text: '제주 맛집19', latlng: { lat: 33.4682, lng: 126.5471 } },
    { code: 'R', text: '제주 맛집20', latlng: { lat: 33.4904, lng: 126.5136 } },
  ]
  const positions2 = [
    { code: 'T', text: '한라산', latlng: { lat: 33.3617, lng: 126.5292 } },
    { code: 'T', text: '성산일출봉', latlng: { lat: 33.4588, lng: 126.9426 } },
    { code: 'T', text: '우도', latlng: { lat: 33.5067, lng: 126.948 } },
    {
      code: 'T',
      text: '마라도',
      latlng: { lat: 33.1172548, lng: 126.2681225 },
    },
    {
      code: 'T',
      text: '평대리 해수욕장',
      latlng: { lat: 33.2917, lng: 126.1622 },
    },
    {
      code: 'T',
      text: '제주 돌문화 공원',
      latlng: { lat: 33.4744, lng: 126.5071 },
    },
    { code: 'T', text: '만장굴', latlng: { lat: 33.5242, lng: 126.6625 } },
    { code: 'T', text: '천지연폭포', latlng: { lat: 33.4321, lng: 126.6841 } },
    { code: 'T', text: '사려니숲길', latlng: { lat: 33.4569, lng: 126.5591 } },
    { code: 'T', text: '하늘공원', latlng: { lat: 33.4823, lng: 126.4745 } },
    {
      code: 'T',
      text: '오설록티뮤지엄',
      latlng: { lat: 33.3053, lng: 126.7526 },
    },
    {
      code: 'T',
      text: '제주 도립 근로자 복지회',
      latlng: { lat: 33.4949, lng: 126.5073 },
    },
    { code: 'T', text: '에코랜드', latlng: { lat: 33.4555, lng: 126.7062 } },
    {
      code: 'T',
      text: '휴애리 자연생태공원',
      latlng: { lat: 33.3569, lng: 126.7975 },
    },
    {
      code: 'T',
      text: '제주 미술관',
      latlng: { lat: 33.339889, lng: 126.265674 },
    },
    {
      code: 'T',
      text: '이호테우해수욕장',
      latlng: { lat: 33.5035, lng: 126.9489 },
    },
    {
      code: 'T',
      text: '삼양검은모래해변',
      latlng: { lat: 33.5533, lng: 126.7731 },
    },
    { code: 'T', text: '제주돌마을', latlng: { lat: 33.4312, lng: 126.6967 } },
    {
      code: 'T',
      text: '제주 동문시장',
      latlng: { lat: 33.5134, lng: 126.5265 },
    },
    {
      code: 'T',
      text: '한담해안산책로',
      latlng: { lat: 33.4652, lng: 126.7511 },
    },
  ]
  const positions3 = [
    { code: 'D', text: '숙소1', latlng: { lat: 33.450705, lng: 126.570677 } },
    { code: 'D', text: '숙소2', latlng: { lat: 33.450936, lng: 126.569477 } },
    { code: 'D', text: '숙소3', latlng: { lat: 33.450879, lng: 126.56994 } },
    { code: 'D', text: '숙소4', latlng: { lat: 33.451393, lng: 126.570738 } },
    { code: 'D', text: '숙소5', latlng: { lat: 33.451, lng: 126.571 } },
    { code: 'D', text: '숙소6', latlng: { lat: 33.452, lng: 126.572 } },
    { code: 'D', text: '숙소7', latlng: { lat: 33.453, lng: 126.573 } },
    { code: 'D', text: '숙소8', latlng: { lat: 33.454, lng: 126.574 } },
    { code: 'D', text: '숙소9', latlng: { lat: 33.455, lng: 126.575 } },
    { code: 'D', text: '숙소10', latlng: { lat: 33.456, lng: 126.576 } },
    { code: 'D', text: '숙소11', latlng: { lat: 33.457, lng: 126.577 } },
    { code: 'D', text: '숙소12', latlng: { lat: 33.458, lng: 126.578 } },
    { code: 'D', text: '숙소13', latlng: { lat: 33.459, lng: 126.579 } },
    { code: 'D', text: '숙소14', latlng: { lat: 33.46, lng: 126.58 } },
    { code: 'D', text: '숙소15', latlng: { lat: 33.461, lng: 126.581 } },
    { code: 'D', text: '숙소16', latlng: { lat: 33.462, lng: 126.582 } },
    { code: 'D', text: '숙소17', latlng: { lat: 33.463, lng: 126.583 } },
    { code: 'D', text: '숙소18', latlng: { lat: 33.464, lng: 126.584 } },
    { code: 'D', text: '숙소19', latlng: { lat: 33.465, lng: 126.585 } },
    { code: 'D', text: '숙소20', latlng: { lat: 33.466, lng: 126.586 } },
  ]

  let firstData2 = []
  for (let i of firstData) {
    if (i.pla_code_main === '체험') {
      firstData2.push(i)
    }
  }
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
  const cateClick = (e, key) => {
    console.log(key)
    setSelectedKey(key)
    setIsActive(!isActive)
    if (key === '1') {
      setCateList(positions1)
    } else if (key === '6') {
      setCateList(firstData2)
    }
  }

  const className = `${isActive ? 'active-class' : ''}`

  //////////////////////////////////////////////////////////////////// setData2 ///////////////////////////////////////
  function setData2(e, handleClose) {
    let data = {}
    let selectList = []

    if (selectedKey === '1') {
      selectList = [...positions1]
    } else if (selectedKey === '2') {
      selectList = [...positions2]
    } else if (selectedKey === '6') selectList = [...firstData2]

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
    <div>
      {makePageModal ? <MakeModal data={modalDataTemp} /> : ''}
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
      <div style={{ padding: '0px 100px' }}>
        {/* //////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////// SIDE BAR START ////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////// */}
        <Row style={{ overflow: 'hidden' }}>
          {/*///////////////////////////////// 검색 INPUT  ////////////////////////////////////*/}
          <Col sm={3} style={{ backgroundColor: '#f6f6f6', zIndex: '20' }}>
            <div className="search-container">
              <input
                type="search"
                className="main-input mt-3 mb-3"
                placeholder="텍스트 혹은 이미지로 검색해보세요."
              />
              <img
                className="input-img search-img"
                src="https://cdn.icon-icons.com/icons2/2406/PNG/512/search_magnifier_icon_145939.png"
              />
              <img
                className="input-img img-search-img"
                src="https://cdn.icon-icons.com/icons2/2440/PNG/512/gallery_icon_148533.png"
              />
            </div>
            <Nav variant="tabs">
              {categories.map((item, index) => (
                <Nav.Item
                  key={index}
                  className={selectedKey === item.sequence ? 'active' : ''}
                  onClick={(e) => cateClick(e, item.sequence)}
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
              {selectedKey === '1' &&
                positions1.map((item, index) => (
                  <List
                    setMarkerImage={setMarkerImage}
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
              {selectedKey === '2' &&
                positions2.map((item, index) => (
                  <List
                    setMarkerImage={setMarkerImage}
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
              {selectedKey === '6' &&
                firstData2.map((item, index) => (
                  <List
                    setMarkerImage={setMarkerImage}
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
            <Col className={`temp-css${isTempCssVisible ? '' : 'hidden'}`}>
              {/* // <div className={`temp33 ${isTempCssVisible ? '' : 'hidden'}`} onClick={handleButtonClick}> */}
              <Container>
                <Row className="mt-3 text-center" style={{ fontSize: '14px' }}>
                  <Col sm={3} className="travel-region-text pe-0">
                    <span>전국</span> 여행
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
                  {!showCalendar && (
                    <>
                      <Row className="text-center  mt-4">
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
                      <Row>
                        <Col className="mt-3">
                          <button
                            className="list-btn2"
                            style={{ width: '100%' }}
                            onClick={(e) => handleColClick(e)}
                          >
                            설정하기
                          </button>
                        </Col>
                      </Row>
                    </>
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
                  <Col className="save-btn">
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
                          defaultActiveKey={days.map((item) =>
                            (parseInt(item) - 1).toString()
                          )}
                          alwaysOpen
                          className="scrollable-div2"
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
                        <Container>
                          {myList.length > 0 ? (
                            <Row>
                              <Col
                                onClick={makePlanStrat}
                                className="schedule-creation-col"
                              >
                                <button className="schedule-creation">
                                  일정 생성하기
                                </button>
                              </Col>
                            </Row>
                          ) : (
                            ''
                          )}
                        </Container>
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
                <img
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: 'transform 0.3s ease',
                  }}
                />
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
              }}
              level={7}
            >
              {/* 리스트 클릭 마커 */}
              {markerImg ? (
                <React.Fragment key={uuidv4()}>
                  <MapMarker
                    clickable={true} // 임시(지도클릭막기)
                    position={markerImg.latlng}
                    title={markerImg?.pla_name}
                    image={{
                      // 임시로 블로그에 투명이미지 올려서 사용 (투명이미지만들어서 변경해야함(변경완료))
                      src: './img/map-marker-2-24.png',
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
                      src: './img/invimage.png',
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
    </div>
    ////////////////////
    ////////////////////
  )
}

////////////////////////// 모달내용 수정할 body
// function MydModalWithGrid(props) {
//   console.log(props);
//   console.log(props.temp);
//   return (
//     <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           {props.temp}
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body className="grid-example">
//         <Container>
//           <Row>
//             <Col xs={12} md={8}>
//               .col-xs-12 .col-md-8
//             </Col>
//             <Col xs={6} md={4}>
//               .col-xs-6 .col-md-4
//             </Col>
//           </Row>

//           <Row>
//             <Col xs={6} md={4}>
//               .col-xs-6 .col-md-4
//             </Col>
//             <Col xs={6} md={4}>
//               .col-xs-6 .col-md-4
//             </Col>
//             <Col xs={6} md={4}>
//               .col-xs-6 .col-md-4
//             </Col>
//   </Row>
//         </Container>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

export default MakePlan
