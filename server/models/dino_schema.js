const { Schema, model } = require('mongoose');

const dinoSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name field is required'],
    },
    owner: {
      type: String
    },
    amount: {
      type: Number,
      required: [true, 'amount field is required'],
    },
  },
  { timestamps: true },
);

module.exports = model('users', userSchema);