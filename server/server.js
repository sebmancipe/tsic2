require('./src/db');
const express = require('express');
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;

// Routes
const userRouter = require('./src/routes/user.router');
const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build");

app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());

  // Static files
app.use(express.static(CLIENT_BUILD_PATH));
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send("Hello World ! ");
});

app.listen(PORT, function () {
    console.log(`Server Listening on ${PORT}`);
});

// Server React Client
app.get("/", function(req, res) {
  res.sendFile(path.join(CLIENT_BUILD_PATH , "index.html"));
});