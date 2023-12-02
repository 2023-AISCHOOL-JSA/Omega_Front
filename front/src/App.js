import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Main from './pages/Main'
import RegionInfo from './pages/RegionInfo'
import MyPage from './pages/MyPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import Reservation from './pages/Reservation'
import MakePlan from './pages/MakePlan'
import CheckoutPage from './pages/Checkout'
import SuccessPage from './pages/Success'
import MadePlan from './pages/MadePlan'
import LoginModal from './components/LoginModal'
import { WishProvider } from './context/WishContext'
import CreateSchedule from './pages/CreateSchedule'
import KakaoCallback from './components/KaKaoCallback'
import GoogleCallback from './components/GoogleCallback'

function App() {
  return (
    <>
      <Header />
      <WishProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/info/:region_no" element={<RegionInfo />} />
          <Route path="/plan/:plan_no" element={<MakePlan />} />
          <Route path="/made" element={<MadePlan />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/reservation/:plan_no" element={<Reservation />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/login" element={<LoginModal />} />
          <Route path="/create/:plan_no" element={<CreateSchedule />} />
          <Route path="/auth/kakao" element={<KakaoCallback />} />
          <Route path="/auth/google" element={<GoogleCallback />} />
        </Routes>
      </WishProvider>
    </>
  )
}

export default App
