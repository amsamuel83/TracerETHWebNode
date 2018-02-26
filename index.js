var Web3        = require('web3'),
    contract    = require("truffle-contract"),
    path        = require('path')
    Tracer    = require(path.join(__dirname, 'build/contracts/Tracer.json'));

var provider    = new Web3.providers.HttpProvider("http://localhost:7545"),
    filePath    = path.join(__dirname, 'build/contracts/Tracer.json');

var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

var account;
var accounts;

var TracerContract = contract(Tracer);
TracerContract.setProvider(provider);

function getethacct () {
      web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        console.log("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      routes(app, TracerContract, account);
    });
};

function startapp () {
  app.listen(3000, function () {
  console.log('Tracer app listening on port 3000.');
  getethacct();
});
};

var express = require('express');
var routes = require("./routes/routes.js");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

startapp();
