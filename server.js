const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://demo:demo123@cluster0.t5ge5m8.mongodb.net/coinflip?retryWrites=true&w=majority";
const dbName = "coinflip";

app.listen(3000, () => {
    console.log('app is running on port 3000')
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))


app.get('/', function(req, res) {
  db.collection('coinflip').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {
      coinflip: result
    })
  })
}); 

const ObjectId = require('mongodb').ObjectID;

app.post('/coinflip', (req, res) => {
 
  console.log(req.body.userChoice)

  let result
  let randomToss
  let coin = Math.floor(Math.random() * 2)
    if (coin === 1){
      randomToss = 'heads'
    }else {
      randomToss = 'tails'
    }

    if (req.body.userChoice === randomToss) {
        result = 'You guessed right!'
    } else {
      result = 'You guessed wrong!'
    }


  db.collection('coinflip').save({result: result, id: new ObjectId(), randomToss: randomToss}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/index.ejs')
  })
})


app.delete('/delete', (req, res) => {
  db.collection('coinflip').findOneAndDelete({id: ObjectId(req.body.id)}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})