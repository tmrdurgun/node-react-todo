var express = require('express');
var router = express.Router();
const todoModel = require('../models/todo');
const helperFunctions = require('../helpers/functions');


/* Create todo */
router.post('/create', async (req, res) => {
  try {
    const todoItem = await todoModel.findOne({ title: req.body.title });

    if (todoItem) throw Error('This task has been created before.');

    const id = await helperFunctions.generateIdWithPrefix(14, 'TASK_');

    const result = await todoModel.create({
      id,
      ...req.body,
      status: 1
    });

    if(!result) throw new Error('Error ouccured while creating new task');

    res.status(200).send({
      success: true,
      data: result,
      message: 'New task created'
    })

  } catch (error) {
    console.log(`ERROR (TASK CREATE): ${error.toString()}`);

    res.status(400).send({
      success: false,
      message: error.message
    });
  }
  
});

/* GET todo listing. */
router.get('/list', async (req, res) => {
  try {
    const result = await todoModel.find({}).skip(0).limit(100).sort({_id: -1});

    res.status(200).send({
      success: true,
      data: result
    })

  } catch (error) {
    console.log(`ERROR (TASK LIST): ${error.toString()}`);

    res.status(500).send({
      success: false,
      message: 'Error ouccured when retrieving tasks'
    });
  }
  
});

router.post('/edit', async (req, res) => {
  try {
    const result = await todoModel.updateOne({ id: req.body.id }, {...req.body});

    if(!result) throw new Error('Error ouccured while updating task');

    res.status(200).send({
      success: true,
      message: 'Task updated'
    })

  } catch (error) {
    console.log(`ERROR (TASK EDIT): ${error.toString()}`);

    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

router.post('/remove', async (req, res) => {
  try {
    const result = await todoModel.remove({ id: req.body.id });

    if(!result) throw new Error('Error ouccured while deleting task');

    res.status(200).send({
      success: true,
      message: 'Task removed'
    })

  } catch (error) {
    console.log(`ERROR (TASK DELETE): ${error.toString()}`);

    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
