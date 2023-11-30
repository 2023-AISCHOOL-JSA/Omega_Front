import React, { useRef, useState } from 'react'
import { Avatar } from 'antd'

const MyProfile = () => {
  const [Image, setImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    // mb_profile
  )
  const [file, setFile] = useState('')
  const fileInput = useRef(null)

  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    } else {
      //업로드 취소할 시
      setImage(
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      )
      return
    }

    //화면에 프로필 사진 표시
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  return (
    <>
      <div className="my-info">
        <div className="my-info-profile">
          <Avatar
            size={120}
            style={{
              marginRight: '30px',
            }}
            src={Image}
            onClick={() => {
              fileInput.current.click()
            }}
          />
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/jpg, image/png, image/jpeg"
            onChange={onChange}
            ref={fileInput}
          />
        </div>

        <div className="myinfo-txt">
          <div className="txt-group">
            <p className="name">mb_name님의 프로필</p>
            <span className="name2">정보저장</span>

            <span className="name3">
              {' '}
              <button className="ser-delete-btn">서비스 탈퇴 </button>
            </span>
          </div>

          <div className="info-txt">
            <span className="dlfma">이름</span>
            <span className="myname">mb_name</span>
          </div>

          <div className="info-txt">
            <span className="dlfma">이메일</span>
            <span className="email">mb_email</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfile
