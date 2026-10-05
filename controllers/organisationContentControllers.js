import * as organisationContentService from "../services/organisationContentServices.js";
import cache from "../utils/cache.js";

export const fetchOrganisationLocalesContentByOrganisationLocal = async (req, res) => {
    try {
        const olId = req.params.organisationLocalId;
        if (!olId) {
            return res.status(400).json({ message: "Organisation Local ID est requis" });
        }
        const CACHE_KEY = `organisation_locales_content_${olId}`;
        const CACHE_TTL = 60 * 60 * 12; // 12 heures

        const cached = cache.get(CACHE_KEY);
        if (cached !== undefined) {
            return res.status(200).json(cached);
        }

        const organisationLocalesContent = await organisationContentService.fetchOrganisationLocalesContentByOrganisationLocal(olId);
        cache.set(CACHE_KEY, organisationLocalesContent, CACHE_TTL);
        console.log(`Organisation Locales Content for Organisation Local ID ${olId} fetched from database and cached.`);

        return res.status(200).json(organisationLocalesContent);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organisation Locales Content not fetched !"});
    }
}


export const create = async (req, res) => {
    try {
        const {content, organisationLocalId} = req.body;
        if(!content || !organisationLocalId){
            return res.status(400).json({ message: "Veuillez remplir tous les champs" });
        }
        await organisationContentService.create(content, organisationLocalId);
        cache.del(`organisation_locales_content_${organisationLocalId}`);
        console.log(`Organisation Locales Content cache for Organisation Local ID ${organisationLocalId} cleared after creation.`);
        return res.status(201).json({message:"Organisation Local Content created!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organisation Local Content not created !"});
    }
}

export const update = async (req, res) => {
    try {
        const {content} = req.body;
        const id = req.params.id;
        const organisationLocalId = req.params.organisationLocalId;
        if(!content){
            return res.status(400).json({ message: "Veuillez remplir le champ content" });
        }
        await organisationContentService.update(content, id);
        cache.del(`organisation_locales_content_${organisationLocalId}`);
        console.log(`Organisation Locales Content cache for Organisation Local ID ${organisationLocalId} cleared after update.`);
        return res.status(200).json({message:"Organisation Local Content updated!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organisation Local Content not updated!"});
    }
}
export const deleteOrganisationLocalContent = async (req, res) => {
    try {
        const id = req.params.id;
        const organisationLocalId = req.params.organisationLocalId;
        cache.del(`organisation_locales_content_${organisationLocalId}`);
        console.log(`Organisation Locales Content cache for Organisation Local ID ${organisationLocalId} cleared after deletion.`);
        await organisationContentService.deleteOrganisationLocalContent(id);
        return res.status(200).json({message:"Organisation Local Content deleted!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organisation Local Content not deleted!"});
    }
}