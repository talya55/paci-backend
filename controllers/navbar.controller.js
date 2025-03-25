import Navbar from "../models/Navbar.js";

// Create a new Navbar
export const createNavbar = async (req, res) => {
  try {
    const navbar = await Navbar.create(req.body);
    res.status(201).json(navbar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Navbars
export const getAllNavbars = async (req, res) => {
  try {
    const navbars = await Navbar.find();
    res.status(200).json(navbars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Navbar by ID
export const getNavbarById = async (req, res) => {
  try {
    const { id } = req.params;
    const navbar = await Navbar.findById(id);
    if (!navbar) {
      return res.status(404).json({ message: "Navbar not found" });
    }
    res.status(200).json(navbar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Navbar by ID
export const updateNavbar = async (req, res) => {
  try {
    const { id } = req.params;
    const navbar = await Navbar.findByIdAndUpdate(id, req.body, { new: true });
    if (!navbar) {
      return res.status(404).json({ message: "Navbar not found" });
    }
    res.status(200).json(navbar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Navbar by ID
export const deleteNavbar = async (req, res) => {
  try {
    const { id } = req.params;
    const navbar = await Navbar.findByIdAndDelete(id);
    if (!navbar) {
      return res.status(404).json({ message: "Navbar not found" });
    }
    res.status(200).json({ message: "Navbar deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
