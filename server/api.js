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
  let searchString = req.query.name;
  let queryStart = req.query.pageNumber || 1;
  let queryLimit = req.query.limit || 20;
  let publicationId = req.query.publicationId || "276494";
  let MaxTotalRecords = 500;

  var formatQuery = '';
  if (searchString && publicationId) {
    let queryStartNo = (queryStart - 1) * queryLimit;
    /*formatQuery = {
      "index": 'localworld',
      "type": 'article',
      "body": {
        "query": {
          "bool": {
            "must": [{
              "match": {
                "title": searchString
              }
            }, {
              "regexp": {
                "site_id": ".*276494.*"
              }
            }]
          }
        }
      },
      "from": queryStartNo,
      "size": queryLimit
    }*/

    formatQuery = {
      "index": 'localworld',
      "type": 'article',
      "body": {
        "query": {
          "bool": {
            "must": [{
              "multi_match": {
                "query": searchString,
                "type": "most_fields",
                "operator": "and",
                "fields": ["title"]
              }
            }],
            "filter": {
              "term": {
                "status_id": 1
              }
            }
          }
        }
      },
      "from": queryStartNo,
      "size": queryLimit
    }

  } else {
    formatQuery = {
      index: 'localworld',
      type: 'article',
    }
  }

  console.log(JSON.stringify(formatQuery));

  client.search(formatQuery, function(error, result, status) {
    if (error) {
      response.message = "Error"
      console.log("--- Error ---");
      console.log(error);
      res.json(response);
    } else {
      console.log("--- Response ---");
      //console.log(JSON.stringify(result.hits));
      response.data = result.hits;
      if (result.hits.total > MaxTotalRecords) {
        response.data.total = MaxTotalRecords
      } else {
        response.data.total = result.hits.total;
      }
      console.log(result.hits.total);
      res.json(response);
    }
  });

  /*var articles = '[{"headline" : "Article 1" , "editor" : "rajini kumar 4343" , "body" : "<p>test</p>"},{"headline" : "Article 2" , "editor" : "http://abcd.com", "body" : "<p>test</p>"},{"headline" : "Article 3" , "editor" : "http://abcd.com", "body" : "<p>test</p>"},{"headline" : "Article 4" , "editor" : "http://abcd.com", "body" : "<p>test</p>"}]';
  response.data = JSON.parse(articles);
  console.log(response);
  res.json(response);*/

});


module.exports = router;