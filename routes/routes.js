var appRouter = function (app, TracerContract, account) {

  //console.log("1");
  //console.log(account);
  //console.log("2");
  var retdata;

  app.get("/", function(req, res) {
    TracerContract.deployed().then(function(instance) {
      var metaevent = instance.allEvents({fromBlock: 0, toBlock: 'latest'});
        metaevent.get(function(err, ret){
          if (!err)
            {
              console.log('Woot');
              console.log(ret);
              ret.forEach(function(ret){
                console.log("Loop");
                console.log(ret.args);
              });
            } else {
                console.log('Aww');
                console.log(err);
            }
            retdata = ret;
            //console.log("Ret1");
            //console.log(retdata);
            res.status(200).send(retdata);
        })
      })
  });

  app.get("/:serial", function(req, res) {
    //console.log("getserial");
    var serial = req.params.serial;
    //console.log(serial) ;
    TracerContract.deployed().then(function(instance) {
      var metaevent = instance.MetaLogged({serial: serial}, {fromBlock: 0, toBlock: 'latest'});
        metaevent.get(function(err, ret){
          if (!err)
            {
              console.log('Woot');
              console.log(ret);
              ret.forEach(function(ret){
                console.log("Loop");
                console.log(ret.args);
              });
            } else {
                console.log('Aww');
                console.log(err);
            }
            retdata = ret;
            //console.log("Ret1");
            //console.log(retdata);
            res.status(200).send(retdata);
        })
      })
  });

  app.post("/", function(req, res){
    TracerContract.deployed().then(function(instance) {
      console.log("Pre post");

      var serial = req.body.serial;
      var temp = req.body.temp;
      var datestr = "01/01/2018";

      console.log(serial);
      console.log(temp);
      console.log(datestr);
      console.log(account);

      instance.TagMeta(serial, datestr, temp, {from: account});
    }).then(function(result) {
        res.status(200).send("Success.");
    }, function(error) {
        res.status(500).send("Error writing.");
    });
  });
}

module.exports = appRouter;
