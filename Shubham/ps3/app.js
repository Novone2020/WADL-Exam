const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  console.log('Hello from inside of the get method of server');
  res.send([]);
});

app.post('/', (req, res) => {
  console.log('Hello from inside of the post method of server');
  console.log(req.body);
  res.status(200).json(req.body);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
