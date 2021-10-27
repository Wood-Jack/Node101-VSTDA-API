const express = require('express');
const morgan = require('morgan');

const PORT = 8000;
const app = express();

app.use(express.json());
// add your code here


const data = [

    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
  ];
  
  app.get('/', (req, res) => {
      res.send({status:'ok'}).status(200);
  });
  
  app.get('/api/TodoItems', (req, res) =>{
      res.send(data);
  });
  
    //Get a todo list item using the todoItemId
  app.get('/api/TodoItems/:id', (req, res) => {
    for(let i = 0; i < data.length; i++) {
      if(data[i]['todoItemId'] == req.params.id) {
          res.send(data[i]);
      }
  }
  });
  
  //Add an item to the dataset. If there is already an item with a matching todoItemId, overwrite the existing item.
  app.post('/api/TodoItems', (req, res) => {
    for(let i = 0; i < data.length; i++) {
      if(req.body.todoItemId === data[i].todoItemId) {
          data[i] = req.body;
      } else {
          data.push(req.body);
      };
  };
  res.status(201).send(req.body);
  });
  
  //Delete Item with the todoitemId
  app.delete('/api/TodoItems/:id', (req,res) => {
    var newData = [];
        // check if ids are the same, delete from data
      for(var i = 0; i < data.length; i++) {
          if(data[i]['todoItemId'] == req.params.id) {
              newData = data.splice(i, 1);
              // set status and send back copy of deleted item
              res.status(200).send(newData[i]);
          }
      }
  });
  

module.exports = app;
