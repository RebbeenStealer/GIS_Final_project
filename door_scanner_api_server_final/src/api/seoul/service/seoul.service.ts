import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

class SeoulService {
  private readonly API_KEY: string;
  private readonly BASE_URL: string = 'http://openapi.seoul.go.kr:8088';
<<<<<<< Updated upstream
=======
  private cityData: any = null;
>>>>>>> Stashed changes

  constructor() {
    this.API_KEY = process.env.SEOUL_API_KEY || '';
  }

  private async request<T>(endpoint: string, params?: object): Promise<AxiosResponse<T>> {
    return axios.get(`${this.BASE_URL}/${this.API_KEY}/json${endpoint}`, { params });
  }

  async getCityData_ppltn(query: string) {
    const endpoint = `/citydata_ppltn/1/5/${encodeURIComponent(query)}`;
    return this.request(endpoint);
  }

  async getCityData(query: string) {
<<<<<<< Updated upstream
    const endpoint = `/citydata/1/5/${encodeURIComponent(query)}`;
    return this.request(endpoint);
  }
=======
    const endpoint = `/citydata/1/1/${encodeURIComponent(query)}`;
    return this.request(endpoint);
  }

  async fetchAndStoreCityData(query: string) {
    try {
      const response = await this.getCityData(query);
      this.cityData = response.data;
      console.log('City data fetched and stored successfully');
      return this.cityData;
    } catch (error) {
      console.error('Error fetching city data:', error);
      throw error;
    }
  }

  async getWeather(query: string) {
    try {
      const cityData = await this.fetchAndStoreCityData(query);

      const weatherData = cityData?.CITYDATA?.WEATHER_STTS?.[0];

      if (!weatherData) {
        throw new Error('Weather data not found');
      }

      return weatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  
>>>>>>> Stashed changes
}

export default new SeoulService();
