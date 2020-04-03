var express = require('express');
var router = express.Router();
var fs = require('fs');

var cassandra = require('cassandra-driver');
var contactPoints = ['cassandra.us-east-2.amazonaws.com:9142'];
var authProvider = new cassandra.auth.PlainTextAuthProvider('Sin-Rou_Chen-at-299196734494', 'bafkYpBEJ51qM/FOU+jrjBmNoX57l5W0hHwGOpzXTB8=')
//var port = 4001;
var app = express();

var sslOptions = {
  cert: fs.readFileSync('AmazonRootCA1.pem'),
  host: 'cassandra.us-east-2.amazonaws.com',
  rejectUnauthorized: true
};

var client = new cassandra.Client({
  contactPoints: contactPoints, 
  authProvider: authProvider, 
  localDataCenter: 'us-east-2',
  sslOptions: sslOptions,});
/*
async function connecttoDb() {
  var client = new cassandra.Client({
    contactPoints: contactPoints, 
    authProvider: authProvider, 
    localDataCenter: 'us-east-2',
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
*/
//var getAllSuppliers = 'SELECT supplier_id,supplier_address,supplier_name FROM "CSCI_541_Project".suppliers limit 1';
var queryAllSuppliersRecord = 'SELECT * FROM "CSCI_541_Project"."Retail_Items" where item_suppiler= ? allow filtering';

/* GET home page. */
router.get('/:item_suppiler', function(req, res, next) {
  client.execute(queryAllSuppliersRecord,[req.params.item_suppiler],function(err,result){
      if(err){
            res.status(404).send({msg: err});
      }
      else{
        console.log('result: $' + JSON.stringify(result.rows))
        res.render('query',{ title:'Query suppliers',
             datas: result.rows
        });
      }
  });
});

module.exports = router;
