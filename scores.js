const jsonBody = require("body/json");
var scores = [{name: "Edwin", score: 50}, {name: "David", score: 39}];
const http = require('http');
const hostname = '';
const port = 3000;
var resources = {
  "/scores": "Scores"
};

function compareScores(a, b) {
  return a.score - b.score;
};

const server = http.createServer((req, res) => {
  var body;
  jsonBody(req, res, (err, body) => {
    if (req.method === "GET") {
      if (resources[req.url] === undefined) {
        res.statusCode = 404;
      }  else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/javascript');
        body = scores;
      }
    } else if(req.method === "POST") {
      res.statusCode = 201;
      scores.push(body);
      var byScore = scores.slice(0)
      byScore.sort(compareScores);
      scores = byScore.slice(-3);
    }
    res.end(JSON.stringify(scores));
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});