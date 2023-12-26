var express = require('express');
const models = require('../models')
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const allTasks = await models.tasks.find()
  const datesObject = {};
  for(let task of allTasks) {
    if(!(task.date in datesObject)) {
      datesObject[task.date] = [];
    }
    datesObject[task.date].push(task)
  }
  res.json({
    tasks: datesObject
  })
});

router.post('/', async function(req, res, next) {
  console.log(req.body)
  const task = new models.tasks({
    title: req.body.title,
    desc: req.body.desc,
    date: new Date(req.body.date),
    completed: false
  })
  await task.save();
  res.json();
});


router.put('/:id', async function(req, res, next) {
    const task = await models.tasks.findById(req.params.id);
    task.completed = !task.completed;
    await task.save()
    res.json();
  })

router.delete('/:id', async function(req, res, next) {
    const task = await models.tasks.findByIdAndDelete(req.params.id);
    res.json();
  })

module.exports = router;


/*
add event
list events

list notes
add note

add task
list tasks
complete

login
add user


*/