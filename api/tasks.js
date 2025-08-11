import express from "express";
const router = express.Router();
export default router;

import { createTask, getTaskById, getTasks, updateTask } from "#db/queries/tasks"
import requireBody from "#middleware/requireBody"
import requireUser from "#middleware/requireUser"
import { createToken } from "#utils/jwt";
import getUserFromToken from "#middleware/getUserFromToken";

router.use(getUserFromToken)
router.use(requireUser)

router
    .route("/")
    .get(async (req, res) => {
    const tasks = await getTasks();
    res.send(tasks);
})
    .post(async (req, res) => {
    const { title, done } = req.body
    if(title == null || done == null)
        return res.status(400).send("Request body requires title and done")

    const task = await createTask(title, done, req.user.id)
    res.status(201).send(task)
})

router
    .route("/:id")
    .patch(async (req, res) => {
        const { id } = req.params

        const task = await getTaskById(id)
        console.log("PATCH /tasks/:id", {id, userId: req.user?.id, task})
        if (!task) {
            return res.status(404).send("Task not found")
        }
        
        if (task.user_id !== req.user.id) {
            return res.status(403).send("You don't own this task")
        }

        const { title, done } = req.body
        const updatedTask = await updateTask(id, { title, done })
        res.status(200).send(updatedTask)
    })
