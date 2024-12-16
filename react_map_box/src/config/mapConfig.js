import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

const mapConfig = {
    useKakaoLoader(){
        useKakaoLoaderOrigin({
            appkey: "133a147821bce4bce58bbc4cb446e46b",
            libraries: ["clusterer", "drawing", "services"]
        })
    }
}

export default mapConfig;