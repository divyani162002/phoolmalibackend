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
         
        const dateParts = dateofceremony.split(","); // ["22", "04", "24"]
        const formattedDate = new Date(
          `20${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
        );
       const shoksandesh = new Shoksandesh({
         name,
         age,
         dob,
         dod,
         dateofceremony:formattedDate,
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