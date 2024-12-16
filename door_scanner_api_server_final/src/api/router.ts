import { Express } from "express";
import  building from './buildings/index';

const mountRouters = (app:Express) => {
    app.use('/buildings',building)
}

export default mountRouters;