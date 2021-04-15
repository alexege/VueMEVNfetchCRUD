'use strict';

const Dino = require('../models/dino_schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'asdflkjasdflkjasdflkjffee';

const createDino = (req, res) => {
    console.log("req body:", req.body);
  Dino.create(req.body)
    .then((data) => {
      console.log('New Dino Created!', data);
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.error('Error Validating!', err);
        res.status(422).json(err);
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

const getDino = (req, res) => {
  Dino.findOne({ _id: req.params.id})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const getAllDinos = (req, res) => {
  Dino.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const editDinoAmount = (req, res) => {
  Dino.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      console.log('User updated!');
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.error('Error Validating!', err);
        res.status(422).json(err);
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

const updateDinoAmount = (req, res) => {
  Dino.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      console.log('Dino updated!');
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.error('Error Validating!', err);
        res.status(422).json(err);
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

const deleteDino = (req, res) => {
    Dino.findById(req.params.id)
        .then((data) => {
            if(!data) {
                throw new Error('Dino not available');
            }
            return data.remove();
        })
        .then((data) => {
            console.log('Dinosaur removed!');
            res.status(200).json(data);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json(err);
          });
}

module.exports = {
    createDino,
    deleteDino,
    editDinoAmount,
    updateDinoAmount,
    getDino,
    getAllDinos
//   loginUser,
//   registerUser,
//   readOneData,
//   readData,
//   updateData,
};
