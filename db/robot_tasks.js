const client = require('./client.js')

const createRobotTasks = async(robotId, taskId) => {

    try {
        const {rows: [robotTask]} = await client.query(`
            INSERT INTO robot_tasks (robot_id, task_id)
            VALUES (${robotId}, ${taskId})
            RETURNING *;
        `);
        return robotTask;
    }catch(err){
        console.log(err);
    }
}
module.exports = {
    createRobotTasks
}