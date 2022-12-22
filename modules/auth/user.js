const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name:{
    type: String,
    required:true,
  },
  // email:{
  //   type: String,
  //   required:true
  // },
  admin: {
    type: Boolean,
    require: true,
    default: false
  }

}, {
  // tự động thêm createdAt, updatedAt
  timestamps: true
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
