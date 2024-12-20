import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import "../styles/mapStyle.css";
import useSingleLocation from "../hooks/location/useSingleLocation";

const KakaoMap = () => {
  const { location, error } = useSingleLocation();
  const defaultCenter = { lat: 37.5665, lng: 126.9780 };
  const [center, setCenter] = useState(defaultCenter);

  useEffect(() => {
    if (location) {
      setCenter(location);
    }
  }, [location]);

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <Map
      id="map"
      center={center}
      style={{
        width: "100%",
        height: "100vh",
      }}
      level={3}
    >
      <MapMarker position={center}>
      </MapMarker>
    </Map>
  );
};

export default KakaoMap;
