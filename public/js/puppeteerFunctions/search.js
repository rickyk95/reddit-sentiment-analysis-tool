
const { scoreThreads } = require('./scoreThreads.js')
const { sa } = require('../sentiment.js')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function search(url){

    try{
            const browser = await puppeteer.launch({headless:true});
        
            const context = browser.defaultBrowserContext()

            context.overridePermissions(url,['notifications'])

            const page = await browser.newPage();

            await page.setDefaultNavigationTimeout(0)

            await page.goto(url);

            await page.waitFor(1000)

            await page.exposeFunction('sa',sa)
            await page.exposeFunction('scoreThreads',scoreThreads)

            const threadTopics = await page.evaluate(scoreThreads)


            //console.log('time', threadTopics)

            await browser.close()

            return threadTopics



        }catch(e){

            console.log(e)
        }

}

module.exports={

    search
}
