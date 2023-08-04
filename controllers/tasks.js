const Task = require("../models/taskModel");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: TaskId } = req.params;
    const task = await Task.findOne({ _id: TaskId });
    if (!task) {
      return res.status(404).json({ msg: `no task with id : ${TaskId}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(404).json({ error });
  }
};

const updateTask = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(404).json(error);
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: TaskId } = req.params;
    await Task.deleteOne({ _id: TaskId });
    res.status(200).json({});
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };
