import userModel from "../models/userModel.js"
export const userInsert = (req, res)=>{
    try {
        const userData = req.body;
        const createUser = userModel.create(userData);

        if(createUser){
            return res.status(201).json({
                message: "user is created successfully.",
                data: userData
            })
        }

        return res.status(400).json({
            message: "user is not created.",
            data: userData
        })
    } catch (error) {
        return res.status(500).json({
            message: "server error data is not created",
            error: error.message
        })
    }
}