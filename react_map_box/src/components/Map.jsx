import { useState, useEffect } from "react";
import { Map } from "react-kakao-maps-sdk"
import "../styles/mapStyle.css";
import useSingleLocation from "../hooks/location/useSingleLocation";

const kakaoMap = () => {

    const { location, error } = useSingleLocation();
    const defaultCenter = { lat: 37.5665, lng: 126.9780 };


    return (
        <Map
            id = "map"
            center = {location || defaultCenter}
            style = {{
                width : "100%",
                height : "100vh"
            }}
            level = {3}
        >
        </Map>
    );

}

export default kakaoMap;