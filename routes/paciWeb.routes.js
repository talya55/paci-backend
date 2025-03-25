import express from 'express';
import { createPaciWeb, deletePaciWeb, getAllPaciWebs, getPaciWebById, updatePaciWeb } from '../controllers/paciWeb.controller.js';


const router = express.Router();

// Create a new PaciWeb
router.post('/', createPaciWeb);

// Get all PaciWebs
router.get('/', getAllPaciWebs);

// Get a single PaciWeb by ID
router.get('/:id', getPaciWebById);

// Update a PaciWeb by ID
router.put('/:id', updatePaciWeb);

// Delete a PaciWeb by ID
router.delete('/:id', deletePaciWeb);

export default router;
