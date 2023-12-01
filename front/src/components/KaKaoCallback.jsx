import React, { useEffect } from 'react'
import api from '../axios'
import { useNavigate } from 'react-router-dom'

const KakaoCallback = () => {
	const navigator = useNavigate()

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(window.location.search)
		const authorizationCode = urlSearchParams.get('code')

		api
			.get(`/auth/kakao?code=${authorizationCode}`)
			.then((res) => {
				if (res.data.status === 'success') {
					localStorage.setItem('jwtToken', res.data.data.token)
					window.opener.postMessage(
						{ type: 'SUCCESS', data: { token : res.data.data.token, status: 'success' } },
						'*',
					)
				}
			})
			.catch((err) => console.error(err))

	}, [])

	return <div>로그인 중...</div>
}

export default KakaoCallback
