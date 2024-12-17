import { Express } from "express";
import  building from './buildings/index';

// const mountRouters = (app:Express) => {
//     app.use('/buildings',building)
// }

const mountRouters = (app:Express) => {
    app.use('/api', building)
}

export default mountRouters;