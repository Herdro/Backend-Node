const http = require("http");
const moment = require("moment");
const server = http.createServer();

server.on("request", (req, res) => {
    if (req.method === "POST" && req.url == "/echo") {
        let body = [];
        req
            .on("data", chunk => {
                body.push(chunk);
            })
            .on("end", () => {
                res.writeHead(200, { "Content-Type": "text/plain"});
                body = Buffer.concat(body).toString();
                if (!moment(body, "YYYY-MM-DD").isValid()) {
                    res.end("no es un formato valido. Formato esperado YYYY-MM-DD");
                  } else {
                    var weekDayName = moment(body).format("dddd");
          
                    res.end("Tu dia de Nacimiento es:" + weekDayName);
                  }
                res.end(body);
            });
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(8001);
console.log("Servidor en la url http://localhost:8001");