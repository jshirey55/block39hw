import express from "express";
const router = express.Router();
export default router;

import { createTask, getTasks } from "#db/queries/tasks"
import requireBody from "#middleware/requireBody"
import requireUser from "#middleware/requireUser"
import { createToken } from "#utils/jwt";

router.route("/").get(async (req, res) => {
  const tasks = await getTasks();
  res.send(tasks);
});