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
        where: { id: Number(id) },  
        select: {
            id: true,
            email: true,
            role: true,
            organisationLocalId: true,
        }
    });
};


export const create = async (email, password, role, ol_id) =>{
    if(!email || !password){
    throw new Error("Veuillez remplir tous les champs");
    }
    if(role == "ADMIN_LOCAL" && !ol_id){
        throw new Error("L'identifiant de l'organisation locale est requis pour le rôle ADMIN_LOCAL");  
    }
    const existingUser = await prisma.user.findUnique({
        where: { email }
    }); 
    if (existingUser) {
        throw new Error("Email deja utilisé. Veuillez choisir un autre email");
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
    throw new Error("Veuillez remplir tous les champs");
    }

    const user = await prisma.user.findUnique({
    where: {
        id: Number(id),
    },
    });

    if (!user) {
    throw new Error("Utilisateur non trouvé");
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
    throw new Error("Email deja utilisé. Veuillez choisir un autre email");
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
    throw new Error("Veuillez remplir tous les champs");
    }

    const user = await prisma.user.findUnique({
    where: {
        id: Number(id),
    },
    });

    if (!user) {
    throw new Error("Utilisateur non trouvé");
    }

    return await prisma.user.update({
    where: {
        id: Number(id),
    },
    data: {
        password: await bcrypt.hash(password, 10),
    },
    });
};

// export const updateAdmin = async (email,password, id) =>{
//     if(!email || !password){
//         throw new Error("Veuillez remplir tous les champs");
//     }
//     const response = await prisma.user.findUnique({
//         where:{
//             email,
//         }
//     });
//     if (response) {
//         throw new Error("Email deja utilisé. Veuillez choisir un autre email");
//     }
//     const user = await prisma.user.findFirst({
//         where:{
//             id: Number(id),
//         }
//     });
//     if(!user){
//         throw new Error("Identifiants invalides");
//     };

//     if(!isAdmin || isAdmin.role !== "SUPER_ADMIN"){
//         throw new Error("Utilisateur non autorisé");
//     }

//     return await prisma.user.update({
//         where:{id:Number(id)},
//         data:{
//             email,
//             password: await bcrypt.hash(password, 10),
//         }
//     })
// }

export const deleteUser = async (id) =>{
    return await prisma.user.delete({
        where:{id:Number(id)}
    })
}