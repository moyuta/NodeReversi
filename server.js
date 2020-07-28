let http = require("https");
let url = require("url");
let fs = require("fs");
let app = require("http").createServer(handler);
const Logic = require("./logic.js");

app.listen(process.env.PORT || 3000);
console.log("server  start!");

function handler(req, res) {
  let q = url.parse(req.url, true);
  if (req.method == "POST") {
    switch (q.pathname) {
      case "/first":
        req.on("data", function (chunk) {
          let logic = new Logic();
          let ban = logic.first();
          res.end(JSON.stringify(ban));
        });
        break;
      case "/click":
        let dd = "";
        req.on("data", function (chunk) {
          dd += chunk;
          let jsondata = JSON.parse(dd);
          let logic2 = new Logic();
          let ban2 = logic2.click(jsondata.x, jsondata.y);
          res.end(JSON.stringify(ban2));
        });
        break;
      default:
        return res.end("Error");
        break;
    }
  } else {
    switch (q.pathname) {
      case "/":
        fs.readFile("./frontend/osero.html", "UTF-8", function (err, data) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        });
        break;

      case "/osero.js":
        fs.readFile("./frontend/osero.js", "UTF-8", function (err, data) {
          res.writeHead(200, { "Content-Type": "text/javascript" });
          res.end(data, "utf-8");
        });
        break;

      case "/osero.css":
        fs.readFile("./frontend/osero.css", "UTF-8", function (err, data) {
          res.writeHead(200, { "Content-Type": "text/css" });
          res.end(data);
        });
        break;

      default:
        res.writeHead(500);
        return res.end("Error");
        break;
    }
  }
}
