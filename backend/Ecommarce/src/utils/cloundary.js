const cloudinary = require("cloudinary").v2

cloudinary.config({ 
    cloud_name: "dr3x1ttia", 
    api_key: "788728114674153", 
    api_secret: "cqcPqPiE6-aQ_70N4wxalRlWjHM" 
});

const uploadfiles = async (localpath, folderName) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(localpath, {
            folder: folderName
        }).catch((error)=>{console.log(error)});

        return uploadResult

    } catch (error) {
        console.log(error);
    }
   
}

module.exports = {
    uploadfiles,
}
