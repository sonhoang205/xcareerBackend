const mongoose = require('mongoose');

const BacklogSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref:"Project"
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref:"User"
  }
}, {
  timestamps: true
});

const BacklogModel = mongoose.model('Backlog', BacklogSchema);

module.exports = BacklogModel;