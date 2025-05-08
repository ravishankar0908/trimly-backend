import userModel from "../models/userModel.js"
import bcrypt from "bcrypt";
export const userInsert = async(req, res)=>{
    try {
        const {firstName, lastName, gender, city, emailAddress} = req.body;
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password,salt);
        const confirmPassword = await bcrypt.hash(req.body.confirmPassword,salt);
        const createUser = userModel.create({
            firstName,lastName,gender,city,emailAddress,password,confirmPassword
        });

        if(createUser){
            return res.status(201).json({
                message: "user is created successfully.",
                data: {
                    firstName,
                    lastName,
                    gender,
                    city,
                    emailAddress,
                    password,
                    confirmPassword
                }
            })
        }

        return res.status(400).json({
            message: "user is not created.",
        })
    } catch (error) {
        return res.status(500).json({
            message: "server error data is not created",
            error: error.message
        })
    }
}