var express = require('express');
var router = express.Router();
const todoModel = require('../models/todo');
const helperFunctions = require('../helpers/functions');


/* Create todo */
router.post('/create', async (req, res, next) => {
  try {
    const todoItem = await todoModel.findOne({ title: req.body.title });

    if (todoItem) throw Error('This item has been created before.');

    const id = await helperFunctions.generateIdWithPrefix(14, 'TODO_');

    const result = await todoModel.create({
      id,
      ...req.body
    });

    if(!result) throw new Error('Error ouccured when retrieving todos');

    res.status(200).send({
      success: true,
      data: result,
      message: 'New To-Do item created'
    })

  } catch (error) {
    console.log(`ERROR (TODO CREATE): ${error.toString()}`);

    res.status(400).send({
      success: false,
      message: error.message
    });
  }
  
});

/* GET todo listing. */
router.get('/list', async (req, res, next) => {
  try {
    const result = await todoModel.find({}).skip(0).limit(100).sort({_id: -1});

    res.status(200).send({
      success: true,
      data: result
    })

  } catch (error) {
    console.log(`ERROR (TODO LIST): ${error.toString()}`);

    res.status(500).send({
      success: false,
      message: 'Error ouccured when retrieving todos'
    });
  }
  
});

module.exports = router;
