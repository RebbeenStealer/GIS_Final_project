import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import path from 'path'
import mountRouters from './api/router'

const app = express()

app.use(express.json());

app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "https://t1.daumcdn.net", "https://mts.daumcdn.net"], // 이미지 출처 추가
        scriptSrc: ["'self'", "https://dapi.kakao.com", "http://dapi.kakao.com", "https://t1.daumcdn.net"], // 스크립트 출처 추가
        styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"], // 필요 시 스타일 출처 추가
      },
    },
  }));

app.use(compression());

// 클라이언트의 빌드된 정적 파일 제공
app.use(express.static(path.join(__dirname, '../..', 'react_map_box', 'dist')));

mountRouters(app);

// 모든 요청에 대해 React 앱의 index.html 파일을 반환
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'react_map_box', 'dist', 'index.html')); 
});



export default app;