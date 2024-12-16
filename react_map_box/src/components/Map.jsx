import { useRef } from "react";
import useMap from '../hooks/useMap'
import { mapConfig } from "../config/mapConfig";


const Map = () => {
    const mapContainerRef = useRef(null);

    useMap(mapContainerRef , mapConfig.defaultStyle , mapConfig);

    return <div ref = {mapContainerRef} style={{width : '100%' , height: '100vh'}}/>
}

export default Map