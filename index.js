const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const routes = require("./src/routes/router");

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Backend run port ${port}`)
})