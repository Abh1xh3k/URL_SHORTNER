import Url from "../model/Url.js";
import shorturlgenerator from "../services/shortner.js";


export const UrlShortner=async(req,res)=>{
    try{
       const {OriginalUrl}=req.body;
       if(!OriginalUrl){
        return res.status(400).json({error:"No url found"});
       }
       const shortCode= shorturlgenerator();
       const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
       const user_agent = req.headers['user-agent'];
       
       await Url.create({
       OriginalUrl,
       short_code:shortCode,
       ip_address,
       user_agent,
       })
       return res.status(200).json({shortUrl: `${process.env.API_BASE_URL}/${shortCode}` , });
    }
    catch(e){
      console.log(e);
      return res.status(500).json({error:"Server error"});
    }
}