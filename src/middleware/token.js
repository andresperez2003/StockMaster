import jwt from 'jsonwebtoken'
import {config} from 'dotenv'

config()


const  generateAccessToken = (user)=>{
    return jwt.sign(user, process.env.SECRET, {expiresIn: '40m'})
}

const  decodeAccessToken = (token)=>{
    const formattedToken = token && token.startsWith('Bearer ') ? token.slice(7) : token;
    return jwt.decode(formattedToken)
}


export { generateAccessToken, decodeAccessToken};
