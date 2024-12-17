import express from 'express'
// import ctrl from './building.ctrl'
import ctrl from '../controller/kakao.ctrl'


const router = express.Router();

router.get('/address', ctrl.getCoordinatesFromAddress) // 주소를 좌표로 변환
router.get('/region', ctrl.getRegionCode) // 좌표를 행정구역정보로 변환
router.get('/geo', ctrl.getGeo) // 좌표를 주소로 변환
router.get('/category', ctrl.getLocationsByCategory) // 카테고리로 장소 검색
router.get('/keyword', ctrl.getLocationsByKeyword) // 키워드로 장소 검색



// router.get('/pathfinder', ctrl.getPathfinder);
// router.get('/bldg_nm',ctrl.getBuildingLikesBldgNmLimit50)
// //http://localhost:8080/buildings/bldg_nm?bldg_nm=빌딩
// router.get('/bldg_id/:bldg_id',ctrl.getBuildingByBldgid);
// //http://localhost:8080/buildings/bldg_id/해당하는 bldg_id를 넣으면 됩니다.
// router.get('/:sig_cd',ctrl.getBuildingBySigCdLimit20);
// //http://localhost:8080/buildings/sig_cd/해당하는 sig_cd를 넣으면 됩니다.

export default router;