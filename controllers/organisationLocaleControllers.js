import * as organisationLocaleService from "../services/organisationLocaleServices.js";
import cache from "../utils/cache.js";

export const fetchOrganisationLocalesByZone = async (req, res) => {
    try {
        const zoneId = req.params.zoneId;
        if (!zoneId) {
            return res.status(400).json({ message: "Zone ID est requis" });
        }
        const CACHE_KEY = `organisation_locales_${zoneId}`;
        const CACHE_TTL = 60 * 60 * 12; // 12 heures

        const cached = cache.get(CACHE_KEY);
        if (cached !== undefined) {
            return res.status(200).json(cached);
        }

        const organisationLocales = await organisationLocaleService.fetchAllByZone(zoneId);
        cache.set(CACHE_KEY, organisationLocales, CACHE_TTL);
        console.log(`Organisation locales for zone ${zoneId} fetched from database and cached.`);

        return res.status(200).json(organisationLocales);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organisation Locales not fetched !"});
    }
}

export const fetchAllId = async (req, res) => {
    try {
        const CACHE_KEY = "organisation_locales_all_ids";
        const CACHE_TTL = 60 * 60 * 12; // 12 heures

        const cached = cache.get(CACHE_KEY);
        if (cached !== undefined) {
            return res.status(200).json(cached);
        }

        const organisationLocales = await organisationLocaleService.fetchAllId();
        cache.set(CACHE_KEY, organisationLocales, CACHE_TTL);

        console.log("Organisation locales IDs fetched from database and cached.");

        return res.status(200).json(organisationLocales);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organisation Locales not fetched !"});
    }
}

export const create = async (req, res) => {
    try {
        const {name, localisation, phone, email, mapImgUrl, logoImgUrl, zoneId} = req.body;
        if(!name || !localisation || !phone || !email || !mapImgUrl || !logoImgUrl || !zoneId){
            return res.status(400).json({ message: "Veuillez remplir tous les champs" });
        }
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if(!isEmailValid){
            return res.status(400).json({ message: "Veuillez fournir un email valide" });
        }
        await organisationLocaleService.create(name, localisation, phone, email, mapImgUrl, logoImgUrl, zoneId);

        cache.del(`organisation_locales_all_ids`);
        cache.del(`organisation_locales_${zoneId}`);

        console.log("Organisation locales IDs cache cleared after creation.");
        console.log(`Organisation locales cache for Zone ID ${zoneId} cleared after creation.`);

        return res.status(201).json({message:"Organisation Locale created!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organisation Locale not created !"});
    }
}

export const update = async (req, res) => {
    try {
        const {name, localisation, phone, email, mapImgUrl, logoImgUrl} = req.body;
        const id = req.params.id;
        const zoneId = req.params.zoneId;
        await organisationLocaleService.update(name, localisation, phone, email, mapImgUrl, logoImgUrl, id);

        cache.del(`organisation_locales_all_ids`);
        cache.del(`organisation_locales_By_id_${id}`);
        cache.del(`organisation_locales_${zoneId}`);
        console.log("Organisation locales IDs cache cleared after update.");
        console.log(`Organisation locales cache for ID ${id} cleared after update.`);
        console.log(`Organisation locales cache for Zone ID ${zoneId} cleared after update.`);

        return res.status(200).json({message:"Organisation Locale updated!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organisation Locale not updated!"});
    }
}
export const fetchAllByiD = async (req, res) => {
    try {
        const id = req.params.id;
        const CACHE_KEY = `organisation_locales_By_id_${id}`;
        const CACHE_TTL = 60 * 60 * 12; // 12 heures
        const cached = cache.get(CACHE_KEY);
        if (cached !== undefined) {
            return res.status(200).json(cached);
        }
        const organisationLocales = await organisationLocaleService.fetchAllByiD(id);
        cache.set(CACHE_KEY, organisationLocales, CACHE_TTL);
        console.log(`Organisation locale ${id} fetched from database and cached.`);
        return res.status(200).json(organisationLocales);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organisation Locales not fetched !"});
    }
}
export const deleteOrganisationLocal = async (req, res) => {
    try {
        const id = req.params.id;
        const zoneId = req.params.zoneId;
        await organisationLocaleService.deleteOrganisationLocal(id);
        cache.del(`organisation_locales_all_ids`);
        console.log("Organisation locales IDs cache cleared after deletion.");
        cache.del(`organisation_locales_By_id_${id}`);
        console.log(`Organisation locales cache for ID ${id} cleared after deletion.`);
        cache.del(`organisation_locales_${zoneId}`);
        console.log(`Organisation locales cache for Zone ID ${zoneId} cleared after deletion.`);
        return res.status(200).json({message:"Organisation Locale deleted!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organisation Locale not deleted!"});
    }
}