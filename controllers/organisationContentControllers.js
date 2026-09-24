import * as organisationContentService from "../services/organisationContentServices.js";

export const fetchOrganisationLocalesContentByOrganisationLocal = async (req, res) => {
    try {
        const organisationLocalesContent = await organisationContentService.fetchOrganisationLocalesContentByOrganisationLocal(req.params.organisationLocalId);
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
        await organisationContentService.update(content, id);
        return res.status(200).json({message:"Organisation Local Content updated!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organisation Local Content not updated!"});
    }
}
export const deleteOrganisationLocalContent = async (req, res) => {
    try {
        const id = req.params.id;
        await organisationContentService.deleteOrganisationLocalContent(id);
        return res.status(200).json({message:"Organisation Local Content deleted!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organisation Local Content not deleted!"});
    }
}