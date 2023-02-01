
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req, res){
    const Firstname = req.body.Fname;
    const lastname = req.body.Lastname;
    const email = req.body.Email;

    const data = {
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME: firstname,
                LNAME: lastname
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/dada1e9b77";
    const options = {
        method: "POST",
        auth: "kishor:32678f1f376e0063040e6e1ace400229-us21"
    }

    const request = https.request(url, Options, function(response){

           if(response.statusCode === 200){
               res.sendFile(__dirname + "/success.html");
             } 
              else{
               res.sendFile(__dirname + "/failure.html");
            } else{
                if(response.statusCode ===200){
                    res.sendFile(__dirname + "/success.html");
                } else{
                    res.sendFile(__dirname + "/failure");
                }
            }
         
    });
   
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port");
});


// 32678f1f376e0063040e6e1ace400229-us21
// dada1e9b77.