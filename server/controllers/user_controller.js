'use strict';

const User = require('../models/user_schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dino_schema = require('../models/dino_schema');
const JWT_SECRET = 'asdflkjasdflkjasdflkj';

const registerUser = async (req, res) => {
  // const username = "Alexander";
  // const plainTextPassword = "password";
  const { username, password: plainTextPassword } = req.body;
  
  //Check validity of username
  if(!username || typeof username !== 'string') {
    return res.json({ status: 'error', error: 'Invalid username'})
  }

  //Check validity of password
  if(!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.json({ status: 'error', error: 'Invalid password'})
  }

  if(plainTextPassword.length < 2){
    return res.json({
      status: 'error',
      error: 'Password is too small. Please enter a password of 2 or more characters'
    })
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      username, 
      password
    })
    console.log('User created successfully', response);
  } catch (error) {
    if(error.code === 11000){
      //Duplicate key
      return res.json({status: 'error', error:  'Username already in use'})
    }
    throw error
  }
}

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean()
  
  if(!user) {
    return res.json({ status: 'error', error: 'Invalid username/password'})
  }

  if(await bcrypt.compare(password, user.password, function(err, resp){
    if(err) {
      throw new Error(err)
    }
    if(resp) {
      //The username and password combo was successful.
      const token = jwt.sign(
      { 
        id: user._id, 
        username: user.username 
      }, JWT_SECRET)

      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      })

      return res.json({ status: 'ok', data: token })

    } else {
      return res.json({ status: 'error', error: 'Invalid username/password'})
    }
  }));
}

const getLoggedInUser = async (req, res) => {
  try {
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, JWT_SECRET)
  
    if(!claims) {
      return res.status(401).send({
        message: 'unauthenticated'
      })
    }
  
    const user = await User.findOne({ _id: claims._id})
  
    const {password, ...data} = await user.toJSON();
  
    res.send(data);
  }
  catch (e) {
    return res.status(401).send({
      message: 'unauthenticated'
    })
  }
}

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 0})
  res.send({
    message: 'Successful logout'
  })
}

const createData = (req, res) => {
  User.create(req.body)
    .then((data) => {
      console.log('New User Created!', data);
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

const readOneData = (req, res) => {
  User.findOne({ _id: req.params.id})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const readData = (req, res) => {
  User.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const updateData = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
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

const deleteData = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new Error('User not available');
      }
      return data.remove();
    })
    .then((data) => {
      console.log('User removed!');
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
  loginUser,
  getLoggedInUser,
  logout,
  registerUser,
  createData,
  readOneData,
  readData,
  updateData,
  deleteData,
};
