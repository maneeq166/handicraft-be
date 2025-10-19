const fs = require('fs/promises');
const  cloudinary1  = require('../../config/cloudinary/index');


exports.uploadSingleFile = async (filePath, folder = '') => {
   try {
      const result = await cloudinary1.uploader.upload(filePath, {
         folder,
      });
      await fs.unlink(filePath);

      return result.secure_url;
   } catch (error) {
      throw new Error(`Single File Upload Error: ${error.message}`);
   }
};

exports.uploadMultipleFiles = async (files, folder = '') => {
  try {
    const uploaded = [];

    for (const file of files) {
      const result = await cloudinary1.uploader.upload(file.path, { folder });
      uploaded.push({ public_id: result.public_id, url: result.secure_url });
      await fs.unlink(file.path);
    }

    return uploaded;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error(`Multiple File Upload Error: ${error.message || error}`);
  }
};



// exports.uploadVoiceNote = async (filePath, folder = '') => {
//    try {
//       const result = await cloudinary_js_config.uploader.upload(filePath, {
//          folder,
//          resource_type: 'video',
//       });
//       await fs.unlink(filePath);
//       return result.secure_url;
//    } catch (error) {
//       throw new Error(`Voice Note Upload Error: ${error.message}`);
//    }
// };

// exports.uploadPDF = async (filePath, folder = '') => {
//    try {
//       const result = await cloudinary_js_config.uploader.upload(filePath, {
//          folder,
//          resource_type: 'raw',
//       });
//       await fs.unlink(filePath);
//       return result.secure_url;
//    } catch (error) {
//       throw new Error(`PDF Upload Error: ${error.message}`);
//    }
// };