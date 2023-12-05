const client = require('./client.js')

const createRobotOwners = async(robotId, ownerId) => {

    try {
        const {rows: [robotOwner]} = await client.query(`
            INSERT INTO robot_owners (robot_id, owner_id)
            VALUES (${robotId}, ${ownerId})
            RETURNING *;
        `);
        return robotOwner;
    }catch(err){
        console.log(err);
    }
}
module.exports = {
    createRobotOwners
}