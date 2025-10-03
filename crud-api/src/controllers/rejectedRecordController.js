const RejectedRecord = require('../models/rejectedRecord');

exports.getAllRejectedRecords = async (req, res) => {
  try {
    const records = await RejectedRecord.findAll();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving rejected records', error });
  }
};

exports.getRejectedRecordById = async (req, res) => {
  try {
    const record = await RejectedRecord.findById(req.params.id);
    if (record) {
      res.json(record);
    } else {
      res.status(404).json({ message: 'Rejected record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving rejected record', error });
  }
};

exports.updateRejectedRecord = async (req, res) => {
  try {
    const updated = await RejectedRecord.update(req.params.id, req.body);
    if (updated) {
      res.json({ message: 'Rejected record updated successfully' });
    } else {
      res.status(404).json({ message: 'Rejected record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating rejected record', error });
  }
};

exports.deleteRejectedRecord = async (req, res) => {
  try {
    const deleted = await RejectedRecord.delete(req.params.id);
    if (deleted) {
      res.json({ message: 'Rejected record deleted successfully' });
    } else {
      res.status(404).json({ message: 'Rejected record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting rejected record', error });
  }
};
