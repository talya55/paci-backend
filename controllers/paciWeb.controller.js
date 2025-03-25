import PaciWeb from "../models/paciWeb.js";


// Create a new PaciWeb
export const createPaciWeb = async (req, res) => {
  try {
    const paciWeb = await PaciWeb.create(req.body);
    res.status(201).json(paciWeb);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all PaciWebs
export const getAllPaciWebs = async (req, res) => {
  try {
    const paciWebs = await PaciWeb.find();
    res.status(200).json(paciWebs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single PaciWeb by ID
export const getPaciWebById = async (req, res) => {
  try {
    const { id } = req.params;
    const paciWeb = await PaciWeb.findById(id);
    if (!paciWeb) {
      return res.status(404).json({ message: "PaciWeb not found" });
    }
    res.status(200).json(paciWeb);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a PaciWeb by ID
export const updatePaciWeb = async (req, res) => {
  try {
    const { id } = req.params;
    const paciWeb = await PaciWeb.findByIdAndUpdate(id, req.body, { new: true });
    if (!paciWeb) {
      return res.status(404).json({ message: "PaciWeb not found" });
    }
    res.status(200).json(paciWeb);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a PaciWeb by ID
export const deletePaciWeb = async (req, res) => {
  try {
    const { id } = req.params;
    const paciWeb = await PaciWeb.findByIdAndDelete(id);
    if (!paciWeb) {
      return res.status(404).json({ message: "PaciWeb not found" });
    }
    res.status(200).json({ message: "PaciWeb deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

