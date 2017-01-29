var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var db = require("./models");
var app = express();

app.use(express.static(_dirname = "/public"));
app.use(bodyParser.urlencoded({
	extended:false
}));

app.use(methodOverride("_method"));
	var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));

app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller");

app.use("/",routes);
app.use("/update", routes);
app.use("/create", routes);

var port = process.env.PORT || 3000

db.sequelize.sync().then(function(){
	app.listen(port);
	console.log("listening on port: " + port);

})
