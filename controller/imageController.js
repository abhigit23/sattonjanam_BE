// import {v2 as cloudinary} from 'cloudinary';
          
// cloudinary.config({ 
//   cloud_name: 'dylbhsgw6', 
//   api_key: '618781538971869', 
//   api_secret: 'mXUOXWKImVx3kjqwKZnk_EKvT1Y' 
// });

const cloudinary = require('cloudinary')
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const imageController = {
    upload: async (req,res) => {
        try {
        //    res.json({ data: req.files })
           if(!req.files || Object.keys(req.files).length === 0)
                return res.status(400).json({ msg: "No files were uploaded"})

                const file = req.files.profile;

            // validating file size
            if(file.size > 5 * 1024 * 1024) {
                    removeTemp(file.tempFilePath)
                    return res.status(400).json({ msg: "File size must be less than 5Mb."})
            }

            // validating file type (extension)
            if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg'){
                removeTemp(file.tempFilePath)
                return res.status(400).json({ msg: 'Invalid file type, try only .png, .jpg, .jpeg'})
            }

            //uploading logic

            cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'images' }, async (err,result) => {
                if(err)
                res.status(400).json({msg: err.message})
                
                removeTemp(file.tempFilePath)
                // read only public_id and url form respose
                res.status(200).json({ result })
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    destroy: async (req,res) => {
        try {
            const {  public_id } = req.body 

            if(!public_id)
                return res.status(400).json({msg:'No public_id found'})

                await cloudinary.v2.uploader.destroy(public_id, (err,result) => {
                    if(err)
                        return res.status(400).json({ msg: err.message })
                    res.status(200).json({ msg: "Image deleted successfully."})
                })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const removeTemp = (path) => {
    fs.unlinkSync(path)
}

module.exports = imageController
