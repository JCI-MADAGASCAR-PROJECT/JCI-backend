import prisma from "../DB/db.config.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const cookieOptions ={
    httpOnly: true,
    secure : process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000
}

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '30d'
    });
}

//Login Controller
export const login = async (req, res) =>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return  res.status(400).json({message:"Fill all fields"})
        }
        const response = await prisma.user.findUnique({
            where:{
                email,
            },
             select:{
                id:true,
                email:true,
                role:true,
                organisationLocalId:true,
                password:true
            }
        });

        if(!response){
            return res.status(404).json({message:"Identifiants invalides"})
        };

        const IsMatch = await bcrypt.compare(password, response.password);

        if(! IsMatch){
            return res.status(401).json({ message: "Identifiants invalides"})
        }
        await prisma.user.update({
            where: {
                id: Number(response.id),
            },
            data: {
                lastLogin: new Date(),
            },
        });
        const user = {
            id: response.id,
            email: response.email,
            role: response.role,
            organisationLocalId: response.organisationLocalId
        };
        const token = generateToken(response.id);
        res.cookie('token',token,cookieOptions);
        return res.status(200).json(user)

    } catch (error) {
         console.error("[login]", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
}

//Me
export const reAuth = async (req, res)=>{
    try {
        res.json(req.user) //user from the middleware
    } catch (error) {
        res.json({message:error.message})
    }
}

//LogOut
export const logOut = async (req, res) => {
    res.cookie('token', '',{... cookieOptions, maxAge:1});
    res.json({message: "Logged out successfully"})
}