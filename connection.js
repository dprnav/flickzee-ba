var elasticsearch=require('elasticsearch');

const client = new elasticsearch.Client({
   hosts: [ 'http://13.233.167.54:9200/'],
   requestTimeout: 2147483647
});

module.exports = client;
