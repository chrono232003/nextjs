function storeInCollection(query) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        //DROP
        // dbo.collection("coin").drop(function(err, delOK) {
        //     if (err) throw err;
        //     if (delOK) console.log("Collection deleted");
        //     db.close();
        //   });

        //CREATE
        // dbo.createCollection("coin", function(err, res) {
        //     if (err) throw err;
        //     console.log("Collection created!");
        //     db.close();
        //   });
        // dbo.collection('coin').createIndex({"id":1 }, { unique:true })

        //INSERT
        // dbo.collection("testing2").insertMany(query, {ordered: false }, function(err, res) {
        //     if (err) throw err;
        // });




        dbo.collection("coin").insertMany(query, {ordered: false}).then(function(err, res) {
            if(err) {console.log(err)}
        }).catch((err) => {
            console.log(err)
        })


        //QUERY
        // var query = {guid: "https://ambcrypto.com/?p=150557"};
        // dbo.collection("coin").find({}).toArray(function(err, result) {
        //     if (err) throw err;
        //     console.log(result);
        //     db.close();
        // });
    });
}


const fetch = require('node-fetch');
var url = 'https://min-api.cryptocompare.com/data/v2/news/'
fetch(url)
    .then(res => res.json())
    .then(data => storeInCollection(data.Data))

//storeInCollection("")