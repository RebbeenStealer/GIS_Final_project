import express from 'express'
import ctrl from './building.ctrl'

const router = express.Router();


router.get('/bldg_nm',ctrl.getBuildingLikesBldgNmLimit50)
//http://localhost:8080/buildings/bldg_nm?bldg_nm=빌딩
router.get('/bldg_id/:bldg_id',ctrl.getBuildingByBldgid);
//http://localhost:8080/buildings/bldg_id/해당하는 bldg_id를 넣으면 됩니다.
router.get('/:sig_cd',ctrl.getBuildingBySigCdLimit20);
//http://localhost:8080/buildings/sig_cd/해당하는 sig_cd를 넣으면 됩니다.
export default router;