import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

const mapConfig = {
    useKakaoLoader(){
        useKakaoLoaderOrigin({
            appkey: "d4bc7820de70adb2bcf9139fe7e934d3",
            libraries: ["clusterer", "drawing", "services"]
        })
    }
}

export default mapConfig;