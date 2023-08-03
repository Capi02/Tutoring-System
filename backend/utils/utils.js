const bcrypt = require("bcryptjs");

async function hashPassword(password){
    const passwordHash = await bcrypt.hash(password, 10).toString();
    const result = passwordHash;
    return result;
}

console.log(hashPassword("123"));


module.exports = {
    hashPassword,
}