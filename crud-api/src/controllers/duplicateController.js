const Duplicate = require('../models/duplicate');

exports.getAllDuplicates = async (req, res) => {
  try {
    const duplicates = await Duplicate.findAll();
    res.json(duplicates);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving duplicates', error });
  }
};

exports.getDuplicateById = async (req, res) => {
  try {
    const duplicate = await Duplicate.findById(req.params.id);
    if (duplicate) {
      res.json(duplicate);
    } else {
      res.status(404).json({ message: 'Duplicate not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving duplicate', error });
  }
};

exports.updateDuplicate = async (req, res) => {
  try {
    const updated = await Duplicate.update(req.params.id, req.body);
    if (updated) {
      res.json({ message: 'Duplicate updated successfully' });
    } else {
      res.status(404).json({ message: 'Duplicate not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating duplicate', error });
  }
};

exports.deleteDuplicate = async (req, res) => {
  try {
    const deleted = await Duplicate.delete(req.params.id);
    if (deleted) {
      res.json({ message: 'Duplicate deleted successfully' });
    } else {
      res.status(404).json({ message: 'Duplicate not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting duplicate', error });
  }
};
