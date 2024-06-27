import jwt from 'jsonwebtoken'
import {config} from 'dotenv'

config()

const validateToken = (req,res,next)=>{
    const accessToken = req.headers['authorization'] || req.query.accessToken
    if(!accessToken) return res.status(401).json({message:"Access denied"})
    const token = accessToken.slice(7)
    jwt.verify(token, process.env.SECRET, (err, user)=>{
        if(err){
            res.status(401).json({message:"Access denied, token not valid"})
        }else{
            next();
        }
    })
}


const  generateAccessToken = (user)=>{
    return jwt.sign(user, process.env.SECRET, {expiresIn: '30m'})
}

const  decodeAccessToken = (user)=>{
    return jwt.decode(user)
}





export { validateToken , generateAccessToken, decodeAccessToken};
