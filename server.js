var express = require('express');
var app = express();
var client = require('./connection.js');
var url = require('url');
var cors = require('cors');

app.use(cors());
app.options('*', cors());


app.get('/search', (req, res) => {

  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  client.search({
    index: 'movie',
    body: {
      from: 0,
      size: 10,
      query: {
        bool: {
          should: [{
              match: {
                "MovieName.exact": query.query
              }
            },
            {
              match_phrase_prefix: {
                MovieName: {
                  query: query.query
                }
              }
            },
            {
              match: {
                MovieName: {
                  query: query.query,
                  fuzziness: "AUTO",
                  prefix_length: 1
                }
              }
            }
          ]
        }
      }
    }
  }, function(error, response, status) {
    var result = '[';
    if (error) {
      console.log(error)
    } else {
      response.hits.hits.forEach(function(hit) {
        if (result != '[') {
          result += ',';
        }
        result += JSON.stringify(hit._source);
      });
      result += ']';
      res.send(JSON.parse(result));
    }
  });
});

app.get('/providers', (req, res) => {

  var url_parts = url.parse(req.url, true);
  var id = url_parts.query.id;
  var country = url_parts.query.country;

  client.search({
    index: 'monetization',
    body: {
      from: 0,
      size: 1000,
      query: {
        "bool": {
          "must": [{
              "match": {
                "country": country
              }
            },
            {
              "match": {
                "id": id
              }
            }
          ]
        }
      }
    }
  }, function(error, response, status) {
    var result = '[';
    if (error) {
      console.log(error)
    } else {
      response.hits.hits.forEach(function(hit) {
        if (result != '[') {
          result += ',';
        }
        result += JSON.stringify(hit._source);
      });
      result += ']';
      res.send(JSON.parse(result));
    }
  });
});
var server = app.listen(5000 || process.env.PORT);
console.log('Server Started!')
