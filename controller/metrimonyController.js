const Matrimony = require("../model/matrimonySchema")

exports.addmatrimonyDetails =async (req,res) => {
    const { name, age, gender, occupation, email, bio } = req.body;
    try{
        const matrimony = new Matrimony({
          name,
          age,
          gender,
          occupation,
          email,
          bio,
        });

       await matrimony.save();
       return res.status(200).json({
         message: "matrimny  is created",
         matrimony,
       });
     } catch (error) {
       return res.status(400).json({
         message: "matrimny is not created",
         error: error.message,
       });
     }

}

exports.getmatrimonyDetails = async (req,res) => {
   
      try {
        const matrimonyDetails = await Matrimony.find();
        res.json({ matrimonyDetails });
      } catch (error) {
        res.status(400).json({
          message: "Failed to find details",
          error: error.message, // Include the error message for debugging
        });
      }
    
}

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