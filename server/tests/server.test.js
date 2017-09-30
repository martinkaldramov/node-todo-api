const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {Todo} = require('./../models/Todo');
const {ObjectID} = require('mongodb');

var todos = [
  {
    _id: new ObjectID(), 
    text: '1st test todo'
  },
  {
    _id: new ObjectID(),
    text: '2nd test todo'}
];

beforeEach(() => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);  
  }).then(() => done());  
});

describe('POST /todos', () => {
  it('should successfully post an item to the todos collection', (done) => {
    var text = 'Test todo item';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
         if(err)
           return done(err);

         Todo.find({text}).then((todos) => {
           expect(todos.length).toBe(1);
           expect(todos[0].text).toBe(text);
           done();
         }).catch((e) => done(e));
      });
  });   

  it('should not create a todo with invalid data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err)
          return done(err);

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);  
          done();
        }).catch((e) = done(e));
      });
  });

});


describe('GET /todos', () => {
  it('should return all the todos in the collection', (done) => {
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
  it(`should return a todo doc - ${todos[0]._id.toHexString()}`, (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(toDos[0].text);  
      })
      .end(done);
  });  
});
