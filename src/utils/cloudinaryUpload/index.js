const cloudinary1343 = require("../config/cloudinary")

// This function uploads a file and returns { url, public_id }
exports.uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) throw new Error("No file path provided to upload");



    const result = await cloudinary1343.uploader.upload(localFilePath, {
      resource_type: "image",
    });   

  

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

