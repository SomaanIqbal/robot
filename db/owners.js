const client = require("./client.js");

const createOwners = async (first_name, last_name, email) => {
    try {
        const { rows: [owner] } = await client.query(`
            INSERT INTO owners (first_name, last_name, email)
            VALUES ('${first_name}','${last_name}','${email}')
            RETURNING *;
        `);
        return owner;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    createOwners,
};