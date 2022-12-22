const UserModel = require('./user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const res = require('express/lib/response');

const register = async (req, res) => {
  try {
    const { username, password, name, admin } = req.body;
    const existedUser = await UserModel.findOne({ username });

    if (existedUser) {
      throw new Error('Username duplicate');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      name,
      username,
      password: hashPassword,
      admin
    });

    // send => JSON.stringify({})
    // hydrate document => JSON hoá => bỏ các trường linh tinh mongoose đi
    const cloneNewUser = JSON.parse(JSON.stringify(newUser));

    res.status(200).send({
      success: 1,
      data: {
        ...cloneNewUser,
        password: '',
      }
    });

  } catch (err) {
    console.log('error');
    res.status(400).send({ success: 0, message: err.message })
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existedUser = await UserModel.findOne({
      username,
    });

    if (!existedUser) {
      throw new Error('Username hoặc password không đúng');
    }

    const matchedPassword = await bcrypt.compare(password, existedUser.password);

    if (!matchedPassword) {
      throw new Error('Username hoặc password không đúng');
    }

    const userId = existedUser._id;
    // token
    // header: định danh thuật toán sha256
    // payload: thông tin mã hoá => base64
    // signature: sha256(header + payload)
    // key: private key (server biết)

    const token = jwt.sign({
      userId,
    }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24
    })


    res.send({
      success: 1,
      data: { _id: userId, token, username }
    });
    // console.log(process.env.SECRET_KEY);

  } catch (err) {
    res.status(400).send({ success: 0, message: err.message })
  }
}

const seeUsers = async (req, res) => {
  try {
    const { offset, limit } = req.params
    const allUsers = await UserModel.find({})
      .skip(offset)
      .limit(limit);
    res.send({ success: 1, data: allUsers });
  } catch (error) {
    res.status(400).send({ success: 0, data: [] });
  }
}
const getUserInfor = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const data = jwt.verify(token, process.env.SECRET_KEY);
    const { userId } = data;
    const findUser = await UserModel.findById(userId);
    res.send({ success: 1, data: findUser })
  } catch (error) {
    res.send({ success: 0 })
  }
}

module.exports = {
  register,
  login,
  seeUsers,
  getUserInfor,
}