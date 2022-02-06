const authentication = require('../middleware/jwt_authentication');

module.exports = (req, res, next) => {
    const token = req.headers["token"]
    authentication.jwt.verify(token,authentication.secret_key,(error,decoded) => {
        if(error) {
            return res.status(401).json({
                message: 'Authentication failed.'
            })
        } else {
            req.userData = decoded;
            next();
        }
    })
    
};