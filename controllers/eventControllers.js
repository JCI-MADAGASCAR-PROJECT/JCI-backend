import * as eventService from "../services/eventServices.js"
import cache from "../utils/cache.js";

export const fetchAllEvents = async (req, res) => {
    try {
        const CACHE_KEY = `events_page_all`;
        const CACHE_TTL = 60 * 60 * 0.5; // 30 minutes
        const cached = cache.get(CACHE_KEY);
        const page  = Math.max(1, parseInt(req.query.page)  || 1);
        const limit = Math.min(100, parseInt(req.query.limit) || 20);
        if (cached !== undefined) {
            return res.status(200).json(cached);
        }
        const result = await eventService.fetchAllEventsPaginated(page, limit);
        cache.set(CACHE_KEY, result, CACHE_TTL);
        console.log(`Events for page ${page} and limit ${limit} fetched from database and cached.`);
        return res.status(200).json(result);
    } catch (error) {
        console.error("[fetchAllEvents]", error);
        return res.status(500).json({ message: "Events not fetched !" });
    }
}
export const fetchAllActuEvents = async (req, res) => {
    try {
        const CACHE_KEY = "latest_4_events";
        const CACHE_TTL = 60 * 60 * 6; // 3 heures
        const cached = cache.get(CACHE_KEY);
        if (cached !== undefined) {
            return res.status(200).json(cached);
        }
        const events = await eventService.fetchAllActuEvents();
        cache.set(CACHE_KEY, events, CACHE_TTL);
        console.log("Events Actu fetched from database and cached.");
        return res.status(200).json(events);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Events not fetched !"});
    }
}


export const fetchAllEventsByOrganisationLocal = async (req, res) => {
    try {
        const olId = req.params.organisationLocalId;
        if (!olId) {
            return res.status(400).json({ message: "Organisation Local ID est requis" });
        }
        const CACHE_KEY = `events_${olId}`;
        const CACHE_TTL = 60 * 60 * 6; // 3 heures
        const cached = cache.get(CACHE_KEY);
        if (cached !== undefined) {
            return res.status(200).json(cached);
        }
        const events = await eventService.fetchAllEventsByOrganisationLocal(req.params.organisationLocalId);
        cache.set(CACHE_KEY, events, CACHE_TTL);
        console.log(`Events for Organisation Local ID ${olId} fetched from database and cached.`);
        return res.status(200).json(events);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Events not fetched !"});
    }
}


export const fetchAllEventsByNational = async (req, res) => {
    try {
        const CACHE_KEY = "events_national";
        const CACHE_TTL = 60 * 60 * 6; // 3 heures
        const cached = cache.get(CACHE_KEY);
        if (cached !== undefined) {
            return res.status(200).json(cached);
        }
        const events = await eventService.fetchAllEventsByNational();
        cache.set(CACHE_KEY, events, CACHE_TTL);
        console.log("Events National fetched from database and cached.");
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

        cache.del(`events_${organisationLocalId}`);
        console.log(`Events cache for Organisation Local ID ${organisationLocalId} cleared after creation.`);
        cache.del("latest_4_events");
        console.log("Events cache for latest 4 events cleared after creation.");
        cache.del("events_page_all");
        console.log("Events cache for all events page cleared after creation.");
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
        cache.del("events_national");
        console.log("Events cache for National cleared after creation.");
        cache.del("latest_4_events");
        console.log("Events cache for latest 4 events cleared after creation.");
        cache.del("events_page_all");
        console.log("Events cache for all events page cleared after creation.");
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
        const organisationLocalId = req.params.organisationLocalId;
        await eventService.update(title, type, imgUrl, content, date, id);

        cache.del("latest_4_events");
        console.log("Events cache for latest 4 events cleared after update.");
        cache.del("events_page_all");
        console.log("Events cache for all events page cleared after update.");
        if (organisationLocalId != "null") {
            cache.del(`events_${organisationLocalId}`);
            console.log(`Events cache for Organisation Local ID ${organisationLocalId} cleared after update.`);
        }
        else {
            cache.del("events_national");
            console.log("Events cache for National cleared after update.");
        }
        return res.status(200).json({message:"Evenement mis à jour avec succès !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Evenement non mis à jour !" });
    }
}
export const fetchEventById = async (req, res) => {
    try {
        const eventId= req.params.eventId;
        if (!eventId) {
            return res.status(400).json({ message: "Event ID est requis" });
        }
        const CACHE_KEY = `event_${eventId}`;       
        const CACHE_TTL = 60 * 60 * 2; // 2 heures
        const cached = cache.get(CACHE_KEY);
        if (cached !== undefined) {
            return res.status(200).json(cached);
        }
        const event = await eventService.fetchEventById(req.params.eventId);
        cache.set(CACHE_KEY, event, CACHE_TTL);
        console.log(`Event with ID ${eventId} fetched from database and cached.`);

        return res.status(200).json(event);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Evenement non récupéré !" });
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const organisationLocalId = req.params.organisationLocalId;
        await eventService.deleteEvent(id);
        cache.del("events_page_all");
        console.log("Events cache for all events page cleared after deletion.");
        cache.del("latest_4_events");
        console.log("Events cache for latest 4 events cleared after deletion.");
        if (organisationLocalId != "null") {
            cache.del(`events_${organisationLocalId}`);
            console.log(`Events cache for Organisation Local ID ${organisationLocalId} cleared after deletion.`);
        }
        else {
            cache.del("events_national");
            console.log("Events cache for National cleared after deletion.");
        }
        return res.status(200).json({message:"Evenement supprimé avec succès !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Evenement non supprimé !" });
    }
}