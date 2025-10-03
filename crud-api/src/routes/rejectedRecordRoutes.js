const express = require('express');
const router = express.Router();
const rejectedRecordController = require('../controllers/rejectedRecordController');

// Get all rejected records
router.get('/rejected-records', rejectedRecordController.getAllRejectedRecords);

// Get a single rejected record by ID
router.get('/rejected-records/:id', rejectedRecordController.getRejectedRecordById);

// Update a rejected record (to correct errors)
router.put('/rejected-records/:id', rejectedRecordController.updateRejectedRecord);

// Delete a rejected record
router.delete('/rejected-records/:id', rejectedRecordController.deleteRejectedRecord);

module.exports = router;
