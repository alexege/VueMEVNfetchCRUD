const express = require('express');

const {
  createData,
  readOneData,
  readData,
  updateData,
  deleteData,
} = require('../controllers/user_controller');

const router = express.Router();

router
  .post('/', createData)
  .get('/:id', readOneData)
  .get('/', readData)
  .put('/:id', updateData)
  .delete('/:id', deleteData);

module.exports = router;
