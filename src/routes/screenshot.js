const express = require('express')
const router = new express.Router()

const getScreenshot = (req,res)=>{  

    const {subreddits, average} = results

    res.render('results',{layout:false,stringifiedSubreddits:JSON.stringify(subreddits),subreddits:subreddits,average})
     
};

router.get('/screenshot',getScreenshot)

module.exports=router
