import React from 'react'
import { Card } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'

const MainCard = () => {
  const navigate = useNavigate()

  return (
    <>
      <Card className="card7" onClick={() => navigate('/made/127')}>
        <Card.Img
          variant="top"
          src="https://i.ytimg.com/vi/jMjH43DPgUQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDdZmi9BIjRCJorPQX3rp-3XRBkmg"
          className="card-bg"
        />
        <Card.Body>
          <Card.Text>
            {/* <div className="profile">
              <IconImg src={Profile} alt="" />
            </div> */}
            <div className="card-content-wrapper">
              <p className="card-title">김민경님의 강원도 여행</p>
              <span>
                <p className="card-content">
                  2023.11.17 ~ 2023.11.18
                  <span className="card-content">1박2일</span>
                </p>
              </span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="card7">
        <Card.Img
          variant="top"
          src="https://i.ytimg.com/vi/Agng8clKGS0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBdc7nm5-wppq0geIxA3B3euiL8ww"
          className="card-bg"
        />
        <Card.Body>
          <Card.Text>
            <div className="card-content-wrapper">
              <p className="card-title">곽튜브님의 제주도 여행</p>
              <span>
                <p className="card-content">
                  2023.08.18~ 2023.08.19
                  <span className="card-content">1박2일</span>
                </p>
              </span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="card7">
        <Card.Img
          variant="top"
          src="https://i.ytimg.com/vi/27li701pBiI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDyKuJtEp3NxUm9ySZ3ZLi9UaNYfw"
          className="card-bg"
        />
        <Card.Body>
          <Card.Text>
            <div className="card-content-wrapper">
              <p className="card-title">풍자님의 부산 여행</p>
              <span>
                <p className="card-content">
                  2023.06.22
                  <span className="card-content">당일치기</span>
                </p>
              </span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="card7">
        <Card.Img
          variant="top"
          src="https://i.ytimg.com/vi/xhV36vQLto4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBAeRwjwiVL1wF6FcKV2sD1_UXP7g"
          className="card-bg"
        />
        <Card.Body>
          <Card.Text>
            <div className="card-content-wrapper">
              <p className="card-title">입짧은햇님님의 강릉 여행</p>
              <span>
                <p className="card-content">
                  2023.06.01 ~ 2023.06.02
                  <span className="card-content">1박2일</span>
                </p>
              </span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="card7">
        <Card.Img
          variant="top"
          src="https://i.ytimg.com/vi/L7ZejZwbudw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBtmm1KzEbN9SLeStlYjBvBMzwKAg"
          className="card-bg"
        />
        <Card.Body>
          <Card.Text>
            <div className="card-content-wrapper">
              <p className="card-title">박미선님의 제주도 여행</p>
              <span>
                <p className="card-content">
                  2022.12.30
                  <span className="card-content">당일치기</span>
                </p>
              </span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="card7">
        <Card.Img
          variant="top"
          src="https://i.ytimg.com/vi/RbcrJYIY89I/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCEGJvbQsUWy5ryrc2JXZI4ieF7sA"
          className="card-bg"
        />
        <Card.Body>
          <Card.Text>
            <div className="card-content-wrapper">
              <p className="card-title">기안84님의 여수 여행</p>
              <span>
                <p className="card-content">
                  2022.03.04
                  <span className="card-content">당일치기</span>
                </p>
              </span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default MainCard
