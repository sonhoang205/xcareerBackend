require('dotenv').config()
const UserModel = require('../modules/auth/user');


async function isAdmin(req, res, next) {
    try {
        const user = req.user;

        if (user.admin === true) {
            next()
        }
        throw new Error('Only admin can do operation')
    } catch (error) {
        console.log(error);
        res.status(403).send({ success: 0, message: error })
    }
}

module.exports = isAdmin