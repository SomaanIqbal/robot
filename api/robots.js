const express = require('express');
const router = express.Router();

const {getAllRobots, getRobotsById,getRobotsByTaskId} = require('../db/robots.js')

router.get('/', async (req, res, next)=> {
    try {
        const robots = await getAllRobots();
        res.send(robots)
    } catch(err) {
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const robots = await getRobotsById(req.params.id);
        res.send(robots);

    }catch(err) {
        next(err)
    }
})

router.get('/tasks/:id', async (req, res, next) => {
    try {
        const robotTasks = await getRobotsByTaskId(req.params.id)
        res.send(robotTasks);
    } catch (err) {
        next(err)
    }
})
module.exports = router;
