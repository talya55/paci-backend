import express from 'express';
import {
  createNavbar,
  getAllNavbars,
  getNavbarById,
  updateNavbar,
  deleteNavbar,
} from '../controllers/navbar.controller.js';

const router = express.Router();

// Create a new Navbar
router.post('/', createNavbar);

// Get all Navbars
router.get('/', getAllNavbars);

// Get a single Navbar by ID
router.get('/:id', getNavbarById);

// Update a Navbar by ID
router.put('/:id', updateNavbar);

// Delete a Navbar by ID
router.delete('/:id', deleteNavbar);

export default router;
