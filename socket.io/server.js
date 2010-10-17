var http = require("http"),
    sys = require("sys"),
    io = require("socket.io"),
    PORT = 8124,
    HOST = null,

server = http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("<h1>Hello World</h1>");
    res.end();
});
server.listen(PORT, HOST);

var socket = io.listen(server);

socket.on("connect", function(client) {
    sys.debug("socket connected");
    client.on("message", function(msg) {
      sys.debug("message is received : " + msg);
    });
    client.on("disconnect", function() {
      sys.debug("disconnect");
    });
});

sys.debug("Server running at http://localhost:" + PORT);
