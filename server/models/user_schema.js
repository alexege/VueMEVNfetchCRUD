const { Schema, model } = require('mongoose');

// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'name field is required'],
//     },
//     age: {
//       type: Number,
//       required: [true, 'age field is required'],
//     },
//   },
//   { timestamps: true },
// );

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'username field is required'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'password field is required'],
    },
  },
  { timestamps: true },
);


module.exports = model('users', userSchema);
