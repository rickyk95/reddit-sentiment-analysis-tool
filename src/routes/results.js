const express = require('express')
const router = new express.Router()
const { screenShot } = require('../public/js/puppeteerFunctions/screenshot')

const getResults = (req,res)=>{  

    const {subreddits, average} = results

    res.render('results',{layout:false,stringifiedSubreddits:JSON.stringify(subreddits),subreddits:subreddits,average})
    
     screenShot()
};

router.get('/results',getResults)




module.exports=router
