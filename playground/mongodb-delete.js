// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('unable to connect to mongodb server');
  }
  console.log('connected to server');

  // db.collection('Todos').deleteMany({text : 'task 1'}).then((result) => {
  //   console.log(result);
  // });
 /* db.collection('Todos').deleteOne({text : 'task 2'}).then((result) => {
    console.log(result);
  });*/

   /*db.collection('Todos').findOneAndDelete({completed : true}).then((result) => {
    console.log(result);
  });*/

  /*db.collection('Users').find({name: 'Shalinee'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (error) => {
    console.log('unable to fetch todos', error);
  });*/
 /* db.collection('Users').deleteOne({
    _id : new ObjectID('5a0159724fbfdcb04ea6cbdf')
  }).then((result) => {
    console.log(result);
  });*/
  db.collection('Users').deleteMany({name: 'Shalinee'}).then((result) => {
    console.log(result);
  })
  db.close();
});