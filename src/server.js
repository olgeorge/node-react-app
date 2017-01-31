const express = require("express");
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/api/', routes);

const clientPath = __dirname + '/client/';

app.use("/public", express.static(clientPath + 'public'));

app.get("/", (req, res) => {
  res.sendFile(clientPath + "index.html");
});

app.use("*", (req, res) => {
  res.sendFile(clientPath + "404.html");
});

app.listen(8080, () => console.log("Listening on port 8080"));
