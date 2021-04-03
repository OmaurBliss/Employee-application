
// Dependencies
const fs = require("fs");

// imported 'uuid' npm package for unique id
const { v4: uuidv4 } = require('uuid');

// ROUTING
module.exports = function (app) {

    // API GET Request
    app.get("/api/notes", (request, response) => {
        
        console.log("\n\nExecuting GET notes request");

        // Read 'db.json' file 
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        
        console.log("\nGET request - Returning notes data: " + JSON.stringify(data));
        
        // Send read data to response of 'GET' request
        response.json(data);
    });


    // API POST Request
    app.post("/api/notes", (request, response) => {

       
        const newNote = request.body;
        
        console.log("\n\nPOST request - New Note : " + JSON.stringify(newNote));

        // Assigned unique id obtained from 'uuid' package
        newNote.id = uuidv4();

        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
        data.push(newNote);

        fs.writeFileSync('./db/db.json', JSON.stringify(data));
        
        console.log("\nSuccessfully added new note to 'db.json' file!");

        // Send response
        response.json(data);
    });


    // API DELETE request
    app.delete("/api/notes/:id", (request, response) => {

        let noteId = request.params.id.toString();
        
        console.log(`\n\nDELETE note request for noteId: ${noteId}`);

        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        const newData = data.filter( note => note.id.toString() !== noteId );

    
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
        
        console.log(`\nSuccessfully deleted note with id : ${noteId}`);

        response.json(newData);
    });
};







 

