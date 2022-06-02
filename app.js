const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");
const { options } = require("request");
const { error } = require("console");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.post("/", function(req, res){
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email; 
    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname,
                }
            }
        ]
    }; 

    const jsonData = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/1cbf930aa6";
    const options = {
        method: "POST",
        auth:"Timi1:2b1813a72279ea1b77b719ddd02378fd-us9"
    }

    const request = https.request(url, options, function(response){
     if (response.statusCode === 200){
         res.sendFile(__dirname + "/success.html");
     }else {
         res.sendFile(__dirname + "/failed.html");
     }

     response.on("data", function(data){
         console.log(JSON.parse(data)); 
     });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failed", function(req, res){
    res.redirect("/")
});


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});



app.listen(process.env.PORT || 3000, function() {
    console.log("server has started");
});
// 2b1813a72279ea1b77b719ddd02378fd-us9
// audience id 
// 