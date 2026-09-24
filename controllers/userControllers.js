import * as userService from "../services/userServices.js";

export const fetchAll = async (req, res) => {
    try {
        const users = await userService.fetchAll();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Users not fetched !"});
    }
}

export const fetchUser = async (req, res) =>{
     try {
        const user_id = req.params.id;
        const user = await userService.fetchUser(user_id);
        return res.status(200).json({user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Users not fetched !"});
    }
}

export const create = async (req, res) => {
    try {
        const {email, password, role, ol_id} = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "Veuillez remplir tous les champs" });
        }
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if(!isEmailValid){
            return res.status(400).json({ message: "Veuillez fournir un email valide" });
        }
        if(role == "ADMIN_LOCAL" && !ol_id){
            return res.status(400).json({ message: "L'identifiant de l'organisation locale est requis pour le rôle ADMIN_LOCAL" });  
        }
        await userService.create(email, password, role, ol_id);
        return res.status(201).json({message:"user created!"});
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({ message: error.message || "Ajout échoué !" });
    }
}

export const update = async (req, res) => {
    try {
        const { email } = req.body;
        const id = req.params.id;
        if(!email){
            return res.status(400).json({ message: "Veuillez remplir tous les champs" });
        }
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if(!isEmailValid){
            return res.status(400).json({ message: "Veuillez fournir un email valide" });
        }
        await userService.update(email, id);
        return res.status(200).json({ message: "user updated!" });
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({ message: error.message || "Mise à jour échouée !" });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { password } = req.body;
        const id = req.params.id;
        if(!password){
            return res.status(400).json({ message: "Veuillez remplir tous les champs" });
        }
        await userService.updatePassword(password, id);
        return res.status(200).json({ message: "Mot de passe mis à jour !" });
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({ message: error.message || "Mise à jour échouée !" });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            return res.status(400).json({ message: "Veuillez fournir l'identifiant de l'utilisateur" });
        }
        await userService.deleteUser(id);
        return res.status(200).json({message:"Operation succeded!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Operation failed!"});
    }
}