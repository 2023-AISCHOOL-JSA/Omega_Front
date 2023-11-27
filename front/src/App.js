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

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/region-guide" element={<RegionInfo />} />
        <Route path="/make-plan" element={<MakePlan />} />
        <Route path="/made-plan" element={<MadePlan />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </>
  )
}

export default App
