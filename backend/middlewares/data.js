
const getUserData = (req, res, next) => {
    const {id, username, role} = req.user

    next();
}


module.exports = {
    getUserData
}