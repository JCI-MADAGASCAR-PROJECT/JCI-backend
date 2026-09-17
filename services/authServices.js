import prisma from "../DB/db.config.js"

    export const login = async (req, res) =>{
        try {
            const {email, password} = req.body;
            if(!email || !password){
                return  res.status(400).json({message:"Fill all fields"})
            }
            const user = await prisma.user.findUnique({
                where:{
                    email,
                }
            });

            if(!user){
                return res.status(404).json({message:"Invalid credentials"})
            };

            const IsMatch = await bcrypt.compare(password, user.password);

            if(! IsMatch){
                return res.status(401).json({message:"Password not correct"})
            }
            await prisma.user.update({
                where: {
                    id: Number(user.id),
                },
                data: {
                    lastLogin: new Date(),
                },
            });
            const token = generateToken(user.id);
            res.cookie('token',token,cookieOptions);
            return res.status(200).json({message:"User logged in!"})    

        } catch (error) {
            res.status(400).json({message:"Er", data:error })
        }
    }