const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');
const port = process.env.PORT || 3000;

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

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.status(200).send({ todos });
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  } else {
    Todo.findById(id).then((todo) => {
      if (!todo) {
        res.status(404).send();
      } else {
        res.status(200).send({todo});
      }
    }).catch((err) => {
      res.status(400).send()
    })
  }
});
app.delete('/todos/:id', (req,res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		res.status(404).send();
	}else{
		Todo.findByIdAndRemove(id).then((todo)=> {
			if(!todo){
				res.status(404).send();
			}else{
				res.status(200).send({todo});
			}
		}).catch((err)=>{
			res.status(400).send();
		})
	}
});

app.listen(port, () => {
  console.log(`started app on ${port}`);
});

module.exports = { app }