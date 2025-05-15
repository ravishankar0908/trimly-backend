import userModel from "../models/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { statusCodes, messages } from "../util/responseStatuscodes.js";

export const userInsert = async(req, res)=>{
    try {
        const {firstName, lastName, gender, city, emailAddress} = req.body;

        const checkEmailConflict = userModel.findOne({emailAddress})
        
        if(checkEmailConflict) return res.status(statusCodes.conflict).json({messages: messages.emailExist, emailAddress});

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password,salt);
        const confirmPassword = await bcrypt.hash(req.body.confirmPassword,salt);
        const createUser = userModel.create({
            firstName,lastName,gender,city,emailAddress,password,confirmPassword
        });

        if(createUser){
            return res.status(statusCodes.created).json({
                message: messages.registrationSuccess,
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

        return res.status(statusCodes.badreq).json({
            message: messages.registrationFailed,
        })
    } catch (error) {
        return res.status(statusCodes.serverError).json({
            message: messages.serverErrorMessage,
            error: error.message
        })
    }
}

export const userLogin = async(req, res)=>{
    try {
        const {emailAddress, password} = req.body;
        const userCheck = await userModel.findOne({emailAddress});
        const payload = {id: userCheck._id, email: userCheck.emailAddress}
        
        if(userCheck === null){
            return res.status(statusCodes.notFound).json({
                message: messages.emailNotFound
            })
        }
        const encryptedPassword = userCheck.password;
        const passwordMatch= await bcrypt.compare(password,encryptedPassword);
        if(!passwordMatch){
            return res.status(statusCodes.badreq).json({
                message: messages.passwordIncorrect
            })
        }

        const jwtToken = jwt.sign(payload,process.env.jwt_secret_key);

        return res.status(statusCodes.success).json({
            message: messages.loginSuccess,
            jwtoken: jwtToken
        })

    } catch (error) {
        return res.status(statusCodes.serverError).json({
            message: messages.serverErrorMessage,
            error: error.message
        })
    }
}

export const allUserList = async (req, res)=>{
    try {
        
        const users = await userModel.find({});

        if(users.length===0){
            return res.status(statusCodes.notFound).json({
                message: messages.noUsers
            })
        }

        return res.status(statusCodes.success).json({
            message: messages.allUsers,
            users
        })
        
    } catch (error) {
        return res.status(statusCodes.serverError).json({
            message: messages.serverErrorMessage,
            error: error.message
        })
    }
}

export const userById = async(req, res)=>{
    try {
        const { userId } = req.query;
        const user = await userModel.findById(new mongoose.Types.ObjectId(userId));

        if(!user){
            return res.status(statusCodes.notFound).json({
                message: messages.invalidUserId
            })
        }

        return res.status(statusCodes.found).json({
            message: messages.validUserId,
            user
        })
    } catch (error) {
        return res.status(statusCodes.serverError).json({
            message: messages.serverErrorMessage,
            error: error.message
        })
    }
}