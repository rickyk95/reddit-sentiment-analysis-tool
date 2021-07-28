const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function screenShot(){

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
    

}

module.exports={

    screenShot
}