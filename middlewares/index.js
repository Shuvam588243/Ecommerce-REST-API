const jwt = require('jsonwebtoken');

exports.Auth = (req,res,next) => {
    if(req.headers.authorization)
   {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET);
    if(token)
    {
        req.user = user;
    }
    else
    {
        res.status(400).json({ error : 'Invalid Token' })
    }
   }
   else
   {
   return res.status(400).json({ message : 'Authorization Required' })
   }
   next();
}

exports.adminMiddleware = (req,res,next) => {
    if(req.user.role != 'Admin')
    {
        res.status(400).json({ error : 'Admin Access Denied' })
    }
    next();
}

exports.userMiddleware = (req,res,next) => {
    if(req.user.role != 'Admin')
    {
        res.status(400).json({ error : 'User Access Denied' })
    }
    next();  
}