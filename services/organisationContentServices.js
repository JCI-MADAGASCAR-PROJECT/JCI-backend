import prisma from "../DB/db.config.js"

export const fetchOrganisationLocalesContentByOrganisationLocal = async (organisationLocalId) => {
    return await prisma.organisationLocalContent.findMany({
        where: {
            organisationLocalId: Number(organisationLocalId)
        }
    });
};

export const create = async (content, organisationLocalId) =>{
    return await prisma.organisationLocalContent.create({
        data:{
            content,
            organisationLocalId:Number(organisationLocalId)
        }
    })
}

export const update = async (content, id) =>{
    return await prisma.organisationLocalContent.update({
        where:{id:Number(id)},
        data:{
            content,
        }
    })
}

export const deleteOrganisationLocalContent = async (id) =>{
    return await prisma.organisationLocalContent.delete({
        where:{id:Number(id)}
    })
}