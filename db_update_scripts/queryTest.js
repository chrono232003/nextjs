var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");


    const decodedTitle = "26940517"
    dbo.collection("coin").find({"id": decodedTitle}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        //res.json(result);
    });
});