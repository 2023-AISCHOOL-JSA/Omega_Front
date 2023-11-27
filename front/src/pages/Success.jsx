import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'

export function SuccessPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    navigate('/mypage')

    const requestData = {
      orderId: searchParams.get('orderId'),
      amount: searchParams.get('amount'),
      paymentKey: searchParams.get('paymentKey'),
    }

    const secretKey = 'test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6'
    const encryptedSecretKey = `Basic ${btoa(secretKey + ':')}`

    async function confirm() {
      const response = await fetch(
        'https://api.tosspayments.com/v1/payments/confirm',
        {
          method: 'POST',
          headers: {
            Authorization: encryptedSecretKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        }
      )

      const json = await response.json()

      if (!response.ok) {
        console.log(json)
        navigate(`/fail?code=${json.code}&message=${json.message}`)
        return
      }

      try {
        const axiosResponse = await axios.post(
          'http://localhost:3003/user//payCharge',
          {
            data: json,
          }
        )

        console.log(axiosResponse.data)
      } catch (error) {
        console.error(error)
      }

      console.log(json)
    }
    confirm()
  }, [])

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2 style={{ padding: '20px 0px 10px 0px' }}>
          <img
            width="35px"
            src="https://static.toss.im/3d-emojis/u1F389_apng.png"
          />
          결제 성공
        </h2>
        <p>{`paymentKey = ${searchParams.get('paymentKey')}`}</p>
        <p>{`orderId = ${searchParams.get('orderId')}`}</p>
        <p>{`amount = ${Number(
          searchParams.get('amount')
        ).toLocaleString()}원`}</p>
        <div className="result wrapper">
          <a href="https://docs.tosspayments.com/guides/payment-widget/integration">
            <button
              className="button"
              style={{ marginTop: '30px', marginRight: '10px' }}
            >
              연동 문서
            </button>
          </a>
          <a href="https://discord.gg/A4fRFXQhRu">
            <button
              className="button"
              style={{
                marginTop: '30px',
                backgroundColor: '#e8f3ff',
                color: '#1b64da',
              }}
            >
              실시간 문의
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage
