const express = require('express');
const router = express.Router();
const duplicateController = require('../controllers/duplicateController');

// Get all unresolved duplicates
router.get('/duplicates', duplicateController.getAllDuplicates);

// Get a single duplicate by ID
router.get('/duplicates/:id', duplicateController.getDuplicateById);

// Update a duplicate (e.g., mark as resolved)
router.put('/duplicates/:id', duplicateController.updateDuplicate);

// Delete a duplicate
router.delete('/duplicates/:id', duplicateController.deleteDuplicate);

module.exports = router;
