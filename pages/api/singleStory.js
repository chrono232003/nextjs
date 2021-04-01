export default async (req, res) => {
  const { id } = req.query
  var mongo = require('mongodb');
  
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("coin").find({"id": id}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      res.json(result);
    });
  });
  }