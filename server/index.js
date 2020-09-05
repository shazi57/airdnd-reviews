require('newrelic');
const db = require('../database/index.js');
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.static(`${__dirname}/../client/dist`));

app.get('/reviews/:room_id', (req, res) => {
  const target = req.params.room_id;
  db.query(`EXECUTE readreview(${target})`)
    .then((result) => {
      const data = result.rows;
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