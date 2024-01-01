const express = require('express');
const apis = require('./apis')
const app = express();

let PORT = process.env.PORT;
if (!PORT ){
  PORT = 3000
}
app.use(express.json());
app.use('/', apis)

// Register service worker
app.get('./cache/cache.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cache.js'));
});

// As our server to listen for incoming connections
app.listen(PORT, () => {
  console.clear();
  console.log(`Server listening on port: ${PORT}`)
});
