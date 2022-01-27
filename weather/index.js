const http = require("http");
const fs = require("fs");
var requests = require('requests');

const homeFile = fs.readFileSync("home.html","utf-8");


const server = http.createServer((req,res)=>{
    if(req.url == "/"){
        requests(
            "https://api.openweathermap.org/data/2.5/weather?q=Surat&appid=481bc2d6e02d6095205f266f5a8240f9")

        .on('data',  (chunk) => {
            const objData = JSON.parse(chunk);
            const arrData = [objData];
            console.log(arrData[0].main.temp-273.15);
        })
        .on('end',  (err) => {

           if (err) return console.log('connection closed due to errors', err);
 
        console.log('end');
        });
    }
});
server.listen(8000, "127.0.0.1");

