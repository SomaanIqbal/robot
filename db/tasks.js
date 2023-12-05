const client = require("./client.js");

const createTasks = async (name) => {
    try {
        const { rows: [task] } = await client.query(`
            INSERT INTO tasks (name)
            VALUES ('${name}')
            RETURNING *;
        `);
        return task;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    createTasks,
};