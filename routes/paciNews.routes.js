import express from 'express';
import { createPaciNews, deletePaciNews, getAllPaciNewss, getPaciNewsById, updatePaciNews } from '../controllers/paciNews.controller.js';


const router = express.Router();

// Create a new PaciNews
router.post('/', createPaciNews);

// Get all PaciNewss
router.get('/', getAllPaciNewss);

// Get a single PaciNews by ID
router.get('/:id', getPaciNewsById);

// Update a PaciNews by ID
router.put('/:id', updatePaciNews);

// Delete a PaciNews by ID
router.delete('/:id', deletePaciNews);

export default router;
