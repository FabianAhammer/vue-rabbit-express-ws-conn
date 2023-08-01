const express = require('express');
const amqp = require('amqplib/callback_api');
const app = express();
const port = 3001;

const io = require("socket.io")(3002, {
  cors: {
      origin: ['http://localhost:3000']
  }
})

const room = "fanout";
io.on('connection', socket => {
  socket.join(room);
  // establsh connection with rabbitmq using amqp protocol on default port 5672
  amqp.connect('amqp://localhost', (err0, connection) => {
      if (err0) {
          throw err0
      }
      // create a channel for data exchange on successfull connection
      connection.createChannel((err1, channel) => {
          if (err1) {
              throw err1
          }
      
          channel.consume("testq", (message) => {
            io.to(room).emit('SUBSCRIBE', `Received: ${JSON.stringify(message)}`)
            channel.ack(message);
          })
      })
  })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})