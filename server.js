const express = require('express');
const fs = require('fs');
const app = express();
const cassandra = require('cassandra-driver');
var contactPoints = ['cassandra.us-east-2.amazonaws.com:9142'];
var authProvider = new cassandra.auth.PlainTextAuthProvider('Sin-Rou_Chen-at-299196734494', 'bafkYpBEJ51qM/FOU+jrjBmNoX57l5W0hHwGOpzXTB8=')
const port = 4000;
const sslOptions = {
  cert: fs.readFileSync('AmazonRootCA1.pem'),
  host: 'cassandra.us-east-2.amazonaws.com',
  rejectUnauthorized: true
};

const client = new cassandra.Client({
  contactPoints: contactPoints, 
  authProvider: authProvider, 
  localDataCenter: 'dc1',
  sslOptions: sslOptions,});

async function connecttoDb() {
  const client = new cassandra.Client({
    contactPoints: contactPoints, 
    authProvider: authProvider, 
    localDataCenter: 'dc1',
    sslOptions: sslOptions,});
  await client.connect();
  console.log('Connected to MCS');
}

(async function start() {
  try {
    await connecttoDb();
    app.listen(port, () =>{
      console.log(`Server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());


var query1 = 'SELECT * FROM "CSCI_541_Project".customers';

client.execute(query1, [], (err, result) => {
  if(err) {
    console.log('err: $' + JSON.stringify(err))
  } else {
    console.log('result: $' + JSON.stringify(result))
  }
  process.exit();
});