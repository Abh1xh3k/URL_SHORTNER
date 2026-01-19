import mongoose, { Schema } from 'mongoose';

const urlSchema = new Schema({
    OriginalUrl:{
        type:String,
        required:true,
    },
    // RedirectCode:{
    //     type:String,
    //     required:true,
    //     index:true,
    // },
    short_code:{
        type:String,
    },
    clicks:{
       type:Number,
       default:0,
    },
    ip_address:{
        type:String,
    },
    country:{
        type:String,
    },
    city:{
        type:String,
    },
    user_agent:{
        type:String,
    },
    expiresAt:{
        type:Date,
    }
},{timestamps:true});
export default mongoose.model("Url",urlSchema);
