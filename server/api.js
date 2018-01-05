const express = require('express');
const router = express.Router();
const client = require('./connection.js');

/*client.cluster.health({},function(err,resp,status) {  
    console.log("-- Client Health --",resp);
});*/

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/articles', (req, res) => {
    client.search({
      index: 'localworld',
      type: 'article'
    },function(error, result,status) {
        if (error){
          //response.status = 501;
          response.message = "Error"
          res.json(response);
        }
        else {
          console.log("--- Response ---");
          console.log(JSON.stringify(result.hits));
          response.data = result.hits; 
          res.json(response);    
        }
    });

    /*var articles = '[{"headline" : "Article 1" , "editor" : "rajini kumar 4343" , "body" : "<p>test</p>"},{"headline" : "Article 2" , "editor" : "http://abcd.com", "body" : "<p>test</p>"},{"headline" : "Article 3" , "editor" : "http://abcd.com", "body" : "<p>test</p>"},{"headline" : "Article 4" , "editor" : "http://abcd.com", "body" : "<p>test</p>"}]';
    response.data = JSON.parse(articles);
    console.log(response);
    res.json(response);*/

});


module.exports = router;