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

function App() {
  return (
    <>
      <Header />
      <WishProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/info" element={<RegionInfo />} />
          <Route path="/plan" element={<MakePlan />} />
          <Route path="/made" element={<MadePlan />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/login" element={<LoginModal />} />
        </Routes>
      </WishProvider>
    </>
  )
}

export default App
