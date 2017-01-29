var express = require("express");
var router = express.Router();
var db = require("../models/");

router.get("/", function(req, res){
	res.redirect("/burgers");
});

router.get("/burgers", function(req, res){
  db.Burger.findAll({}).then(function(burger_data) {
    res.json(burger_data);
    console.log(burger_data);
  });
});


//my post route
router.post("/burgers/create", function(req,res){
  db.Burger.create({
    burger_name: req.body.burger_name,
  }).then(function(newburger) {
    res.json(newburger);
  });
});



//my put route
router.put("/burgers/update", function(req,res){
	  db.Burger.find({
    where: {
      id: req.params.id
    }
  }).then(function(updateburger) {
    if(updateburger){
      updateburger.updateAttributes({
        burger_name: req.body.burger_name,
      }).then(function(updateburger) {
        res.send(updateburger);
      });
    }
  });
});

//my delete route
router.delete('/burgers/:id', function(req, res) {
  db.Burger.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(burger) {
    res.json(burger);
  });
});

module.exports = router;