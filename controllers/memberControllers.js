import * as memberService from "../services/memberServices.js";
import cache from "../utils/cache.js";

export const fetchAllByOrganisationLocal = async (req, res) => {
    try {
        const olId = req.params.organisationLocalId;
        if (!olId) {
            return res.status(400).json({ message: "Organisation Local ID est requis" });
        }
        const CACHE_KEY = `members_${olId}`;
        const CACHE_TTL = 60 * 60 * 12; // 12 heures
        const cached = cache.get(CACHE_KEY);
        if (cached !== undefined) {
            return res.status(200).json(cached);
        }

        const members = await memberService.fetchAllByOrganisationLocal(olId);

        cache.set(CACHE_KEY, members, CACHE_TTL);
        console.log(`Members for Organisation Local ID ${olId} fetched from database and cached.`);
        return res.status(200).json(members);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Members not fetched !"});
    }
}


export const create = async (req, res) => {
    try {
        const {name, imgUrl, title, ticket, organisationLocalId} = req.body;
        if(!name || !imgUrl || !title || !ticket || !organisationLocalId){
            return res.status(400).json({ message: "Veuillez remplir tous les champs" });
        }
        await memberService.create(name, imgUrl, title, ticket, organisationLocalId);

        cache.del(`members_${organisationLocalId}`);
        console.log(`Members cache for Organisation Local ID ${organisationLocalId} cleared after creation.`);

        return res.status(201).json({message:"Member created!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Member not created !"});
    }
}

export const update = async (req, res) => {
    try {
        const {name, imgUrl, title, ticket} = req.body;
        const id = req.params.id;
        const organisationLocalId = req.params.organisationLocalId;

        await memberService.update(name, imgUrl, title, ticket, id);

        cache.del(`members_${organisationLocalId}`);
        console.log(`Members cache for Organisation Local ID ${organisationLocalId} cleared after update.`);

        return res.status(200).json({message:"Member updated!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Member not updated!"});
    }
}
export const deleteMember = async (req, res) => {
    try {
        const id = req.params.id;
        const organisationLocalId = req.params.organisationLocalId;
        await memberService.deleteMember(id);
        cache.del(`members_${organisationLocalId}`);
        console.log(`Members cache for Organisation Local ID ${organisationLocalId} cleared after deletion.`);
        return res.status(200).json({message:"Member deleted!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Member not deleted!"});
    }
}