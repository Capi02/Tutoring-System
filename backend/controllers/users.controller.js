const User = require("../models/User");

const getUsers = async (req, res, next) => {
   
    try {
        const users = await User.find({ role: "student"});

        const userData = users.map(user => {
            return {
                id: user._id,
                username: user.username,
                password: user.password,
                role: user.role,
                aspectosPersonales: user.aspectosPersonales
            };
        });

        res.status(200).json(userData);
        next();

    } catch (error) {
        console.error("Error obtainning the users: ", error);
        throw error;
    }
}



module.exports = {
    getUsers
}