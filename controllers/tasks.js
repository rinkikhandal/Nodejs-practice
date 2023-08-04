const Task = require("../models/taskModel");

const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: TaskId } = req.params;
  const task = await Task.findOne({ _id: TaskId });
  if (!task) {
    return res.status(404).json({ msg: `no task with id : ${TaskId}` });
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: TaskId } = req.params;
  const taskUpdated = req.body;
  const task = await Task.findOneAndUpdate({ _id: TaskId }, taskUpdated, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({ msg: `no task with id : ${TaskId}` });
  }

  res.status(200).json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: TaskId } = req.params;
  await Task.deleteOne({ _id: TaskId });
  res.status(200).json({});
});

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };
