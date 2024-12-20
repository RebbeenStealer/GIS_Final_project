import React, { useEffect, useRef, useState } from "react";
import { Map } from "react-kakao-maps-sdk";

const KakaoMap = () => {
    const [mapCenter, setMapCenter] = useState({ lat: 33.450701, lng: 126.570667 }); // 기본 위치 (서울)
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        // 현재 위치를 가져옵니다.
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const currentPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                console.log("현재 위치:", currentPosition);
                setMapCenter(currentPosition); // 현재 위치로 초기화
                initializeMap(currentPosition); // 지도 초기화
            },
            (error) => {
                console.error("위치 정보를 가져오는데 실패했습니다.", error);
                alert("위치 정보를 가져오는데 실패했습니다. 기본 위치로 설정합니다.");
                initializeMap(mapCenter); // 기본 위치로 지도 초기화
            },
            { enableHighAccuracy: true } // 고정밀도 사용
        );
    }, []);

    const initializeMap = (center) => {
        const kakaoMap = new window.kakao.maps.Map(mapContainer.current, {
            center: new window.kakao.maps.LatLng(center.lat, center.lng), // 초기 중심 좌표
            level: 3,
        });
        setMap(kakaoMap);
    };

    const addMarkersFromAPI = () => {
        const categoryGroupCode = "FD6"; // 예시 카테고리 코드
        const x = mapCenter.lng; // 현재 위치의 경도
        const y = mapCenter.lat; // 현재 위치의 위도
        const radius = "200"; // 예시 지역 코드
        console.log(x, y)
        fetch(`http://localhost:8080/api/category?category_group_code=${categoryGroupCode}&x=${x}&y=${y}&radius=${radius}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // API 응답 확인
                displayPlaces(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const displayPlaces = (placesData) => {
        if (!Array.isArray(placesData.documents)) {
            console.error('Expected an array but got:', placesData.documents);
            return; // 배열이 아닐 경우 함수 종료
        }

        // 이전 마커 제거
        removeMarkers();

        const newMarkers = placesData.documents.map(place => ({
            position: { lat: place.y, lng: place.x },
            title: place.place_name,
        }));

        setMarkers(newMarkers);

        // 마커를 지도에 추가
        newMarkers.forEach(marker => {
            const markerInstance = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(marker.position.lat, marker.position.lng),
                map: map,
                title: marker.title,
            });

            // 마커 클릭 시 인포윈도우 표시
            window.kakao.maps.event.addListener(markerInstance, 'click', () => {
                displayInfowindow(markerInstance, marker.title);
            });
        });

        // 지도의 중심을 검색된 장소로 이동
        if (newMarkers.length > 0) {
            map.setCenter(new window.kakao.maps.LatLng(newMarkers[0].position.lat, newMarkers[0].position.lng));
        }
    };

    const removeMarkers = () => {
        markers.forEach(marker => marker.setMap(null)); // 지도에서 모든 마커 제거
        setMarkers([]); // 상태에서 마커 목록을 초기화합니다.
    };

    const displayInfowindow = (marker, title) => {
        const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${title}</div>`,
        });

        infowindow.open(map, marker);
    };

    return (
        <div>
            <button onClick={addMarkersFromAPI} style={{ margin: '10px' }}>
                마커 추가하기
            </button>
            <div ref={mapContainer} style={{ width: '100%', height: '100vh' }}>
                <Map
                    center={mapCenter}
                    level={3}
                    style={{ width: '100%', height: '100%' }}
                >
                    {/* 여기서 마커를 추가할 수 있습니다 */}
                </Map>
            </div>
        </div>
    );
};

export default KakaoMap;
