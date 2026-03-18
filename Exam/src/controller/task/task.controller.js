const jwt = require('jsonwebtoken');
const statusCode = require('http-status-codes');
const moment = require("moment")
const bcrypt = require("bcrypt")
const { MSG } = require("../../utils/msg")
const { successResponse, errorResponse } = require("../../utils/responce");
const TaskService = require('../../services/task/task.services');

const taskService = new TaskService()

module.exports.addTask = async (req, res) => {
    try {

        req.bodycreateAt = moment().format('MM/DD/YYYY, h:mm:ss A');
        req.bodyupdateAt = moment().format('MM/DD/YYYY, h:mm:ss A');;

        const task = await taskService.addTask(body);

        if (!task) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.TASK_NOT_ADDED))
        }

        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.TASK_CREATED, task))
    }
    catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SOMETHING_WENT_WRONG))
    }
}

module.exports.getAllTasks = async (req, res) => {
    try {
        const { status, priority } = req.query;
        let query = { userId: req.user.id, isDeleted: false };

        if (status) query.status = status;
        if (priority) query.priority = priority;

        const tasks = await taskService.fetchAllTasks(query);

        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.TASKS_FETCHED, tasks))
    }
    catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SOMETHING_WENT_WRONG))
    }
}

module.exports.getSingleTask = async (req, res) => {
    try {
        const task = await taskService.fetchSingleTask({ _id: req.params.id, userId: req.user.id, isDeleted: false });

        if (!task) {
            return res.status(statusCode.NOT_FOUND).json(errorResponse(statusCode.NOT_FOUND, true, MSG.TASK_NOT_FOUND))
        }

        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.TASK_FETCHED, task))
    }
    catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SOMETHING_WENT_WRONG))
    }
}

module.exports.updateTask = async (req, res) => {
    try {

        req.body.updateAt = moment().format('MM/DD/YYYY, h:mm:ss A')
        const task = await taskService.updateTask(req.params.id, body);

        if (!task) {
            return res.status(statusCode.NOT_FOUND).json(errorResponse(statusCode.NOT_FOUND, true, MSG.TASK_NOT_FOUND))
        }

        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.TASK_UPDATED, task))
    }
    catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SOMETHING_WENT_WRONG))
    }
}

module.exports.deleteTask = async (req, res) => {
    try {
        const task = await taskService.deleteTask(req.params.id);

        if (!task) {
            return res.status(statusCode.NOT_FOUND).json(errorResponse(statusCode.NOT_FOUND, true, MSG.TASK_NOT_FOUND))
        }

        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.TASK_DELETED, task))
    }
    catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SOMETHING_WENT_WRONG))
    }
}
