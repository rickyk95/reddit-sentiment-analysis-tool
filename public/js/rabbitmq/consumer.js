var amqp = require('amqplib');

const { search } = require('../puppeteerFunctions/search.js')



async function connect() {

    connection = await amqp.connect('amqp://localhost:5672')
  
    channel = await connection.createChannel()

    await channel.deleteQueue('rpc_queue')
  
    q = await channel.assertQueue('rpc_queue',{durable:false})

    channel.consume('rpc_queue', async (redditUrl)=>{

        const threads = await search(redditUrl.content.toString())

        channel.sendToQueue(redditUrl.properties.replyTo,Buffer.from(JSON.stringify(threads)),{

            correlationId:redditUrl.properties.correlationId
        })

        
        
    })
  
  }
  connect()

