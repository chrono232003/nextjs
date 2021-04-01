export default async (req, res) => {
    const { name } = req.query
    var mongo = require('mongodb');
    
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("coin").find({"source_info.name": name}).sort({ _id: -1 }).limit(16).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        res.json(result);
      });
    });
    }