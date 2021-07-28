const express = require('express')
const app = express()
const http = require('http');
const exphbs = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')
const { scoreThreads } = require('./public/js/puppeteerFunctions/scoreThreads.js')
const { search } = require('./public/js/puppeteerFunctions/search.js')
const { screenShot } = require('./public/js/puppeteerFunctions/screenshot')
const { generateUuid} = require('./public/js/rabbitmq/producer.js')
let connection,channel;


var amqp = require('amqplib');


async function connect() {

    connection = await amqp.connect('amqp://localhost') 
    channel =  await connection.createChannel()
    console.log('created2000')
 
 }

 connect()

const session = require('express-session')
const server = http.createServer(app)
const socketio = require('socket.io');
const { json } = require('express');
const io = socketio(server)


app.set('view engine','handlebars')

app.engine('handlebars',exphbs())

app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded({extended:false}))

    server.listen(3000, async ()=>{

})



app.get('/', async (req,res)=>{
    res.render('index',{layout:false})
 
})

app.post('/submit', function(req,res,next){
    req.io=io;
    next()

},async (req,res)=>{

     res.render('waiting',{layout:false}) 

     let queue = await channel.assertQueue('');

     channel.sendToQueue('rpc_queue',Buffer.from('https://www.reddit.com/r/TrueOffMyChest/'),{
         correlationId:generateUuid(),
         replyTo:queue.queue
       }) 
   
      channel.consume(queue.queue,  (threads)=>{  
         console.log("received back wohooo")
         results = JSON.parse(threads.content.toString()) 
         req.io.emit('o')   
        
     })


})


app.get('/results', function(req,res,next){
    req.io=io;
    next()

}, async (req,res)=>{
    
    const {subreddits, average} = results

    res.render('results',{layout:false,stringifiedSubreddits:JSON.stringify(subreddits),subreddits:subreddits,average})

    await screenShot()
  
})


app.get('/screenshot', function(req,res,next){
    req.io=io;
    next()
},async (req,res)=>{
    
    const {subreddits, average} = results

    res.render('results',{layout:false,stringifiedSubreddits:JSON.stringify(subreddits),subreddits:subreddits,average})


})






