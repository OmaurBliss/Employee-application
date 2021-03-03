
var fs = require ("fs");

//Special place to store data
var storeData = require("../db/db.json");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(storeData);
  });

  // var newStore = {
  //     storeID: $("#storeID").val().trim(),
  //     storeName: $("#storeName").val().trim(),
  //     storeDescription: $("#storeDescription").val().trim(),
  //     status: $("#status").val().trim()
  // };

  app.post("/notes", function (req, res) {
    storeData.push(req.body);
    
    fs.readFile('/Users/joe/test.txt', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(data)
      })
    //use fs to read the file
    //push new note object to the data which got returned 
    //use fs.writeFile to write new data to db.json

    res.json(true);
  });

  // var storeUpdate = {
  //     storeID: storeID,
  //     status: status
  // };

  app.post("/api/storeupdate", function (req, res) {
    var storeUpdate = req.body;
    //we need to get the correct object
    for (var i = 0; i < storeData.length; i++) {
      console.log(storeData[i].storeID, storeUpdate.storeID);
      if (storeData[i].storeID == storeUpdate.storeID) {
        storeData[i].status = storeData[i].status === "open" ? "closed" : "open";

        break; //Stop this loop, we found it!
      }
    }

    res.json(true);
  });
};
