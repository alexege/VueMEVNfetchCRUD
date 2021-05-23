const { Schema, model } = require('mongoose');

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
    role: {
      type: String,
      default: 'user'
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Dino"
    }
  },
  { timestamps: true },
);


module.exports = model('users', userSchema);
