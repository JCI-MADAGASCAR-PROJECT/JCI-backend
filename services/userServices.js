import prisma from "../DB/db.config.js"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const fetchAll = async () => {
    return await prisma.user.findMany({
        orderBy: {
            id: "desc"
        },
        select: {
            id: true,
            email: true,
            role: true,
            organisationLocalId: true,
            organisationLocal: true,
            lastLogin: true,
        }
    });
};

export const fetchUser = async (id) => {
    return await prisma.user.findUnique({
        where: { id: Number(id) }
    });
};

export const create = async (email, password, role, ol_id) =>{

    if(!email || !password){
        return  res.status(400).json({message:"Fill all fields"})
    }
    if(role == "ADMIN_LOCAL" && !ol_id){
        return  res.status(400).json({message:"Organisation Local ID is required for ADMIN_LOCAL role"})
    }
    const response = await prisma.user.findUnique({
        where:{
            email,
        }
    })
    if(response){
        return  res.status(400).json({message:"Email already used!. Please choose another email"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if(role == "ADMIN_LOCAL" ){
        return await prisma.user.create({
            data:{
                email,
                password: hashedPassword,
                role,
                organisationLocalId : Number(ol_id),
            }
        })
    }
    else{
        return await prisma.user.create({
            data:{
                email,
                password: hashedPassword,
                role,
            }
        })
    }
}

export const update = async (email, id) => {
    if (!email) {
    throw new Error("FILL_ALL_FIELDS");
    }

    const user = await prisma.user.findUnique({
    where: {
        id: Number(id),
    },
    });

    if (!user) {
    throw new Error("USER_NOT_FOUND");
    }

    const emailUsed = await prisma.user.findFirst({
    where: {
        email,
        NOT: {
        id: Number(id),
        },
    },
    });

    if (emailUsed) {
    throw new Error("EMAIL_ALREADY_USED");
    }

    return await prisma.user.update({
    where: {
        id: Number(id),
    },
    data: {
        email,
    },
    });
};

export const updatePassword = async (password, id) => {
    if (!password) {
    throw new Error("FILL_ALL_FIELDS");
    }

    const user = await prisma.user.findUnique({
    where: {
        id: Number(id),
    },
    });

    if (!user) {
    throw new Error("USER_NOT_FOUND");
    }

    // No need to check for email uniqueness when updating password

    return await prisma.user.update({
    where: {
        id: Number(id),
    },
    data: {
        password: await bcrypt.hash(password, 10),
    },
    });
};

export const updateAdmin = async (email,old_password, new_password, id) =>{
    if(!email || !old_password || !new_password){
        return  res.status(400).json({message:"Fill all fields"})
    }
    const response = await prisma.user.findUnique({
        where:{
            email,
        }
    });
    if (response) {
        return res.status(400).json({message:"Email already used!. Please choose another email"})
    }
    const user = await prisma.user.findFirst({
        where:{
            id: Number(id),
        }
    });
    if(!user){
        return res.status(404).json({message:"Invalid credentials"})
    };

    const IsMatch = await bcrypt.compare(old_password, user.password);

    if(!IsMatch){
        return res.status(401).json({message:"Password not correct"})
    }
    return await prisma.user.update({
        where:{id:Number(id)},
        data:{
            email,
            password: await bcrypt.hash(new_password, 10),
        }
    })
}

export const deleteUser = async (id) =>{
    return await prisma.user.delete({
        where:{id:Number(id)}
    })
}