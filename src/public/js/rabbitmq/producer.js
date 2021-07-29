var amqp = require('amqplib');


function generateUuid() {
  return Math.random().toString() +
         Math.random().toString() +
         Math.random().toString();
}


async function connect() {

   connection = await amqp.connect('amqp://localhost') 
   channel =  await connection.createChannel()
   console.log('created2000')

}


//connect()


module.exports = {
    
  generateUuid


}

//connect()
