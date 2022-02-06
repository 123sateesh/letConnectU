const config = require('config');
const jwt = require('jsonwebtoken');
const tokenValidator = (req, res, next) =>{

    try {

        const token = req.header('auth-token');
        if(!token) return res.status(401).json({msg:" No token is found."});
        const decodedPayload =  jwt.verify(token,config.get('secureKey'));
        req.user = decodedPayload.user;
        next();
    
} catch (error) {
    res.status(401).json({msg:"Token is not found."})
}

}


module.exports = tokenValidator;