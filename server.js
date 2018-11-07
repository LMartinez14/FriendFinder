// require dependencies
let fs = require("fs")
let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");

// set up express app
let app = express();
// set up heroku port
let PORT = process.env.PORT || 3535;

app.use(express.static(path.join(__dirname, "/app/public")));

// express data parsing within the body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// routing to the routing folder with specific javascript files
require("./app/routing/apiRoutes.js")(app, path);
require("./app/routing/htmlRoutes.js")(app, path);

// initialize server to listen
app.listen(PORT, function(){
   console.log ("Finding Friendly Friends app listening on port " + PORT);
});