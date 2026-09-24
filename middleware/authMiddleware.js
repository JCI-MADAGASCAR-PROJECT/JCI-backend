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
                id:true,
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


export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès interdit" });
    }

    next();
  };
};

export const requireOrganisationAccess = (getOrganisationId) => {
  return async (req, res, next) => {
    if (req.user.role === "SUPER_ADMIN" || req.user.role === "ADMIN_NATIONAL") {
      return next();
    }

    if (req.user.role !== "ADMIN_LOCAL") {
      return res.status(403).json({ message: "Accès interdit" });
    }

    const targetOrganisationId = await getOrganisationId(req);

    if (targetOrganisationId !== req.user.organisationLocalId) {
      return res.status(403).json({ message: "Cette ressource appartient à une autre organisation" });
    }

    next();
  };
};