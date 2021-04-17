const express = require('express');

const {
  loginUser,
  getLoggedInUser,
  logout,
  registerUser,
  createData,
  readOneData,
  readData,
  updateData,
  deleteData,
} = require('../controllers/user_controller');

const {
  getDino,
  getAllDinos,
  editDinoAmount,
  updateDinoAmount,
  createDino,
  deleteDino,
} = require('../controllers/dino_controller');

const router = express.Router();

router
  .get('/claim/getOne/:id', getDino)
  .get('/claim/getAll', getAllDinos)
  .post('/claim/add', createDino)
  .get('/claim/edit/:id', editDinoAmount)
  .put('/claim/update/:id', updateDinoAmount)
  .delete('/claim/delete/:id', deleteDino)
  .post('/register', registerUser)
  .post('/login', loginUser)
  .get('/user', getLoggedInUser)
  .post('/logout', logout)
  .post('/', createData)
  .get('/:id', readOneData)
  .get('/', readData)
  .put('/:id', updateData)
  .delete('/:id', deleteData);

module.exports = router;