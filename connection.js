var elasticsearch=require('elasticsearch');

const client = new elasticsearch.Client({
   hosts: [ 'http://35.154.244.92:9200/'],
   requestTimeout: 2147483647
});

module.exports = client;
