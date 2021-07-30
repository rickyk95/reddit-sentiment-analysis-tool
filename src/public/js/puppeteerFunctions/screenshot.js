const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const path = require('path')
puppeteer.use(StealthPlugin())
const transporter = require('../email/email.js')
const bodyParser = require('body-parser')

console.log(path.join(__dirname,'../../../screenshot.png'))
var mailOptions = {
  from: 'reddit.sentiment.tool@gmail.com',
  subject: "Here's your screenshot!",
  text: 'Thanks for using our Reddit Sentiment Analysis Tool',
  attachments:[]
 
};


async function screenShot(email){

  try{

        const browser = await puppeteer.launch({headless:true});

        const context = browser.defaultBrowserContext()

        context.overridePermissions('http://localhost:3000/screenshot',['notifications'])

        const page = await browser.newPage();

         await page.goto('http://localhost:3000/screenshot');
       
         
         await page.screenshot({                     
 
           path: "./screenshot.png",                   
         
          clip:{
            x:0,
            y:0,
            width:800,
            height:700
          }
         })

         mailOptions.to=email

         await page.waitFor(5000)
         mailOptions.attachments[0]= {file:'screenshot.png'}
         mailOptions.attachments[1]={path:path.join(__dirname,'../../../../screenshot.png')}
         console.log(path.join(__dirname,'../../../screenshot.png'))
         console.log(mailOptions)

        //  browser.close()  
         
         transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        

        }catch(e){

          console.log(e)
          
        }
    

}

module.exports={

    screenShot
}