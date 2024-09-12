// const { findById } = require("../model/membershipSchema");
const Shoksandesh = require("../model/shoksandeshSchema")

exports.addshoksandeshDetail = async (req,res) => {
     const {
       name,
       age,
       dob,
       dod,
       dateofceremony,
       timing,
       address,
       familyname,
     } = req.body;

    try {
      // Phone number validation: should be 10 digits
      // const phonePattern = /^\d{10}$/;
      // if (!phonePattern.test(phonenumber)) {
      //   throw new Error(
      //     "Invalid phone number. It should be a 10-digit number."
      //   );
      // }
      // Regular expression to match the DD/MM/YYYY format
      const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const match = dob.match(datePattern);

      if (!match) {
        throw new Error("Invalid date format. Please use DD/MM/YYYY.");
      }

      // Extract the parts of the date
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1; // Month is zero-indexed in JS (0 = January)
      const year = parseInt(match[3], 10);

      // Create a valid JavaScript Date object (using Date.UTC to avoid timezone issues)
      const formattedDate = new Date(Date.UTC(year, month, day));

      // Check if the date is valid
      if (isNaN(formattedDate.getTime())) {
        throw new Error("Invalid date value.");
      }
      const shoksandesh = new Shoksandesh({
        name,
        age,
        dob,
        dod,
        dateofceremony: formattedDate,
        timing,
        address,
        familyname,
      });

      await shoksandesh.save();
      return res.status(200).json({
        message: "shoksandesh  is created",
        shoksandesh,
      });
    } catch (error) {
       return res.status(400).json({
         message: "shoksandesh is not created",
         error: error.message,
       });
     }

}

exports.getshoksandeshDetails =async (req,res) => {
     try {
       const ShoksandeshDetails = await Shoksandesh.find();
       res.json({ShoksandeshDetails });
     } catch (error) {
       res.status(400).json({
         message: "Failed to find details",
         error: error.message, // Include the error message for debugging
       });
     } 
    
}
exports.getshoksandeshDetail =async (req,res) => {
try {
    const id = req.params.id;
    console.log(id);

    if (!id) {
      return res.status(400).json({
        msg: "id not found",
      });
    }
    const shoksandeshDetail = await Shoksandesh.findById(id)
    if (!shoksandeshDetail) {
      return res.status(400).json({
        msg: "detail of person not found",
      });
    }
     res.json({ shoksandeshDetail });


} catch (error) {
     res.status(400).json({
       message: "Failed to find details",
       error: error.message, // Include the error message for debugging
     });
}
       
}

exports.deleteshoksandeshDetail = async (req,res) => {
     try {
       const id = req.params.id;
       console.log(id);

       if (!id) {
         return res.status(400).json({
           msg: "id not found",
         });
       }
       const ShoksandeshDetail= await Shoksandesh.findByIdAndDelete(id);
       if (!ShoksandeshDetail) {
         return res.status(400).json({
           msg: "detail of person not found",
         });
       }
       return res.status(200).json({
         msg: "shokshandesh  deleted successfully",
         ShoksandeshDetail,
       });
     } catch (error) {
       console.log(error);
       return res.status(500).json({ message: error.message });
     }

}