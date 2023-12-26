var express = require('express');
const models = require('../models')
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const allEvents = await models.events.find()
  const datesObject = {};
  for (let event of allEvents) {
    if (!(event.date in datesObject)) {
      datesObject[event.date.getTime()] = [];
    }
    datesObject[event.date.getTime()].push(event)
  }
  res.json({
    events: datesObject
  })
});

router.post('/', async function (req, res, next) {
  const event = new models.events({
    title: req.body.title,
    desc: req.body.desc,
    date: new Date(Number(req.body.date))
  })
  await event.save();
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