const client = require("./client.js");

const createRobots = async(name, model, company, img, warranty_month, child_safe, release_date) => {
    try {
        const { rows: [robot], } = await client.query(`
            INSERT INTO robots (name, model, company, img, warranty_month, child_safe, release_date)
            VALUES ('${name}','${model}', '${company}', '${img}', '${warranty_month}', '${child_safe}', '${release_date}')
            RETURNING *;
        `);
        return robot;
    } catch(err) {
        console.log(err);
    }
}

const getAllRobots = async() => {
    try {
        const {rows: robots} = await client.query(`
        SELECT * FROM robots;
        `);
        return robots;
    }catch(err) {
        throw err
    }
}

const getRobotsById = async(id) => {
    try {
        const {rows: [robot]} = await client.query(`
            SELECT * FROM robots
            WHERE id = $1;
        `, [id]);

        return robot
    }catch(err) {
        throw err
    }
}

// SELECT robots.name AS robotName, tasks.name AS taskName
// FROM robots
// JOIN robot_tasks on robots.id = robot_tasks.robot_id
// JOIN tasks ON tasks.id = robot_tasks.task_id; 
const getRobotsByTaskId = async(id) => {
    try {
        const {rows: robots} = await client.query(`
            SELECT * FROM robots
            JOIN robot_tasks ON robots.id = robot_tasks.robot_id
            WHERE task_id = ${id}
        `)
        return robots
    } catch (err) {
        throw err
    }
}

module.exports = {
    createRobots, getAllRobots, getRobotsById, getRobotsByTaskId
};