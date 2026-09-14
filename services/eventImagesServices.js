import prisma from "../DB/db.config.js"

export const fetchAllByEventId = async (eventId) => {
    return await prisma.eventImage.findMany({
        where: {
            eventId: Number(eventId)
        }
    });
};


export const create = async (imgUrl, eventId) =>{
    return await prisma.eventImage.create({
        data:{
        
            imgUrl,
            eventId: Number(eventId)
        }
    })
}

// export const update = async (imgUrl, eventId, id) =>{
//     return await prisma.eventImage.update({
//         where:{id:Number(id)},
//         data:{
//             imgUrl,
//             eventId: Number(eventId),
//         }
//     })
// }

export const deleteEventImage = async (id) =>{
    return await prisma.eventImage.delete({
        where:{id:Number(id)}
    })
}