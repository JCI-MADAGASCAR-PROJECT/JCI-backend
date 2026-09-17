import * as bnService from "../services/bnServices.js";


export const fetchAll = async (req, res) => {
    try {
        const bureauxNationaux = await bnService.fetchAll();
        return res.status(200).json(bureauxNationaux);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Bureau National Members not fetched !"});
    }
}


export const create = async (req, res) => {
    try {
        const {name, firstName, title, imgUrl} = req.body;
        await bnService.create(name, firstName, title, imgUrl);
        return res.status(201).json({message:"Bureau National Member created!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Bureau National not created !"});
    }
}

export const update = async (req, res) => {
    try {
        const {name, firstName, title, imgUrl} = req.body;
        const id = req.params.id;
        await bnService.update(name, firstName, title, imgUrl, id);
        return res.status(201).json({message:"Bureau National Member updated!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Bureau National Member not updated!"});
    }
}
export const deleteBNMember = async (req, res) => {
    try {
        const id = req.params.id;
        await bnService.deleteBNMember(id);
        return res.status(201).json({message:"Bureau National Member deleted!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Bureau National Member not deleted!"});
    }
}