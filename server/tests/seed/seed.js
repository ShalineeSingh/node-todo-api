const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const UserOne = new ObjectID();
const UserTwo = new ObjectID();

var users = [{
	_id : UserOne,
	 email : 'shalinee@abc.com',
	 password: '123qwer',
	 tokens: [{
	 	token: jwt.sign({_id: UserOne, access : 'auth' }, 'abc123').toString(),
	 	access : 'auth'
	 }]
},{
	_id: UserTwo,
	email: 'abc@abc.com',
	password: 'qwer123'
}];

const populateUsers = (done) => {
	User.remove({}).then(() => {
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();

		return Promise.all([userOne, userTwo])
	}).then(() => done());
};

var todos = [{
  _id: new ObjectID(),
  text: 'new text'
}, {
  _id: new ObjectID(),
  text: 'new text 2',
  completed: true,
  completedAt: 222
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};