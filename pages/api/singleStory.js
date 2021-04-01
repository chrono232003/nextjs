export default async (req, res) => {
  const { title } = req.query
  const decodedTitle = decodeURIComponent(title)
  var mongo = require('mongodb');
  
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("coin").find({"title": decodedTitle}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      res.json(result);
    });
  });
  }