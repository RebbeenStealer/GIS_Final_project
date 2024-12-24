import { Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();
import seoulService from "../service/seoul.service";

const getCityData = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;

  if (!query) {
    res.status(400).json({ message: "Query parameter is required" });
    return;
  }

  try {
    const response = await seoulService.getCityData(query as string);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "Error fetching data from the API", error });
  }
};


const getCityData_ppltn = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;

  if (!query) {
    res.status(400).json({ message: "Query parameter is required" });
    return;
  }

  try {
    const response = await seoulService.getCityData_ppltn(query as string);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "Error fetching data from the API", error });
  }
};

<<<<<<< Updated upstream
export default {
  getCityData_ppltn,
  getCityData,
=======
const getWeather = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    res.status(400).json({ message: "Query parameter is required and must be a string" });
    return;
  }

  try {
    const weatherData = await seoulService.getWeather(query);
    res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "Error fetching weather data", error: error });
  }
};


export default {
  getCityData_ppltn,
  getCityData,
  getWeather,
>>>>>>> Stashed changes
};
