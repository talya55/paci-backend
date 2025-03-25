import DailyNews from '../models/DailyNews.js';


// Create a new DailyNews
export const createDailyNews = async (req, res) => {
  try {
    const dailyNews = await DailyNews.create(req.body);
    res.status(201).json(dailyNews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all DailyNewss
export const getAllDailyNewss = async (req, res) => {
  try {
    const dailyNews = await DailyNews.find();
    res.status(200).json(dailyNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single DailyNews by ID
export const getDailyNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const dailyNews = await DailyNews.findById(id);
    if (!dailyNews) {
      return res.status(404).json({ message: "DailyNews not found" });
    }
    res.status(200).json(dailyNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a DailyNews by ID
export const updateDailyNews = async (req, res) => {
  try {
    const { id } = req.params;
    const dailyNews = await DailyNews.findByIdAndUpdate(id, req.body, { new: true });
    if (!dailyNews) {
      return res.status(404).json({ message: "DailyNews not found" });
    }
    res.status(200).json(dailyNews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a DailyNews by ID
export const deleteDailyNews = async (req, res) => {
  try {
    const { id } = req.params;
    const dailyNews = await DailyNews.findByIdAndDelete(id);
    if (!dailyNews) {
      return res.status(404).json({ message: "DailyNews not found" });
    }
    res.status(200).json({ message: "DailyNews deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

