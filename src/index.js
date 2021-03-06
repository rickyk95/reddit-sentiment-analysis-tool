const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app)
const socketio = require('socket.io');
const port = process.env.PORT || 3000;
 const io = socketio(server)
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const { scoreThreads } = require('./public/js/puppeteerFunctions/scoreThreads.js')
const { search } = require('./public/js/puppeteerFunctions/search.js')
const { generateUuid} = require('./public/js/rabbitmq/producer.js')
const { screenShot } = require('./public/js/puppeteerFunctions/screenshot')
const getResultsRoute = require('./routes/results.js')
const getScreenshotRoute = require('./routes/screenshot.js')
const connectRabbitMQ  = require('./public/js/rabbitmq/connect.js')


connectRabbitMQ()

app.set('view engine','handlebars')

app.engine('handlebars',exphbs())

app.use(express.static(path.join(__dirname,'public')))
app.set('views', path.join(__dirname, 'views'));

console.log(path.join(__dirname,'public'))
console.log(process.env.EMAIL)

app.use(bodyParser.urlencoded({ extended: true }));


app.use(getScreenshotRoute)

// app.use(getResultsRoute)



app.get('/', async (req,res)=>{
    res.render('index',{layout:false})
 
})


app.post('/submit', function(req,res,next){
    req.io=io;
    next()
},async (req,res)=>{
    console.log(req.session)
    
     res.render('waiting',{layout:false}) 

     let queue = await channel.assertQueue('');

      email = req.body.email;
     channel.sendToQueue('rpc_queue',Buffer.from(req.body.url.toString()),{
         correlationId:generateUuid(),
         replyTo:queue.queue
       }) 

      channel.consume(queue.queue,  (threads)=>{  
         console.log("received back wohooo")
         results = JSON.parse(threads.content.toString()) 
         req.io.emit('redirect',email)      
     })

})

app.get('/waiting2',(req,res)=>{

    res.render('waiting2',{layout:false})
  
})

app.get('/results',(req,res)=>{ 

            const {subreddits, average} = results

            res.render('results',{layout:false,stringifiedSubreddits:JSON.stringify(subreddits),subreddits:subreddits,average})
            
             screenShot(email)

})




server.listen(port,  ()=>{
    console.log('Connected')
})


