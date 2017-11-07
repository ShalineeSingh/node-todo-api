// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('unable to connect to mongodb server');
  }
  console.log('connected to server');

  /*db.collection('Todos').insertOne({
  	text : 'Something to do',
  	completed : false
  }, (error, result) => {
  	if(error){
  		return console.log('could not add to the db', error);
  	}
  	console.log(JSON.stringify(result.ops, undefined, 2));
  });*/

  db.collection('Users').insertOne({
  	name: 'Shalinee',
  	age: 22,
  	location: 'banglore'
  }, (error, result) => {
  	if(error){
  		return console.log('unable to add to db');
  	}
  	console.log(JSON.stringify(result.ops, undefined, 2))
  })
  db.close();
});