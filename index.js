const express = require("express");
let app = express();
const fs = require('fs')
var publicText = ('./public.txt')
const secretKey = "EC";


//Skicka text från fil public.txt till localhost:
app.get("/", (req, res) => {
    fs.readFile(publicText, "utf-8", function (err, data) {
        if (err) {
            res.send("No text!");
        }
        else {
            res.write(data);
        }
        res.end();
    });
});


//Öppna secret.html om rätt "secretKey" står i url:en
app.get('/secret', (req, res) => {
    let urlKey = req.query.key;

    if (urlKey == secretKey) {
        fs.readFile('secret.html', function (error, data) {
            if (error) {
                res.write("secret.html was not found!");
                res.end();
            } else {
                res.write(data);
                res.end();
            }
        });
    }
    else {
        res.write("Wrong key. Try again.");
        res.end();
    }
});

app.listen(3000, () => {
    console.log("Servern är igång");
});




