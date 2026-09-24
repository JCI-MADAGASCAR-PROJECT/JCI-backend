import * as eventImagesService from "../services/eventImagesServices.js";

export const fetchAllByEventId = async (req, res) => {
    try {
        const eventImages = await eventImagesService.fetchAllByEventId(req.params.eventId);
        return res.status(200).json(eventImages);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Event images not fetched !"});
    }
}


export const create = async (req, res) => {
    try {
        const {imgUrl, eventId} = req.body;
        if(!imgUrl || !eventId){
            return res.status(400).json({ message: "Veuillez remplir tous les champs" });
        }
        await eventImagesService.create(imgUrl, eventId);
        return res.status(201).json({message:"Image d'événement ajoutée avec succès !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Image d'événement non ajoutée !" });
    }
}

// export const update = async (req, res) => {
//     try {
//         const {imgUrl, eventId} = req.body;
//         const id = req.params.id;
//         await eventImagesService.update(imgUrl, eventId, id);
//         return res.status(200).json({message:"Event image updated!"});
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Event image not updated!"});
//     }
// }
export const deleteEventImage = async (req, res) => {
    try {
        const id = req.params.id;
        await eventImagesService.deleteEventImage(id);
        return res.status(200).json({message:"Image d'événement supprimée avec succès !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Image d'événement non supprimée !" });
    }
}