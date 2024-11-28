import mongoose from "mongoose";

export const dbConnection =async()=>{

    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log("Data Base Online")
        
    } catch (error) {
        console.log(error);
        throw new Error("Data Base Error");
    }

}