const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const path = require('path')
puppeteer.use(StealthPlugin())
const transporter = require('../email/email.js')

console.log(path.join(__dirname,'../../../screenshot.png'))
const mailOptions = {
  from: 'reddit.sentiment.tool@gmail.com',
  to: 'rickyk95@hotmail.com',
  subject: "Here's your screenshot!",
  text: 'Thanks for using our Reddit Sentiment Analysis Tool',
  attachments:[
    {
      filename:'screenshot.png',
      path:path.join(__dirname,'../../../screenshot.png')
    }
  ]
};


async function screenShot(){

  try{

        const browser = await puppeteer.launch({headless:true});

        const context = browser.defaultBrowserContext()

        context.overridePermissions('http://localhost:3000/screenshot',['notifications'])

        const page = await browser.newPage();

         await page.goto('http://localhost:3000/screenshot');

        console.log('taking screenshot')
         
         await page.screenshot({                     
 
           path: "./screenshot.png",                   
         
           fullPage: true, 
         })

         browser.close()  
         
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