import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({});

cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
});

export const uploadMedia = async (file) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      resource_type: "auto", // Let Cloudinary detect the resource type (image or video)
    });
    return uploadResponse;
  } catch (error) {
    console.log(error);
    throw error; // Throw error to be handled by the calling function
  }
};

export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" }); // Specify resource_type as image
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteVideoFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" }); // Specify resource_type as video
  } catch (error) {
    console.log(error);
    throw error;
  }
};
