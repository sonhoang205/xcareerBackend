require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const authRouter = require('./modules/auth/auth.router');
const projectRouter = require('./modules/project/project.router');
const sprintRouter = require('./modules/Sprint/sprint.router');
const taskRouter = require('./modules/Task/task.router');
const commentRouter = require('./modules/comment/comment.router');
const workspaceRouter = require('./modules/workspace/workspace.router');
const memberRouter = require('./modules/member/member.router');
const uploadRouter = require('./modules/upload/upload.router');



mongoose.connect(process.env.MONGODB_URI , err => { 
  if (err) {
    return console.log('DB connect err', err);
  }
  console.log('DB connect success');
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('uploads'));


app.use('/api/auth', authRouter);
app.use('/api/sprint', sprintRouter);
app.use('/api/project', projectRouter);
app.use('/api/task', taskRouter);
app.use('/api/comment', commentRouter);
app.use('/api/workspace', workspaceRouter);
app.use('/api/member', memberRouter);
app.use('/api/upload', uploadRouter);


app.use('*', (req, res) => {
  res.send({ message: '404 not found' })
})

app.use((err,req,res,next)=>{
  console.error(err.stack);
  res.status.send({success:0,message:err.message})
})

app.listen(process.env.PORT || 9090, (err) => {
  if (err) {
    return console.log('Server Error', err);
  }
  console.log('Server started');
})