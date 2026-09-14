import prisma from "../DB/db.config.js"

export const fetchAllByOrganisationLocal = async (organisationLocalId) => {
    return await prisma.member.findMany({
        where: {
            organisationLocalId: Number(organisationLocalId)
        }
    });
};

export const create = async (name, imgUrl, title, ticket, organisationLocalId) =>{
    return await prisma.member.create({
        data:{
            name,
            imgUrl,
            title,
            ticket,
            organisationLocalId: Number(organisationLocalId)
        }
    })
}

export const update = async (name, imgUrl, title, ticket, organisationLocalId, id) =>{
    return await prisma.member.update({
        where:{id:Number(id)},
        data:{
            name,
            imgUrl,
            title,
            ticket,
            organisationLocalId: Number(organisationLocalId),
        }
    })
}

export const deleteMember = async (id) =>{
    return await prisma.member.delete({
        where:{id:Number(id)}
    })
}