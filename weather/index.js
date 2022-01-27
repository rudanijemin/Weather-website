const http = require("http");
const fs = require("fs");
var requests = require('requests');

const homeFile = fs.readFileSync("home.html","utf-8");

const replaceVal = (tempVal,orgVal) => {
    let temperature = tempVal.replace("{%tempval%}",orgVal.main.temp-273);
    temperature = temperature.replace("{%tempmin%}",orgVal.main.temp_min-273);
    temperature = temperature.replace("{%tempmax%}",orgVal.main.temp_max-273);
    temperature = temperature.replace("{%location%}",orgVal.name);
    temperature = temperature.replace("{%country%}",orgVal.sys.country);
    temperature = temperature.replace("{%tempStatus%}",orgVal.weather[0].main);
    return temperature;
}; 


const server = http.createServer((req,res)=>{
    if(req.url == "/"){
        requests(
            "https://api.openweathermap.org/data/2.5/weather?q=Surat&appid=481bc2d6e02d6095205f266f5a8240f9")

        .on('data',  (chunk) => {
            const objData = JSON.parse(chunk);
            const arrData = [objData];
            //console.log(arrData[0].main.temp-273.15);
            const realTimeDate = arrData.map(val =>replaceVal(homeFile,val)).join("");  //join arr formate ne string ma convert
            res.write(realTimeDate);
            //console.log(realTimeDate);
                //  replaceVal(homeFile,val); 
    
        })
        .on('end',  (err) => {

           if (err) return console.log('connection closed due to errors', err);
           res.end();
        });
    }
});
server.listen(8000, "127.0.0.1");

