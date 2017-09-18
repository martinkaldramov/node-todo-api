var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }  
});

var newUser = new User({
  email: '  martinkaldramov@yahoo.com  '  
});

newUser.save().then((doc) => {
  console.log('User successfully saved to the database', doc);
}, (e) => {
  console.log('Unable to save the user to the database', e);
});

// var newTodo = new Todo({
//   text: 'Cook Dinner'  
// });
// 
// newTodo.save().then((doc) => {
//   console.log('Document saved successfully', doc);
// }, (e) => {
//   console.log('Unable to save the todo item');
// });
// 

// var otherTodo = new Todo({
//   text: 'Feed the dog',
//   completed: false,
//   completedAt: 1234
// });
// 
// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save the todo', e);
// });
