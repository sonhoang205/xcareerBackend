const uploadToDisk = (req, res) => {
    console.log(req.file.originalname);
  
    res.send({ success: 1, data: req.file.originalname })
  }

module.exports = {uploadToDisk }