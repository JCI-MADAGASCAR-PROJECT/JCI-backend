import * as eventService from "../services/eventServices.js"

export const fetchAllEvents = async (req, res) => {
    try {
        const events = await eventService.fetchAllEvents();
        return res.status(200).json({events});
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
        return res.status(200).json({events});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Events not fetched !"});
    }
}

export const create = async (req, res) => {
    try {
        const {title, type, imgUrl, content, date, organisationLocalId} = req.body;
        await eventService.create(title, type, imgUrl, content, date, organisationLocalId);
        return res.status(201).json({message:"Event created!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Event not created !"});
    }
}

export const update = async (req, res) => {
    try {
        const {title, type, imgUrl, content, date} = req.body;
        const id = req.params.id;
        await eventService.update(title, type, imgUrl, content, date, id);
        return res.status(200).json({message:"Event updated!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Event not updated!"});
    }
}
export const deleteEvent = async (req, res) => {
    try {
        const id = req.params.id;
        await eventService.deleteEvent(id);
        return res.status(200).json({message:"Event deleted!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Event not deleted!"});
    }
}