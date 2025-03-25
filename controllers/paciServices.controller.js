import PaciServices from '../models/PaciServices.js';



// Create a new PaciServices
export const createPaciServices = async (req, res) => {
  try {
    const paciServices = await PaciServices.create(req.body);
    res.status(201).json(paciServices);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all PaciServicess
export const getAllPaciServicess = async (req, res) => {
  try {
    const paciServices = await PaciServices.find();
    res.status(200).json(paciServices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single PaciServices by ID
export const getPaciServicesById = async (req, res) => {
  try {
    const { id } = req.params;
    const paciServices = await PaciServices.findById(id);
    if (!paciServices) {
      return res.status(404).json({ message: "PaciServices not found" });
    }
    res.status(200).json(paciServices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a PaciServices by ID
export const updatePaciServices = async (req, res) => {
  try {
    const { id } = req.params;
    const paciServices = await PaciServices.findByIdAndUpdate(id, req.body, { new: true });
    if (!paciServices) {
      return res.status(404).json({ message: "PaciServices not found" });
    }
    res.status(200).json(paciServices);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a PaciServices by ID
export const deletePaciServices = async (req, res) => {
  try {
    const { id } = req.params;
    const paciServices = await PaciServices.findByIdAndDelete(id);
    if (!paciServices) {
      return res.status(404).json({ message: "PaciServices not found" });
    }
    res.status(200).json({ message: "PaciServices deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


