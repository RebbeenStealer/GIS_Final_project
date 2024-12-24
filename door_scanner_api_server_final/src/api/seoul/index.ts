import express from 'express'
import ctrl from './controller/seoul.ctrl'


const router = express.Router();

// 도시데이터 ex) /data/citydata?query=가산디지털단지역
router.get('/citydata', ctrl.getCityData)

<<<<<<< Updated upstream
// 인구데이터 ex) /data/citydata_ppltn?query=가산디지털잔지역
router.get('/citydata_ppltn', ctrl.getCityData_ppltn)

=======
// 인구데이터 ex) /data/citydata_ppltn?query=가산디지털단지역
router.get('/citydata_ppltn', ctrl.getCityData_ppltn)

// 날씨데이터 ex) /data/weather?query=가산디지털단지역
router.get('/weather', ctrl.getWeather)

>>>>>>> Stashed changes

export default router;