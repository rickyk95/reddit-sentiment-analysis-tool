const scoreThreads = async function (){
    
    const threadList = document.querySelectorAll('._eYtD2XCVieq6emjKBH3m');
    let sum = 0;
    let subreddits = [];

     for(var i = 0; i < threadList.length;i++){

        let topic = threadList[i].innerHTML
        let result = await sa(topic)
        let score = result.score
        sum+=score
        let obj = {};
        obj['topic'] = topic;
        obj['score'] = score
        subreddits.push(obj) 
    }  

    const average = (sum/threadList.length).toFixed(2)

    return {subreddits, average}
  
};

module.exports = {
    
    scoreThreads
}
