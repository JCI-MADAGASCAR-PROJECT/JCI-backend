import * as eventService from "../services/eventServices.js"

// export const fetchAllEvents = async (req, res) => {
//     try {
//         const events = await eventService.fetchAllEvents();
//         return res.status(200).json(events);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Events not fetched !"});
//     }
// }
export const fetchAllEvents = async (req, res) => {
    try {
        const page  = Math.max(1, parseInt(req.query.page)  || 1);
        const limit = Math.min(100, parseInt(req.query.limit) || 20);
        const result = await eventService.fetchAllEventsPaginated(page, limit);
        return res.status(200).json(result);
    } catch (error) {
        console.error("[fetchAllEvents]", error);
        return res.status(500).json({ message: "Events not fetched !" });
    }
}
export const fetchAllActuEvents = async (req, res) => {
    try {
        const events = await eventService.fetchAllActuEvents();
        return res.status(200).json(events);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Events not fetched !"});
    }
}


export const fetchAllEventsByOrganisationLocal = async (req, res) => {
    try {
        const events = await eventService.fetchAllEventsByOrganisationLocal(req.params.organisationLocalId);
        return res.status(200).json(events);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Events not fetched !"});
    }
}


export const fetchAllEventsByNational = async (req, res) => {
    try {
        const events = await eventService.fetchAllEventsByNational();
        return res.status(200).json(events);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Events not fetched !"});
    }
}

export const create = async (req, res) => {
    try {
        const {title, type, imgUrl, content, date, organisationLocalId} = req.body;
        if(!title || !type || !imgUrl || !content || !date || !organisationLocalId){
            return res.status(400).json({ message: "Veuillez remplir tous les champs" });
        }
        await eventService.create(title, type, imgUrl, content, date, organisationLocalId);
        return res.status(201).json({message:"Evenement créé avec succès !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Evenement non créé !" });
    }
}
export const createNational = async (req, res) => {
    try {
        const {title, type, imgUrl, content, date} = req.body;
        if(!title || !type || !imgUrl || !content || !date){
            return res.status(400).json({ message: "Veuillez remplir tous les champs" });
        }
        await eventService.createNational(title, type, imgUrl, content, date);
        return res.status(201).json({message:"Evenement créé avec succès !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Evenement non créé !" });
    }
}

export const update = async (req, res) => {
    try {
        const {title, type, imgUrl, content, date} = req.body;
        const id = req.params.id;
        await eventService.update(title, type, imgUrl, content, date, id);
        return res.status(200).json({message:"Evenement mis à jour avec succès !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Evenement non mis à jour !" });
    }
}
export const fetchEventById = async (req, res) => {
    try {
        const event = await eventService.fetchEventById(req.params.eventId);
        return res.status(200).json(event);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Evenement non récupéré !" });
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const id = req.params.id;
        await eventService.deleteEvent(id);
        return res.status(200).json({message:"Evenement supprimé avec succès !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Evenement non supprimé !" });
    }
}