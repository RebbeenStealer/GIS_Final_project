import { useEffect } from "react";
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from "@mapbox/mapbox-gl-language";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const useMap = (mapContainerRef , style , config) => {
    useEffect(() => {
        
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style : style,
            center : config.initialCenter,
            zoom : config.initialZoom,
        })


        const removeBuildingLayers = () => {
            // 빌딩 레이어가 존재하는 경우에만 제거
            if (map.getLayer('buildings')) {
                map.removeLayer('buildings');
            }
            if (map.getLayer('3d-buildings')) {
                map.removeLayer('3d-buildings');
            }
            // composite 소스의 building 레이어도 제거
            if (map.getLayer('building')) {
                map.removeLayer('building');
            }
            // 추가적인 빌딩 관련 레이어들
            const buildingLayers = [
                'building-number-label',
                'building-extrusion',
                'building-outline'
            ];
            
            buildingLayers.forEach(layer => {
                if (map.getLayer(layer)) {
                    map.removeLayer(layer);
                }
            });
        }

        // 맵이 완전히 로드된 후에 레이어 제거
        if (map.loaded()) {
            removeBuildingLayers();
        } else {
            map.on('load', () => {
                removeBuildingLayers();
                loadGeoJson()
            });
        }

        const language = new MapboxLanguage({
            defaultLanguage : config.defaultLanguage,
        })
        map.addControl(language); //언어팩 설정


        const loadGeoJson = async () => {
            try{
                //통신해서 public 에 있는 geojson파일을 불러온다.
                const response = await fetch('/bldg_polygon.geojson');
                const geojson = await response.json();
                
                // geojson 데이터를 source에 추가
                map.addSource('polygons' , {
                    type : 'geojson',
                    data: geojson,
                })

                map.addLayer({
                    id : 'polygon-layer',
                    type : 'fill',
                    source : 'polygons',
                    paint : {
                        'fill-color' : '#888888',
                        'fill-opactiy' : '0.4'
                    }
                })

                map.addLayer({
                    id : 'polygon-outline-layer',
                    type: 'line',
                    source: 'polygons',
                    paint : {
                        'line-color': '#000000',
                        'line-width' : 2,
                    }
                })
            }catch(error){
                console.error('Error loading geojson', error);
            }
        }
        // 컴포넌트가 언마운트 될때 없애라
        return () => map.remove();
    },[mapContainerRef , style , config]) //무조건 한번 1회 실행 , 이 배열안의 값이 변했을때 실행
}
export default useMap;

