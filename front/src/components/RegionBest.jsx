import React from 'react'
import Intro from '../img/down.jpg'
import Pig from '../img/pig.jpg'
const RegionBest = ({ placeList }) => {
  return (
    <>
      <div className="reg-middle">
        <div className="reg-rep">
          <img src={`${process.env.REACT_APP_IMG_API_URL}${placeList[0]?.img_original_name}`} alt="" className="reg-rep-img" />
          <div className="reg-rep-content">
            <div className="reg-rep-content-l">
              <p className="txt">{placeList[0]?.pla_code_main == '음식점' ? '여긴 꼭 먹어보세요!' : '여긴 꼭 들려보세요!'}</p>
              <p className="place"># {placeList[0]?.pla_name}</p>
            </div>
            <div className="reg-rep-content-r">
              <p className="explain">
              {placeList[0]?.pla_info.slice(0,150)}{placeList[0]?.pla_info.length >= 150 ? '...' : null}

              </p>
            </div>
          </div>
        </div>

        <div className="reg-rep">
          <img className="reg-rep-img" src={`${process.env.REACT_APP_IMG_API_URL}${placeList[1]?.img_original_name}`} alt="" />
          <div className="reg-rep-content">
            <div className="reg-rep-content-l">
              <p className="txt">{placeList[1]?.pla_code_main === '음식점' ? '여긴 꼭 먹어보세요!' : '여긴 꼭 들려보세요!'}</p>
              <p className="place"># {placeList[1]?.pla_name}</p>
            </div>
            <div className="reg-rep-content-r">
              <p className="explain">
              {placeList[1]?.pla_info.slice(0,150)}{placeList[1]?.pla_info.length >= 150 ? '...' : null}

              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegionBest
