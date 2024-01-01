const express = require('express');
const router = express.Router()
const cors = require('cors'); 
const mariadb = require('mariadb');
const db = require('./db_routes/DBConnection'); 
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const yelp = require('yelp-fusion'); 
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const apiKey = process.env.YELP;
const client = yelp.client(apiKey);
 
const {TokenMiddleware, generateToken, removeToken} = require('./TokenMiddleware'); 

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser()); 

// send randomize restaurant for food 
router.post('/food', TokenMiddleware, (req, res) => {
  const location = req.body.location; 
  const term = req.body.term; 
  const price = req.body.price; 
  const radius = req.body.radius;   
    client.search({
        location: location,
        term : term, 
        price : price, 
        radius : parseInt(radius * 1609.34, 10), 
        open_now : true 
    }).then(response => {
        res.set('Access-Control-Allow-Methods', "GET,POST,OPTIONS,DELETE,PUT")
        res.set('Access-Control-Allow-Origin', '*'); 
        res.send(response.jsonBody.businesses);
    }).catch(e => {
        res.set('Access-Control-Allow-Origin', '*'); 
        res.status(400).send() 
    });
})

router.post('/register',  (req, res) => {
  const username = req.body.username; 
  const password = req.body.password; 
  const firstName = req.body.firstName; 
  const lastName = req.body.lastName; 
  const email = req.body.email; 
  
  // how to generate salt and hash : https://medium.com/@manishsundriyal/a-quick-way-for-hashing-passwords-using-bcrypt-with-nodejs-8464f9785b67
  bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        db.query('INSERT INTO users (user_name, user_email, salt, password) VALUES (?, ?, ?, ?)', [username, email, salt, hash]).then(({results}) => {
          console.log(username); 
          let user = {
            user_name : username, 
            user_email : email, 
            user_id : results.insertId 
          }
          
          generateToken(req, res, user); 
          res.send(user)
        })
          .catch(e => {console.log(e);res.status(400).send("E-Mail or Username Already Exists")}); 
      });
  });
});

router.get('/offline', (req, res) => {
  res.json({isOffline: true});
})

router.post('/login',  (req, res) => {
  const username = req.body.username; 
  
  db.query('SELECT * FROM users WHERE user_name=?', [username]).then(({results}) => {
    const user = results[0]; 
    console.log(user)
      if(user) {
        //  verify that we have the correct password via a comparison https://medium.com/@manishsundriyal/a-quick-way-for-hashing-passwords-using-bcrypt-with-nodejs-8464f9785b67
        bcrypt.compare(req.body.password, user.password, (err, result)  => {
          if(result){
            generateToken(req, res, user); 
            res.status(200).json({ userName : user.user_name, userEmail : user.user_email, token : res.token })
          }

          else {
            res.status(402).json({message : 'Cannot Login in'}); 
          }
        })
      }

      else {
        res.status(402).json({message : 'Cannot Login in'}); 
      }
  });
});

router.get('/logout', (req, res) => {
  removeToken(req, res); 
  res.status(200).json({ message: 'Logged out successfully' });
});

//adding to a user's favorites
router.post("/add",  TokenMiddleware, async (req, res) => {
  console.log("hi")
  console.log(req.body); 
  db.query('INSERT INTO user_fav( res_link, res_image, res_cusine, res_name, res_price, res_address, res_rating, res_review_count,fav_user_id, res_latitude, res_longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
    req.body.link, req.body.image, req.body.cusine, req.body.name, req.body.price, req.body.address, req.body.rating, req.body.review_count, req.user.userId, req.body.latitude, req.body.longitude 
  ])
     .then(() => res.status(200).send("Added favorited"))
     .catch(e => {console.log(e);res.status(400).send("Cannot add favorite due to being a duplicate")})
}); 


router.get("/favorites", TokenMiddleware,  async (req, res) => {
  const id = req.user.userId;
  db.query('SELECT * FROM user_fav WHERE fav_user_id=?', [id]).then(({results}) => {
    res.status(200).json(results); 
  }).catch(e => {res.status(400).send("Can't get favorites")}); 
});

//removing a user's favorites
router.post("/remove",  TokenMiddleware, async (req, res) => {
 db.query('DELETE FROM user_fav WHERE fav_user_id=? AND res_link=?', [req.user.userId, req.body.link]).then(
  res.status(200).send("Deleted favorited") 
 )
 .catch(e => {res.status(400).send("Can't remove favorite")}); 
});

module.exports = router;