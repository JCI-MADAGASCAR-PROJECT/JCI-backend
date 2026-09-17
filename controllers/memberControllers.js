import * as memberService from "../services/memberServices.js";

export const fetchAllByOrganisationLocal = async (req, res) => {
    try {
        const members = await memberService.fetchAllByOrganisationLocal(req.params.organisationLocalId);
        return res.status(200).json(members);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Members not fetched !"});
    }
}


export const create = async (req, res) => {
    try {
        const {name, imgUrl, title, ticket, organisationLocalId} = req.body;
        await memberService.create(name, imgUrl, title, ticket, organisationLocalId);
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
        await memberService.update(name, imgUrl, title, ticket, id);
        return res.status(200).json({message:"Member updated!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Member not updated!"});
    }
}
export const deleteMember = async (req, res) => {
    try {
        const id = req.params.id;
        await memberService.deleteMember(id);
        return res.status(200).json({message:"Member deleted!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Member not deleted!"});
    }
}