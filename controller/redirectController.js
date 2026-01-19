import Url from "../model/Url.js";
import redis from '../services/redis.js'

export const redirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;
        console.log("Searching for:", shortCode);
        
        if (!shortCode) {
            return res.status(400).json({ message: "No url found" });
        }
        
        const cachedUrl = await redis.get(shortCode);
        console.log("Redis result:", cachedUrl);
        
        if (cachedUrl) {
            console.log("fetched from redis");
            await Url.updateOne({ short_code: shortCode }, { $inc: { clicks: 1 } });
            return res.redirect(cachedUrl);
        }
        
        console.log("Not in redis, checking MongoDB...");
        const UrlDoc = await Url.findOne({ short_code: shortCode });
        console.log("MongoDB result:", UrlDoc);
        
        if (!UrlDoc) {
            return res.status(404).json({ message: "No url found" })
        }
        
        await Url.updateOne({ short_code: shortCode }, { $inc: { clicks: 1 } });
        await redis.set(shortCode, UrlDoc.OriginalUrl, { EX: 60 * 60 * 24 })
        console.log(`Stored in Redis: ${shortCode} -> ${UrlDoc.OriginalUrl}`);

        // Verify it was stored
        const verify = await redis.get(shortCode);
        console.log(`Verification read: ${verify}`);
        
        res.redirect(UrlDoc.OriginalUrl);
    }
    catch (e) {
        console.log("Error:", e);
        res.status(500).json({ message: "server error" })
    }
}