<<<<<<< Updated upstream:react_map_box/src/components/KakaoMap.jsx
import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import "../styles/mapStyle.css";
import useSingleLocation from "../hooks/location/useSingleLocation";
import AuthModal from "../components/AuthModal";

const KakaoMap = () => {
  const { location, error } = useSingleLocation();
  const defaultCenter = { lat: 37.5665, lng: 126.9780 };
  const [center, setCenter] = useState(defaultCenter);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (location) {
      setCenter(location);
    }
  }, [location]);

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <>
    <Map
      id="map"
      center={center}
      style={{
        width: "100%",
        height: "100vh",
      }}
      level={3}
    >
      <MapMarker position={center}></MapMarker>
      {/* 로그인/회원가입 버튼 */}
      <button
      onClick={() => setIsModalOpen(true)}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "#FEE500",
        border: "none",
        padding: "10px 15px",
        borderRadius: "5px",
        cursor: "pointer",
        zIndex: 1000,
      }}
      >
        로그인
      </button>
    </Map>
    {/* 모달 렌더링 */}
    <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    </>
  );
};

export default KakaoMap; 
=======
import React, { useState, useEffect } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import "../styles/mapStyle.css";
import useSingleLocation from "../hooks/location/useSingleLocation";
import AuthModal from "../components/AuthModal";
import axios from 'axios';

const KakaoMap = () => {
  const { location, error } = useSingleLocation();
  const defaultCenter = { lat: 37.5665, lng: 126.9780 };
  const [center, setCenter] = useState(defaultCenter);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [areaData, setAreaData] = useState(null);

  useEffect(() => {
    if (location) {
      setCenter(location);
    }
  }, [location]);

  useEffect(() => {
    const fetchAreaData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/data/citydata_ppltn?query=가산디지털단지역');
        setAreaData(response.data["SeoulRtd.citydata_ppltn"][0]);
      } catch (error) {
        console.error("Error fetching area data:", error);
      }
    };

    fetchAreaData();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  const getColorByCongestLevel = (level) => {
    switch(level) {
      case "여유": return "green";
      case "보통": return "yellow";
      case "약간 붐빔": return "orange";
      case "붐빔": return "red";
      default: return "gray";
    }
  };

  return (
    <>
      <Map
        id="map"
        center={center}
        style={{
          width: "100%",
          height: "100vh",
        }}
        level={3}
      >
        {areaData && (
          <CustomOverlayMap
            position={{ lat: 37.4784, lng: 126.8811 }} // 가산디지털단지역의 대략적인 좌표
            yAnchor={1}
          >
            <div style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
            }}>
              <h3>{areaData.AREA_NM}</h3>
              <p>혼잡도: <span style={{color: getColorByCongestLevel(areaData.AREA_CONGEST_LVL)}}>{areaData.AREA_CONGEST_LVL}</span></p>
              <p>인구: {areaData.AREA_PPLTN_MIN} - {areaData.AREA_PPLTN_MAX}</p>
              <p>{areaData.AREA_CONGEST_MSG}</p>
            </div>
          </CustomOverlayMap>
        )}
        <MapMarker position={center}></MapMarker>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "#FEE500",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          로그인 | 회원가입
        </button>
      </Map>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    </>
  );
};

export default KakaoMap;
>>>>>>> Stashed changes:react_map_box/src/components/Map.jsx
