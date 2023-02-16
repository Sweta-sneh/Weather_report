const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
 res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){

   const query = req.body.cityName;
   const apikey= "e9d219b59522217f0a0dd0f2069ba4f8";
   const unit = "metric";
   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apikey + "&units="+ unit;
    https.get(url,function(response){
     console.log(response);
     response.on("data",function(data){
     const wedata=  JSON.parse(data);
     const temp = wedata.main.temp;
     const desc = wedata.weather[0].description;
     const icon= wedata.weather[0].icon;
     const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";

     res.write("<h1>The temperature in" +query+ " is " + temp + " degree </h1>");
     res.write("<p>The weather in "+ query + " is "+ desc + "<p>")
     res.write("<img src=" + imageURL+ ">");

     res.send();
     })
   });

});

app.listen(3000);
