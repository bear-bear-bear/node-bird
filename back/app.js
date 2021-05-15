const express = require('express');

const app = express();
const port = 3065;

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`server is listening: http://localhost:${port}`);
});
