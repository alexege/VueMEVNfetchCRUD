const { Schema, model } = require('mongoose');

const dinoSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name field is required'],
    },
    amount: {
      type: Number,
      required: [true, 'amount field is required'],
    },
    breeder: {
      type: String,
      default: "Admin"
    },
    users: [{
      type: Schema.Types.ObjectId,
      ref: "users"
    }]
  },
  { timestamps: true },
);

module.exports = model('dinos', dinoSchema);