const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.status(200).send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (doc) => {
	res.status(200).send();
}, (err) => {
	res.status(400).send(err);
});

app.listen(3000, () => {
  console.log('started app on 3000');
});

module.exports = {app}