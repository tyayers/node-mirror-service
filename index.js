const express = require('express');
const app = express();
app.use(express.json());
const port = 8080;

app.post('/*', (req, res) => {
  console.log(req.body);
  res.send(JSON.stringify(req.body, null, 2));
});

app.listen(port, () => {
  console.log(`Mirror app listening on port ${port}`)
});