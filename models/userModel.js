import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        require: [true, "First Name is required to register"]
    },
    lastName:{
        type: String,
        require: [true, "Last Name is required to register"]
    },
    gender:{
        type: String,
        require: [true, "Gender is required to register"]
    },
    city:{
        type: String,
        require: [true, "city is required to register"]
    },
    emailAddress:{
        type: String,
        require: [true, "email address is required to register"],
        unique: true
    },
    phoneNumber:{
        type: Number,
        require: [true, "phone number is required to register"]
    },
    password:{
        type: String,
        require: [true, "password is required to register"]
    },
    confirmPassword:{
        type: String,
        require: [true, "confirm password is required to register"]
    }
},{timestamps: true})

const userModel = mongoose.model('userDetailsCollection', userSchema);

export default userModel;