import userModel from "../models/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const userLogin = async(req, res)=>{
    try {
        const {emailAddress, password} = req.body;
        const userCheck = await userModel.findOne({emailAddress});
        console.log(userCheck);
        
        if(userCheck === null){
            return res.status(404).json({
                message: "The given Email is not found."
            })
        }
        const encryptedPassword = userCheck.password;
        const passwordMatch= await bcrypt.compare(password,encryptedPassword);
        if(!passwordMatch){
            return res.status(401).json({
                message: "The given password is incorrect!"
            })
        }

        const jwtToken = jwt.sign({id: userCheck._id, email: userCheck.emailAddress},process.env.jwt_secret_key);

        return res.status(200).json({
            message: "Logged Successfully.",
            jwtoken: jwtToken
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}