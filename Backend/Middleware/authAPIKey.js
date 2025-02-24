const dotenv = require("dotenv");
dotenv.config();

const authenticateAPI = (req, res, next) => {
    const apiKey = req.header("Authorization");

    if( !apiKey || apiKey !== `Bearer ${process.env.API_KEY}`){
        return res.status(401).json({ error : "Unauthorized : Invalid API Key" });
    }

    next();
}

module.exports = authenticateAPI;