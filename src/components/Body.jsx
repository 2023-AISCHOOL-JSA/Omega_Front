import React, { useRef } from 'react'
import axios from '../axios'

const Body = () => {
	const mb_id = useRef()
	const mb_pw = useRef()

	const inputId = useRef()
	const inputPw = useRef()

	const handleJoin = (e) => {
		e.preventDefault()
		axios
			.post('/auth/join', {
				mb_id: mb_id.current.value,
				mb_pw: mb_pw.current.value,
			})
			.then((res) => {
				console.log(res.data)
        alert(res.data.message)
			})
			.catch((err) => {
        console.error(err)
        alert(err.response.data.message)
			})
	}
	const handleLogin = (e) => {
		e.preventDefault()
		axios
			.post('/auth/login', {
				mb_id: inputId.current.value,
				mb_pw: inputPw.current.value,
			})
			.then((res) => {
				console.log(res.data)
				sessionStorage.setItem('jwtToken', res.data.token)
			})
			.catch((err) => console.error(err))
	}

	const tokenTest = () => {
		axios
			.get('/v1/test', {
				headers: { authorization: sessionStorage.getItem('jwtToken') },
			})
			.then((res) => {
				console.log(res.data)
			})
	}

	return (
		<div>
			<fieldset>
				<legend>회원가입</legend>
				<form action="" onSubmit={handleJoin}>
					<input type="text" name="mb_id" placeholder="id" ref={mb_id} />
					<input type="text" name="mb_pw" placeholder="pw" ref={mb_pw} />
					<input type="submit" />
				</form>
			</fieldset>
			<fieldset>
				<legend>로그인</legend>
				<form action="" onSubmit={handleLogin}>
					<input type="text" name="id" placeholder="id" ref={inputId} />
					<input type="text" name="pw" placeholder="pw" ref={inputPw} />
					<input type="submit" />
				</form>
			</fieldset>
			<button onClick={tokenTest}>토큰 검사</button>
		</div>
	)
}

export default Body
