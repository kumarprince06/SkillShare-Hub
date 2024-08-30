const crypto = require('crypto');
const DeleteCloudinaryImage = (req, res) =>{
  const { public_id, timestamp } = req.body;
  // console.log("Body:", req.body)
  const dataToSign = `public_id=${public_id}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
  const signature = crypto.createHash('sha1').update(dataToSign).digest('hex');

  res.json({
    signature,
    api_key: process.env.CLOUDINARY_API_KEY,
    timestamp,
  });
} 

module.exports = DeleteCloudinaryImage