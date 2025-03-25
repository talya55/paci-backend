import express from 'express';
import { createDailyNews, deleteDailyNews, getAllDailyNewss, getDailyNewsById, updateDailyNews } from '../controllers/dailyNews.controller.js';


const router = express.Router();

// Create a new DailyNews
router.post('/', createDailyNews);

// Get all DailyNewss
router.get('/', getAllDailyNewss);

// Get a single DailyNews by ID
router.get('/:id', getDailyNewsById);

// Update a DailyNews by ID
router.put('/:id', updateDailyNews);

// Delete a DailyNews by ID
router.delete('/:id', deleteDailyNews);

export default router;
