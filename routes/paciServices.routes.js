import express from 'express';
import { createPaciServices, deletePaciServices, getAllPaciServicess, getPaciServicesById, updatePaciServices } from '../controllers/paciServices.controller.js';


const router = express.Router();

// Create a new PaciServices
router.post('/', createPaciServices);

// Get all PaciServicess
router.get('/', getAllPaciServicess);

// Get a single PaciServices by ID
router.get('/:id', getPaciServicesById);

// Update a PaciServices by ID
router.put('/:id', updatePaciServices);

// Delete a PaciServices by ID
router.delete('/:id', deletePaciServices);

export default router;
