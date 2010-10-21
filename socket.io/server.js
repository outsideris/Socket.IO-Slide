var http = require("http"),
    sys = require("sys"),
    url = require("url"),
    fs = require("fs"),
	path = require("path"),
    io = require("socket.io"),
    PORT = 8124,
    HOST = null,

server = http.createServer(function (req, res) {

    var uri = url.parse(req.url).pathname;
	
    switch (uri) {
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
			var filename = path.join(process.cwd(), "../" + uri);
			path.exists(filename, function(exists) {  
		        if(!exists) {  
					res.writeHead(404, {"Content-Type": "text/plain"});
		            res.write("404 Not Found\n");
		            res.end();
		            return;  
		        }  
		   
		        fs.readFile(filename, "binary", function(err, file) {  
		            if(err) {  
		                res.writeHead(500, {"Content-Type": "text/plain"});  
		                res.write(err + "\n");  
		                res.end();  
		                return;  
		            }  
		   
		            res.writeHead(200);  
		            res.write(file, "binary");  
		            res.end();  
		        });  
		    });
    }
});
server.listen(PORT, HOST);


var socket = io.listen(server);

socket.on("connection", function(client) {
    client.on("message", function(msg) {
      if (msg.type === "send") {
	      client.send( { "text": msg.text, "type":"send" } );
	  } else if (msg.type === "broad") {
	  	  client.broadcast( { "text": msg.text, "type":"broad" } );
	  }
    });
    client.on("disconnect", function() {
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
