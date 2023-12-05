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

module.exports = {
    createRobots,
};