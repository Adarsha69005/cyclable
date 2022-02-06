const multer = require('multer');

const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/product_image')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  });
  const uploadimage = multer({storage: storage1});


  module.exports = {
    uploadimage : uploadimage
  }