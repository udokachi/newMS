
import APP_SECRET from "../config/config.js"
import jwt from 'jsonwebtoken'
import UserAttribute from '../model/userModel.js';

export const auth = async (req, res, next) => {
try {
const authorization = req.headers.authorization;
if (!authorization) {
    return res.status(401).json({
        Error: "Kindly Register"
    });
}

const token = authorization.slice(7, authorization.length);
let verified = jwt.verify(token, APP_SECRET);

if (!verified) {
    
    return res.status(401).json({
        Error: "unauthorised"
    });
}

const { id } = verified;

// find the user by id
const user = await UserAttribute.findOne({ _id: id })

if (!user) {
    return res.status(401).json({

        Error: "Invalid Credentials"
    });
}

req.user = verified;
next();
} catch (error) {
    // console.log(">>>>>>>>>>>>>>>>>", error.description, error.stack, error.search)
return res.status(401).json({
    Error: "unauthorised"
});
}
};




export const isAuthenticated = (req, res) => {  const { token } = req.query
  if (!token) {
    res.status(403)
    res.send("Can't verify user.")
    return
  }
  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
  }
  catch {
    res.status(403)
    res.send("Invalid auth credentials.")
    return
  }
  if (!decoded.hasOwnProperty("email") || !decoded.hasOwnProperty("expirationDate")) {
    res.status(403)
    res.send("Invalid auth credentials.")
    return
  }
  const { expirationDate } = decoded
  if (expirationDate < new Date()) {
    res.status(403)
    res.send("Token has expired.")
    return
  }
  res.status(200)
  res.send("User has been validated.")
}

//  const auth = async(req:JwtPayload , res:Response, next:NextFunction)=>{
//     try{
//         const authorization = req.headers.authorization
    
//         if(!authorization){
//             return res.status(401).json({
//                 Error:"Kindly login"
//             })
//         }
//        // Bearer erryyyygccffxfx
//        const token = authorization.slice(7, authorization.length);
//         let verified = jwt.verify(token,APP_SECRET) 
    
//         if(!verified){
//             return res.status(401).json({
//                 Error:"unauthorised"
//             })
//         }
       
      
//         const {_id} = verified as {[key:string]:string}
    
//          // find the user by id
//          const user = (await UserAttribute.findOne({
//             where: { _id: id},
//           })) as unknown as UserAttributes;
    
//          if(!user){
//             return res.status(401).json({
//                 Error:"Invalid Credentials"
//             })
//          } 
    
//        req.user = verified;
//        next()
//     }catch(err){
//         return res.status(401).json({
//             Error:"unauthorised"
//         })
//     }
//     }