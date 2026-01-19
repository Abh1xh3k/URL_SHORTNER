import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const url= process.env.DB_URL;
// console.log(url);
 const connectDb=async()=>{
    try{
       await mongoose.connect(url);
       console.log("Mongo Db Connected");
       return true;
    }
    catch(e){
       console.log("error conencting mongo db" ,e);
    //    process.exit(1);
    }
}
export default connectDb;