const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {


    const msg = `New user: ${new Date()} | IP Address: ${req.socket.remoteAddress}\n`;


    fs.appendFile("./log.txt", msg, (err) => {
        if (err) console.log(err);
    });

    console.log(req.url);

    let fileName = "";

    switch (req.url) {
        case `/`:
            fileName = "index.html";
            break;
        case `/about`:
            fileName = "about.html";
            break;
        case `/contact`:
            fileName = "contact.html";
            break;
             case `/services`:
            fileName = "services.html";
            break;
        default:
            fileName = "notfound.html";

    }

    fs.readFile(fileName, (err, data) => {
        if (err) {
            console.log("Error :", err);

        }
        else 
        {
           res.end (data);
            
        }
    });

    // res.end("Server working!");
});

server.listen(12000, (err) => {
    if (err) {
        console.log("Server is not started!", err);
        return;
    }

    console.log("Server is started on port 12000");
});
