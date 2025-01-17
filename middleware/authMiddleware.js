const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    try {
        const token = req.header('x-auth-token');
        const verifiedUser = jwt.verify(
            token,
            config.get('jwtSecret')
        )
        req.user = verifiedUser.user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Token is invald."});
    }
}