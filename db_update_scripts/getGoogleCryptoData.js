const fetch = require('node-fetch');

let getDataFromAPI = (coin, sym) => {

    var arr =[]

    let todayDate = new Date().toISOString().split('T')[0];
    const apiKey = 'a7d2b8be849942a08d97c6e96de5a74c';
    const url = `https://newsapi.org/v2/everything?q=${coin}&from=${todayDate}&language=en&apiKey=${apiKey}`;
    fetch(url)
        .then(res => res.json())
        //.then(data => storeInCollection(data.Data))
        .then(data => {
            for (const story in data['articles']) {

                let jsonObj = {}
                let item = data['articles'][story]
                if (item['title'] && item['description'] && item['url'] && item['urlToImage']) {

                    let itemSourceID = (item['source']['id'] ? item['source']['id']  : "news-api") + item['publishedAt'];

                    jsonObj['id'] = itemSourceID;
                    jsonObj['guid'] = itemSourceID;
                    jsonObj['published_on'] = formatDate(item['publishedAt']);
                    jsonObj['imageurl'] = item['urlToImage'];
                    jsonObj['title'] = item['title'];
                    jsonObj['url'] = item['url'];
                    jsonObj['source'] = item['source']['id'] ? item['source']['id']  : "News API";
                    jsonObj['body'] = item['description'];
                    jsonObj['tags'] = sym;
                    jsonObj['categories'] = sym;
                    jsonObj['upvotes'] = '0';
                    jsonObj['downvotes'] = '0';
                    jsonObj['lang'] = "EN"
                    jsonObj['source_info'] = {
                        name: item['source']['name'] ? item['source']['name']  : "News API",
                        lang: 'EN'
                      }
                    jsonObj['api'] = "News API"
                    arr.push(jsonObj)
                }
            }
            //store in MongoDB
            //console.log(JSON.parse(JSON.stringify(arr)))
            storeInCollection(JSON.parse(JSON.stringify(arr)))
            
        })
}

//pass in coin
getDataFromAPI("bitcoin", "BTC");

let generateID = () => {
    return Math.floor(Math.random() * 10000000000);
}

let formatDate = (date) => {

    var Month_name = new Array("Jan", "Feb", "Mar","Apr", "May", "June", "July", "Aug", "Sept","Oct", "Nov", "Dec");
    var weekday_name = new Array ("Sun", "Mon" ,"Tue" ,"Wed" ,"Thu" ,"Fri" ,"Sat");
    var newDate = new Date(date)
    var current_day = newDate.getDate();
    var current_month = newDate.getMonth();
    var current_year = newDate.getFullYear();
     
    let formattedDate = weekday_name[current_day] + " " + Month_name[current_month] + " " + current_day+ " " + current_year;
    return formattedDate;
}


/*
new newsAPI format
{
         "source":[
            "Object"
         ],
         "author":"Joseph Green",
         "title":"Break into FinTech with this beginner-friendly trading bundle",
         "description":"TL;DR: The QuantInsti: Quantitative Trading for Beginners Bundle is on sale for £36.32 as of April 3, saving you 90% on list price.\n""+""\n""+""Whether you're purchasing drinks at the bar or managing your finances, FinTech is all around you. Short for financial technolo…",
         "url":"https://mashable.com/uk/shopping/april-3-fintech-trading-guide/",
         "urlToImage":"https://mondrian.mashable.com/2021%252F04%252F03%252F2a%252Ff1ba6eb046b247a3a223eea159ed5cef.e0dd4.jpg%252F1200x630.jpg?signature=UOm2c-4BpJMsoICKuoSkwOrf1MQ=",
         "publishedAt":"2021-04-03T04:00:00Z",
         "content":"TL;DR: The QuantInsti: Quantitative Trading for Beginners Bundle is on sale for £36.32 as of April 3, saving you 90% on list price.\r\n""+""Whether you're purchasing drinks at the bar or managing your finan… [+2288 chars]"
      },



      //original API correct format for app
      {
    _id: 6063bc63f9984b3d648f0815,
    id: '26938944',
    guid: 'https://cryptopotato.com/?p=111253',
    published_on: 1617128668,
    imageurl: 'https://images.cryptocompare.com/news/default/cryptopotato.png',
    title: 'R3’s Blockchain Network Corda to Use XDC as Settlement Coin',
    url: 'https://cryptopotato.com/r3s-blockchain-network-corda-to-use-xdc-as-settlement-coin/',
    source: 'cryptopotato',
    body: 'Corda, the blockchain-based platform for institutions operated by R3, to interoperate with DLT and legacy systems through a Corda-XinFin bridge.',
    tags: 'AA News|BTCEUR|BTCGBP|BTCUSD|BTCUSDT|Crypto News|ETHBTC|ETHUSD|Blockchain',
    categories: 'Blockchain',
    upvotes: '0',
    downvotes: '0',
    lang: 'EN',
    source_info: {
      name: 'Crypto Potato',
      lang: 'EN',
      img: 'https://images.cryptocompare.com/news/default/cryptopotato.png'
    }
  },
*/


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