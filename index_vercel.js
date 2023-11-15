var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
  port = process.env.PORT || 8010;
console.log("Server launched => 127.0.0.1:" + port);

const directoryPath = path.join(__dirname, 'movelists');

http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname
    , filename =decodeURI( path.join(process.cwd(), uri));

  if (fs.statSync(filename).isDirectory()){ filename += '/QrAndQRACOMBINED.html';} 

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
			  console.log(err); 
        return;
      }

      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(file, "binary");
	  console.log(filename + " 200 ok!")
      response.end();
    });
 }).listen(parseInt(port, 10));