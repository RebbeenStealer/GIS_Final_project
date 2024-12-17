// src/api/controllers/kakaoController.ts
import { Request, Response } from "express";
import kakaoService from '../service/kakao.service';

const getRegionCode = async (req: Request, res: Response): Promise<void> => {
    const { x, y } = req.query; 

    try {
        const response = await kakaoService.getRegionCode(x as string, y as string);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data from Kakao API' });
    }
};

const getGeo = async (req: Request, res: Response): Promise<void> => {
    const { x, y } = req.query; 

    try {
        const response = await kakaoService.getGeo(x as string, y as string);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data from Kakao API' });
    }
};

const getCoordinatesFromAddress = async (req: Request, res: Response): Promise<void> => {
    const query = req.query.query as string;
    if (!query) {
        res.status(400).json({ error: 'Query parameter is required' });
        return;
    }
    try {
        const response = await kakaoService.getCoordinatesFromAddress(query);
        res.status(200).json(response.data);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data from Kakao API' });
    }
};

const getLocationsByCategory = async (req: Request, res: Response): Promise<void> => {
    const { category_group_code, y, x, radius } = req.query as { 
        category_group_code: string; 
        y: string,
        x: string
        radius?: string;
    };

    // 필수 매개변수 확인
    if (!category_group_code) {
        res.status(400).json({ error: 'category_group_code 매개변수가 필요합니다.' });
        return;
    }

    try {
        const response = await kakaoService.getLocationsByCategory(category_group_code, y, x, radius ? Number(radius) : undefined);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kakao API에서 데이터를 가져오는 데 실패했습니다.' });
    }
};

const getLocationsByKeyword = async (req: Request, res: Response): Promise<void> => {
    const { query, category_group_code, y, x, radius } = req.query as { 
        query: string;
        category_group_code?: string;
        y?: string;
        x?: string; 
        radius?: string;
    };

    // 필수 매개변수 확인
    if (!query) {
        res.status(400).json({ error: 'query 매개변수가 필요합니다.' });
        return;
    }

    // category_group_code가 선택적이므로 기본값 설정 또는 처리
    const categoryGroupCode = category_group_code || ''; // 기본값 설정 (필요시)

    try {
        const response = await kakaoService.getLocationsByKeyword(query, categoryGroupCode, y, x, radius ? Number(radius) : undefined);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kakao API에서 데이터를 가져오는 데 실패했습니다.' });
    }
};





export default {
  getRegionCode,
  getGeo,
  getCoordinatesFromAddress,
  getLocationsByCategory,
  getLocationsByKeyword
};
