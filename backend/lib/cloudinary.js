import { v2 as cloudinary } from "cloudinary";
import "dotenv/config"

cloudinary.config({
    secure: true,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME
});

export default cloudinary;
//Create
// let cloudinaryResponse = null;
// if (image) {
//     cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" })
// }

//Delete
// if (product.image) {
//     const publicId = product.image.split("/").pop().split(".")[0];
//     try {
//         await cloudinary.uploader.destroy(`products/${publicId}`)
//     } catch (error) {
//         console.log("Error in deleting image from cloudinary", error.message);
//         res.status(500).json({ message: "Server error", error: error.message })
//     }
// }