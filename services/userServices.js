import prisma from "../DB/db.config.js"

export const fetchAll = async () => {
    return await prisma.user.findMany({
        orderBy: {
            id: "desc"
        }
    });
};

export const fetchUser = async (id) => {
    return await prisma.user.findUnique({
        where: { id: Number(id) }
    });
};

export const create = async (email, password, role, ol_id) =>{
    return await prisma.user.create({
        data:{
            email,
            password,
            role,
            organisationLocalId : ol_id,
        }
    })
}

export const update = async (email, password, role, id) =>{
    return await prisma.user.update({
        where:{id:Number(id)},
        data:{
            email,
            password,
            role,
        }
    })
}

export const deleteUser = async (id) =>{
    return await prisma.user.delete({
        where:{id:Number(id)}
    })
}