const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');

const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateTodos);
beforeEach(populateUsers);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Text for testing';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({ text }).then((todos) => {
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err) => {
          done(err);
        })
      });
  });
  it('should not create a todo with invalid data', (done) => {
    var text = '      ';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2)
          done();
        }).catch((err) => {
          done(err);
        });
      });
  });
});
describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should get todo by id', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe('new text');
      })
      .end(done);
  });
  it('should return 404 when id not found', (done) => {
    var newId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${newId}`)
      .expect(404)
      .end(done);
  });
  it('should return 404 fro non object ids', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });
});
describe('DELETE /todos/:id', () => {
  it('should delete todo by id', (done) => {
    request(app)
      .delete(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe('new text');
      })
      .end(done);
  });
  it('should return 404 when todo not found', (done) => {
    var newid = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${newid}`)
      .expect(404)
      .end(done);
  });
  it('should return 404 when id is invalid', (done) => {
    request(app)
      .delete('/todos/1234')
      .expect(404)
      .end(done);
  });
});
describe('PATCH /todos/:id', () => {
  it('should update todo', (done) => {
    var hexid = todos[0]._id.toHexString();
    request(app)
      .patch(`/todos/${hexid}`)
      .send({ text: 'modified text', completed: true })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe('modified text');
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');

      })
      .end(done);
  });
  it('should clear completedAt when todo is not completed', (done) => {
    var hexid = todos[1]._id.toHexString();
    request(app)
      .patch(`/todos/${hexid}`)
      .send({ text: 'modified second text', completed: false })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe('modified second text')
        expect(res.body.todo.completed).toBe(false)
        expect(res.body.todo.completedAt).toNotExist()
      })
      .end(done);
  });
});
describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString())
        expect(res.body.email).toBe(users[0].email)
      })
      .end(done);
  });
  it('should return 401 if user not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});
describe('POST /user', () => {
  it('should create a user', (done) => {
    var email = 'app@ex.com';
    var password = 'qazwsx';
    request(app)
      .post('/user')
      .send({ email, password })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist()
        expect(res.body._id).toExist()
        expect(res.body.email).toBe(email)
      })
      .end((err) => {
        if (err) {
          done(err);
        }
        User.findOne({ email }).then((user) => {
          expect(user).toExist()
          expect(user.password).toNotBe(password)
          done();
        })
      });

  });
  it('should return validaiton error if request invalid', (done) => {
    var email = 'ap@pex.com';
    var password = 'wsx';
    request(app)
      .post('/user')
      .send({ email, password })
      .expect(400)
      .end(done);
  });
  it('should not create user if email is already used', (done) => {
    var email = 'abc@abc.com';
    var password = 'qazwsx';
    request(app)
      .post('/user')
      .send({ email, password })
      .expect(400)
      .end(done);

  });
})