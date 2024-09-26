const JWT = require('jsonwebtoken');

 const jwtAuth = (req,res,next) =>{
    // get cookie token(jwt token is generated using json.sign()) from the request
    const token = (req.cookies && req.cookies.token) || null;

    // return response if no token provided 
    if(!token){
        res.status(405).json({
            success:false,
            message:'token is required'
        })
    }
// verify the token
    try {
        const payload = JWT.verify(token,process.env.SECRET);
        req.user = { id:payload.id,email:payload.email}
    } catch (e) {
        res.status(405).json({
            success:false,
            message:'invalid token'
        });
    }
    next();
 }

module.exports = jwtAuth;