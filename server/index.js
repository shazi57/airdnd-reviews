const db = require('../database/index.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { singleReviewGenerator } = require('../database/reviewGenerator');

const PORT = 3004;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(`${__dirname}/../client/dist`));

app.get('/reviews/:room_id', (req, res) => {
  const target = req.params.room_id;
  db.query(`SELECT * FROM reviews WHERE room_id=${target}`)
    .then((result) => {
      const data = result.rows;
      console.log('am i working')
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    })
});

app.listen(PORT, ()=>{
  console.log("Server is now listening on port:", PORT);
  console.log(`Visit website at http://localhost:${PORT}/:id=1`);
});