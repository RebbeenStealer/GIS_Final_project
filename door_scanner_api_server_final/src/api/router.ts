import { Express } from "express";
import  kakao from './kakao/index';

// const mountRouters = (app:Express) => {
//     app.use('/buildings',building)
// }

const mountRouters = (app:Express) => {
    app.use('/api', kakao)
}

export default mountRouters;