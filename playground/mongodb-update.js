// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('unable to connect to mongodb server');
  }
  console.log('connected to server');

 /* db.collection('Todos').findOneAndUpdate({
    _id : new ObjectID('5a011d6391320033664a30dd')
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (error) => {
    console.log('unable to fetch todos', error);
  });*/

   db.collection('Users').findOneAndUpdate({
    _id : new ObjectID('5a0159814fbfdcb04ea6cbe5')
  }, {
    $set: {
      name: 'Shalinee'
    },
    $inc: {age: 1}
  }, {
    returnOriginal: false
  }).then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (error) => {
    console.log('unable to fetch todos', error);
  });
  
  db.close();
});