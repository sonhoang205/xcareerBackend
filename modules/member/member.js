const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    projectId: {
        type: mongoose.Types.ObjectId,
    },
},
    {
        timestamps: true
    });

const MemberModel = mongoose.model('Member', MemberSchema);

module.exports = MemberModel;
