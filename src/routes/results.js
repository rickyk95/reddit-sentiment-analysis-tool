const express = require('express')
const router = new express.Router()
const { screenShot } = require('../public/js/puppeteerFunctions/screenshot')
const bodyParser = require('body-parser')


router.use(bodyParser.urlencoded({ extended: true }));
// router.get('/results',(req,res)=>{ 
    
//     console.log(req.session.email,'SESSION email')
//     const {subreddits, average} = results

//     res.render('results',{layout:false,stringifiedSubreddits:JSON.stringify(subreddits),subreddits:subreddits,average})
    
//      screenShot(req.session.email)
// })




module.exports=router
