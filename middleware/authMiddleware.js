import jwt from 'jsonwebtoken';
import prisma from '../DB/db.config.js';

export const protect = async (req, res, next) =>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Not authorizes, no token"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const responses = await prisma.user.findFirst({
            where:{
                id:decoded.id,
            },
            select:{
                email:true,
                role:true,
                organisationLocalId:true
            }
        })
        if(!responses){
            return res.status(401).json({message:"Not authorizes, unknown user"})
        }
        req.user = responses;
        next();
    } catch (error) {
        res.status(400).json({message:"Not authorized, token failed."})
    }
}