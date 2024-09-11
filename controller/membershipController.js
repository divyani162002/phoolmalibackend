const Membership = require("../model/membershipSchema")

exports.addmember = async (req, res) => {
    const {name ,email ,phonenumber , adhaarcard ,state,district,city,dob,membershiptype} =req.body
    
  try {
      
     const dateParts = dateofceremony.split(","); // ["22", "04", "24"]
     const formattedDate = new Date(
       `20${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
     );
        const member = new Membership({
          name,
          email,
          phonenumber,
          adhaarcard,
          state,
          district,
          city,
          dob: formattedDate,
          membershiptype,
        }); 

    await member.save()
    return res.status(200).json({
      message: "member is created",
      member,
    });


    } catch (error) {
        return res.status(400).json({
            message: "User not created",
            error: error.message,
        })
    }

    
}

exports.getmembers = async (req, res) => {
    
 try {
   const members = await Membership.find();
   res.json({ members });
 } catch (error) {
   res.status(400).json({
     message: "Failed to find members",
     error: error.message, // Include the error message for debugging
   });
 }
    
}

exports.deletemembers = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    if (!id) {
      return res.status(400).json({
        msg: "id not found",
      });
    }
    const member = await Membership.findByIdAndDelete(id);
    if (!member) {
      return res.status(400).json({
        msg: "member not found",
      });
    }
    return res
      .status(200)
      .json({ msg: "member deleted successfully", member });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }



};