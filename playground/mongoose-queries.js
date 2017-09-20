const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');

// var id = '59c25bc47352621e0e570dda';

// Todo.find({
//   _id: id  
// }).then((todos) => {
//   console.log('Fetching todos with the specified id from the database', todos);
// });
// 
// Todo.findOne({
//   _id: id  
// }).then((todo) => {
//   console.log('Fetching only one todo with the specified id from the database', todo);
// }).catch((e) => {
//   console.log('Crazy shit', e);  
// });

User.findById('59c0182d5f54481a9317f391').then((user) => {
  if(!user)
    return console.log('User not found in the database');

  console.log('User Found by id: ', user);
}).catch((e) => console.log('Invalid ID provided!!!', e));
