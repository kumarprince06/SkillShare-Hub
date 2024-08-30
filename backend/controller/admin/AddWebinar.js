const WebinarModel = require("../../model/webinarModel");
const Permission = require("../../helper/WebinarPermission");
const AddWebinarController = async(req, res)=>{
  try {
    const userId = req?.userId;
    const { title, description, speaker, speakerBio, date, time, platform, link, image } = req.body;

    

    // Check admin permissions
    if (!(await Permission(userId))) {
      throw new Error("Permission denied..!");
    }

    if(!title){
      throw new Error("Webinar title is required..!")
    }else if(! description){
      throw new Error("Webinar description is required..!")
    }else if(!speaker){
      throw new Error("Speaker name is required..!")
    }else if(!speakerBio){
      throw new Error("Speaker designation is required..!")
    }else if(!date){
      throw new Error("Date is required..!")
    }else if(!time){
      throw new Error("Time is required..!")
    }else if(!platform){
      throw new Error("Platform is required..!")
    }else if(!link){
      throw new Error("Webinar link is required..!")
    }else if(!image){
      throw new Error("Image is required..!")
    }

    const newWebinar = new WebinarModel({
      userId,
      title,
      description,
      speaker,
      speakerBio,
      date,
      time,
      platform,
      link,
      image
    });

    const savedWebinar = await newWebinar.save();

    res.status(200).json({
      message: "Webinar added successfully",
      data: savedWebinar,
      success: true,
      error: false,
    });
    
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

module.exports = AddWebinarController