import * as organisationLocaleService from "../services/organisationLocaleServices.js";

export const fetchOrganisationLocalesByZone = async (req, res) => {
    try {
        const organisationLocales = await organisationLocaleService.fetchAllByZone(req.params.zoneId);
        return res.status(200).json(organisationLocales);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organisation Locales not fetched !"});
    }
}

export const fetchAllId = async (req, res) => {
    try {
        const organisationLocales = await organisationLocaleService.fetchAllId();
        return res.status(200).json(organisationLocales);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organisation Locales not fetched !"});
    }
}

export const create = async (req, res) => {
    try {
        const {name, localisation, phone, email, mapImgUrl, logoImgUrl, zoneId} = req.body;
        await organisationLocaleService.create(name, localisation, phone, email, mapImgUrl, logoImgUrl, zoneId);
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
        await organisationLocaleService.update(name, localisation, phone, email, mapImgUrl, logoImgUrl, id);
        return res.status(200).json({message:"Organisation Locale updated!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organisation Locale not updated!"});
    }
}
export const fetchAllByiD = async (req, res) => {
    try {
        const id = req.params.id;
        const organisationLocales = await organisationLocaleService.fetchAllByiD(id);
        return res.status(200).json(organisationLocales);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organisation Locales not fetched !"});
    }
}
export const deleteOrganisationLocal = async (req, res) => {
    try {
        const id = req.params.id;
        await organisationLocaleService.deleteOrganisationLocal(id);
        return res.status(200).json({message:"Organisation Locale deleted!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organisation Locale not deleted!"});
    }
}