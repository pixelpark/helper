var app, express;

express = require("express");

port = 8070;

redis = require('redis');
client = redis.createClient();

client.on("error", function (err) {
    console.log("error event - " + client.host + ":" + client.port + " - " + err);
});

app = express();
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
  next();

});
app.use(express["static"](__dirname));

server = require('http').createServer(app).listen(port);

app.get('/users.json', function(req, res){
  client.keys("user:*", function (err, replies) {
      if (err) {  return console.error("error response - " + err); }

      console.log(replies.length + " replies:");
      var users = [];
      replies.forEach(function (reply, i) {
          users.push(reply.split(':')[1])
          console.log("    " + i + ": " + reply);
      });
      res.send(JSON.stringify(users));
  });
});


console.log('Server running on port ' + port);
