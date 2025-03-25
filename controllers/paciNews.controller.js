import PaciNews from '../models/PaciNews.js';


// Create a new PaciNews
export const createPaciNews = async (req, res) => {
  try {
    const paciNews = await PaciNews.create(req.body);
    res.status(201).json(paciNews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all PaciNewss
export const getAllPaciNewss = async (req, res) => {
  try {
    const paciNewss = await PaciNews.find();
    res.status(200).json(paciNewss);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single PaciNews by ID
export const getPaciNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const paciNews = await PaciNews.findById(id);
    if (!paciNews) {
      return res.status(404).json({ message: "PaciNews not found" });
    }
    res.status(200).json(paciNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a PaciNews by ID
export const updatePaciNews = async (req, res) => {
  try {
    const { id } = req.params;
    const paciNews = await PaciNews.findByIdAndUpdate(id, req.body, { new: true });
    if (!paciNews) {
      return res.status(404).json({ message: "PaciNews not found" });
    }
    res.status(200).json(paciNews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a PaciNews by ID
export const deletePaciNews = async (req, res) => {
  try {
    const { id } = req.params;
    const paciNews = await PaciNews.findByIdAndDelete(id);
    if (!paciNews) {
      return res.status(404).json({ message: "PaciNews not found" });
    }
    res.status(200).json({ message: "PaciNews deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

