import { useEffect, useRef, useState } from 'react'
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
  ANONYMOUS,
} from '@tosspayments/payment-widget-sdk'
import axios from 'axios'

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm'
const customerKey = '0000000000000000000009'

const PayInfo = ({ RoomPrice }) => {
  const paymentWidgetRef = useRef(null)
  const paymentMethodsWidgetRef = useRef(null)
  const [price, setPrice] = useState(100)

  useEffect(() => {
    ;(async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey)

      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        '#payment-widget',
        { value: price },
        { variantKey: 'DEFAULT' }
      )

      paymentWidget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' })
      paymentWidgetRef.current = paymentWidget
      paymentMethodsWidgetRef.current = paymentMethodsWidget
    })()
  }, [])

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current

    if (paymentMethodsWidget == null) {
      return
    }

    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON
    )
  }, [price])

  const handlePaymentClick = async () => {
    const paymentWidget = paymentWidgetRef.current
    console.log(paymentWidget)

    try {
      const paymentResponse = await paymentWidget?.requestPayment({
        orderId: '0000000000000000000009',
        orderName: '토스 티셔츠 외 2건',
        customerName: '김토스',
        customerEmail: 'customer123@gmail.com',
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="pay-div">
        {/* 첫번째 div */}
        <p className="pay-title">고객 정보</p>
        <div className="pay-form">
          <div className="pay-mini-title">
            <p>성함</p>
            <p>이메일</p>
            <p>연락처</p>
            <p>숙소 도착 예정 시간</p>
          </div>

          <div className="pay-txt">
            <p style={{ marginBottom: '12px' }}>홍길동</p>
            <span className="man">남</span>
            <span className="woman">여</span>
            <p>hong@naver.com</p>
            <p>
              대한민국+82 010-1234-5678
              <button className="certify">인증</button>
            </p>
            <p>14:00~15:00</p>
          </div>
        </div>
        {/* 두번째 div */}
        <p className="pay-title">결제 정보</p>
        <div className="pay-info">
          <div>
            <div id="payment-widget" />
            <div id="agreement" />
          </div>

          {/* 결제 금액 */}
          <div className="pay-price">
            <div>
              <p className="total-price">총 결제 금액</p>
            </div>
            <div>
              <p className="total-price">50,000원</p>
            </div>
          </div>

          {/* 결제하기 */}
          <div className="btn-div">
            <button
              type="submit"
              className="pay-btn"
              onClick={handlePaymentClick}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PayInfo