const client = require('./client.js');
const { createOwners } = require('./owners.js');
const { createRobots } = require('./robots.js');
const { createTasks } = require('./tasks.js');
const {createRobotOwners } = require('./robot_owners.js');
const {createRobotTasks } = require('./robot_tasks.js');


const dropTables = async() => {
    try{
        await client.query(`
            DROP TABLE IF EXISTS robot_tasks;
            DROP TABLE IF EXISTS robot_owners;
            DROP TABLE IF EXISTS robots;
            DROP TABLE IF EXISTS tasks;
            DROP TABLE IF EXISTS owners;

        `)
    } catch (err) {
        console.log(err);
    }
};

const createTables = async() => {
    try{
        await client.query(`
            CREATE TABLE robots (
                id SERIAL PRIMARY KEY,
                name VARCHAR(15) NOT NULL,
                model VARCHAR(15) NOT NULL,
                company BIGINT NOT NULL,
                img VARCHAR(255) NOT NULL,
                warranty_month INT NOT NULL,
                child_safe BOOLEAN NOT NULL,
                release_date DATE NOT NULL
        );

        CREATE TABLE tasks (
            id SERIAL PRIMARY KEY,
            name VARCHAR(30) NOT NULL
        );

        CREATE TABLE robot_tasks (
            robot_id INT REFERENCES robots(id),
            task_id INT REFERENCES tasks(id)
        );

        CREATE TABLE owners (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(30) NOT NULL,
            last_name VARCHAR(30) NOT NULL,
            email VARCHAR(30) NOT NULL
        );

        CREATE TABLE robot_owners (
            robot_id INT REFERENCES robots(id),
            owner_id INT REFERENCES owners(id)
        )

        
        `);
    } catch (err) {
        console.log(err);
    }
};

const getRobotAndOwners = async() => {
    try {
        const {rows } = await client.query(`
            SELECT robots.name AS robotName, owners.first_name AS ownersName
            FROM robots
            JOIN robot_owners on robots.id = robot_owners.robot_id
            JOIN owners ON owners.id = robot_owners.owner_id;
        `);
        console.log(rows);
    } catch (err) {
        console.log(err);
    }
}

const getRobotAndTasks = async() => {
    try {
        const { rows } = await client.query(`
            SELECT robots.name AS robotName, tasks.name AS taskName
            FROM robots
            JOIN robot_tasks on robots.id = robot_tasks.robot_id
            JOIN tasks ON tasks.id = robot_tasks.task_id;
        `);
        console.log(rows);
    } catch (err) {
        console.log(err);
    }
}


const syncAndSeed = async() => {
    await client.connect();
    console.log(`CONNECTED TO THE DB!`);

    await dropTables();
  console.log(`DROP TABLES`);

    await createTables();
  console.log(`CREATED TABLES!`);

  const robot1 = await createRobots('hercules', '1A', 13, 'n/a', 12 , true, 20231204);
  const robot2 = await createRobots('posoiden', '1A', 13, 'n/a', 12 , true, 20231204);
  console.log(robot1);
  console.log('robot created!');

  const task1 = await createTasks('mopping');
  const task2 = await createTasks('sweeping');
  console.log(task1);
  console.log('created task!');

  const owner1 = await createOwners('somaan', 'iqbal', '123@example.com');
  console.log(owner1);
  console.log('owners created!');

  await createRobotOwners(robot1.id, owner1.id);
  console.log(`robotOwners created`);

  await createRobotTasks(robot1.id, task1.id);
  await createRobotTasks(robot1.id, task2.id);
  await createRobotTasks(robot2.id, task2.id);
  console.log(`robotTasks created`);

await getRobotAndOwners();

await getRobotAndTasks();

  client.end();
}


syncAndSeed();