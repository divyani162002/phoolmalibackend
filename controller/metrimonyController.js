const Matrimony = require("../model/matrimonySchema")
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;

// exports.addmatrimonyDetails =async (req,res) => {
//     const { name, age, gender, occupation, email,number,bio } = req.body;
//   try {
//     // Phone number validation: should be 10 digits
//     const phonePattern = /^\d{10}$/;
//     if (!phonePattern.test(phonenumber)) {
//       throw new Error("Invalid phone number. It should be a 10-digit number.");
//     }
//     const matrimony = new Matrimony({
//       name,
//       age,
//       gender,
//       occupation,
//       email,
//       number,
//       bio,
//     });

//     await matrimony.save();
//     return res.status(200).json({
//       message: "matrimny  is created",
//       matrimony,
//     });
//   } catch (error) {
//        return res.status(400).json({
//          message: "matrimny is not created",
//          error: error.message,
//        });
//      }

// }


function FileTypeSupported(type, supportedType) {
  return supportedType.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };

  // options.resource_type = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  const { name, age, gender, occupation, email, phonenumber, bio } = req.body;
  try {
    // console.log(req.body); // Log body to see if it's populated correctly
    // console.log(req.files);
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phonenumber)) {
      throw new Error("Invalid phone number. It should be a 10-digit number.");
    }

    // Check if email already exists
    const existingMatrimony = await Matrimony.findOne({ email });
    if (existingMatrimony) {
      return res.status(400).json({
        success: false,
        message: "An entry with this email already exists.",
      });
    }
    const file = req.files.file;
    console.log(file);

    const supportedType = ["jpg", "jpeg", "png", "pdf"];

    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("file Type", fileType);

    if (!FileTypeSupported(fileType, supportedType)) {
      return res.status(400).json({ message: "file formate not supported" });
    }

    //upload file to cloudinary
    const response = await uploadFileToCloudinary(file, "matrimony_photo");
    console.log(response);

    try {
      console.log("Files Received ");

      const newMatrimony = new Matrimony({
        name,
        age,
        gender,
        occupation,
        email,
        phonenumber,
        bio,
        imgUrl: response.secure_url,
      });

      // Save the new rescue to the database
      newMatrimony.save();

      return res
        .status(200)
        .json({ message: "matrimony added successfully", newMatrimony });
    } catch (error) {
      console.log(error);
      res.status(500).send("server error- " + error);
    }
    //db me entry
    const fileData = await Matrimony.create({
      name,
      age,
      gender,
      occupation,
      email,
      phonenumber,
      bio,
      imgUrl: response.secure_url,
    });

    res.status(200).json({
      message: "Image successfully uploaded at",
      imgUrl: response.secure_url,
    });
  } catch (error) {
               console.error(error);
               res.status(400).json({
                 success: false,
                 message: "Something went wrong",
               });
             }
           };



           exports.getmatrimonyDetails = async (req, res) => {
             try {
               const matrimonyDetails = await Matrimony.find();
               res.json({ matrimonyDetails });
             } catch (error) {
               res.status(400).json({
                 message: "Failed to find details",
                 error: error.message, // Include the error message for debugging
               });
             }
           };

exports.getmatrimonyDetail = async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);

      if (!id) {
        return res.status(400).json({
          msg: "id not found",
        });
      }
      const matrimonyDetail = await Matrimony.findById(id);
      if (!matrimonyDetail) {
        return res.status(400).json({
          msg: "detail of person not found",
        });
      }
      res.json({ matrimonyDetail });
    } catch (error) {
      res.status(400).json({
        message: "Failed to find details",
        error: error.message, // Include the error message for debugging
      });
    }
}
exports.deletematrimonyDetail = async (req,res) => {
         try {
           const id = req.params.id;
           console.log(id);

           if (!id) {
             return res.status(400).json({
               msg: "id not found",
             });
           }
           const matrimonyDetail = await Matrimony.findByIdAndDelete(id);
           if (!matrimonyDetail) {
             return res.status(400).json({
               msg: "detail of person not found",
             });
           }
           return res.status(200).json({
             msg: "matrimny  deleted successfully",
             matrimonyDetail,
           });
         } catch (error) {
           console.log(error);
           return res.status(500).json({ message: error.message });
         }

}