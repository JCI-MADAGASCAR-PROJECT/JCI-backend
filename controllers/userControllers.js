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
        await userService.create(email, password, role, ol_id);
        return res.status(201).json({message:"user created!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Users not created !"});
    }
}

export const update = async (req, res) => {
    try {
        const { email } = req.body;
        const id = req.params.id;

        await userService.update(email, id);

        return res.status(201).json({ message: "user updated!" });
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({ message: error.message || "Update failed!" });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { password } = req.body;
        const id = req.params.id;

        await userService.updatePassword(password, id);

        return res.status(201).json({ message: "Password updated!" });
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({ message: error.message || "Update failed!" });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await userService.deleteUser(id);
        return res.status(201).json({message:"Operation succeded!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Operation failed!"});
    }
}