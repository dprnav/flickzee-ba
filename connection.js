var elasticsearch=require('elasticsearch');

const client = new elasticsearch.Client({
   hosts: [ 'https://elastic:FM6HSansztuP7mXNGlnnE4FN@f03b7e92942440eeabecfbb4622e9881.us-east-1.aws.found.io:9243'],
   requestTimeout: 2147483647
});

module.exports = client;
