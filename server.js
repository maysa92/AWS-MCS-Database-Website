const express = require('express');
const fs = require('fs');
const app = express();
const cassandra = require('cassandra-driver');
var contactPoints = ['cassandra.us-east-2.amazonaws.com:9142'];
var authProvider = new cassandra.auth.PlainTextAuthProvider('Sin-Rou_Chen-at-299196734494', 'bafkYpBEJ51qM/FOU+jrjBmNoX57l5W0hHwGOpzXTB8=')
const port = process.env.API_SERVER_PORT || 4000;
const sslOptions = {
  cert: fs.readFileSync('AmazonRootCA1.pem'),
  host: 'cassandra.us-east-1.amazonaws.com',
  rejectUnauthorized: true
};

const client = new cassandra.Client(
  {contactPoints: contactPoints, 
    authProvider: authProvider, 
    localDataCenter: 'datacenter1',
    sslOptions: sslOptions,
    keyspace: 'CSCI_541_Project'
    });

async function connecttoDb() {
  const client = new cassandra.Client({contactPoints: contactPoints, localDataCenter: 'datacenter1', keyspace: 'cars' });
  await client.connect();
  console.log('Connected to Cassandra');
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

