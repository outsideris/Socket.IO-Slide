var http = require("http"),
    sys = require("sys"),
    url = require("url"),
    fs = require("fs"),
    io = require("socket.io"),
    PORT = 8124,
    HOST = null,

server = http.createServer(function (req, res) {

    //util.get('/', util.staticHandler('index.html'));
    var path = url.parse(req.url).pathname;
    sys.debug(path);
    switch (path) {
        case '/':
        case '/main.html':
            staticHandler("../main.html", req, res);
            break;
        case '/main.js':
            staticHandler("../main.js", req, res);
            break;
        case '/test.html':
            staticHandler("../test.html", req, res);
            break;
        default:
            res.writeHead(404);
            res.write("404");
            res.end();
    }
});
server.listen(PORT, HOST);


var socket = io.listen(server);

socket.on("connection", function(client) {
    sys.debug("socket connected");
    client.on("message", function(msg) {
      sys.debug("message is received : " + msg);
	  client.send({ msg: msg });
	  client.broadcast({ msg: "broadcasted" });
    });
    client.on("disconnect", function() {
      sys.debug("disconnect");
    });
});

var staticHandler = function(filename, req, res) {
	var body;
	
    fs.readFile(filename, function(err, data) {
	    if (err) {
		    sys.debug('Error loading file ' + filename);
	    } else {
	    	body = data;
	    }
        res.writeHead(200, {
			'Content-Type': 'text/html',
			'Content-Length': body.length
		});
		res.write(body);
		res.end();
	});
};

sys.debug("Server running at http://localhost:" + PORT);
