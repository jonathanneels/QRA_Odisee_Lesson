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

var feedbackUrl = req.url;
   if (feedbackUrl.trim() === '/') { 
       //  res.writeHead(200, {'Content-Type': 'text/html' , 'Accept-Ranges': 'bytes',  'Cache-Control': 'no-cache'});
                   //       fs.createReadStream('iframe.html').pipe(res);//  fs.createReadStream('default_arjs_test.html').pipe(res); 
						  
						   	fs.readFile(__dirname + "/iframe.html", function (err,data) {     
    res.writeHead(200);
    res.end(data);
  }); 

    }
			else  if	(feedbackUrl.trim().startsWith('/combine') )   {
  	fs.readFile(__dirname + "/QrAndQRACOMBINED.html", function (err,data) {     
    res.writeHead(200);
    res.end(data);
  }); 
}
		else  if	(feedbackUrl.trim().startsWith('/read')  ||  feedbackUrl.trim() ==('/qr') )   {
	   //res.writeHead(200, {'Content-Type': 'text/html', 'Accept-Ranges': 'bytes',  'Cache-Control': 'no-cache'});
       //       fs.createReadStream('readQrA.html').pipe(res);
 	fs.readFile(__dirname + "/readQrA.html", function (err,data) {     
    res.writeHead(200);
    res.end(data);
  }); 

	}
	else  if	(feedbackUrl.trim().startsWith('/iframe')  )   {
	   res.writeHead(200, {'Content-Type': 'text/html', 'Accept-Ranges': 'bytes',  'Cache-Control': 'no-cache'});
              fs.createReadStream('iframe.html').pipe(res)
	}
	else  if	(feedbackUrl.trim().startsWith('/noborderframe')  )   {
	   res.writeHead(200, {'Content-Type': 'text/html', 'Accept-Ranges': 'bytes',  'Cache-Control': 'no-cache'});
	   var htmlPage =   fs.createReadStream('iframe.html');  
      getStream(htmlPage).then(r=>  res.end(r));//+"<label id='hideborder'> true </label>"));
	}
else  if	(feedbackUrl.trim().startsWith('/vrframe')  )   {
	   res.writeHead(200, {'Content-Type': 'text/html', 'Accept-Ranges': 'bytes',  'Cache-Control': 'no-cache'});
              fs.createReadStream('VRiframe.html').pipe(res)
	}
	else if	(feedbackUrl.trim().startsWith('/qramaker') ||  feedbackUrl.trim().startsWith('/make')) {
 	fs.readFile(__dirname + "/static/QrA_Maker/index.html", function (err,data) {     
    res.writeHead(200);
    res.end(data);
  }); 
	}
		else if	(feedbackUrl.trim().startsWith('/vrqramaker') ) {
 	fs.readFile(__dirname + "/static/QrA_Maker/indexVR.html", function (err,data) {     
    res.writeHead(200);
    res.end(data);
  }); 
	}
	else if	(feedbackUrl.trim().startsWith('/memo') ) {
		
		var decodeString=unescape(feedbackUrl.replace('/memo','') ).trim();
 		var feedbackUrlParts = decodeString.replace('/memo','').trim().split("|");
		if(feedbackUrlParts.length == 2)
		{
 
	for (let i = 0; i < memoList.length; i++) {
	 
	 if(memoList[i].user == feedbackUrlParts[0].trim())
	 {
		   memoList.splice(i, 1);
		 break;
		 
	 }
 			}
 
					memoNote = {user:feedbackUrlParts[0].trim(),text:feedbackUrlParts[1].trim(),date:dateTimeNow()};
				memoList.push(memoNote);
				res.writeHead(200,{"Content-Type" : "text/html"});//res.writeHead(200,{"Content-Type" : "text/plain"});
		    		    res.end("Success!!<br>Call your memo: /call" +feedbackUrlParts[0].trim());//res.end("Hello World<br><b> w</b>");

			
		}
			else
			{
 				res.writeHead(200,{"Content-Type" : "text/html"});
		    		    res.end("Form of a memo: /memoNAME|MESSAGE");
				
			}
	}
	else if	(feedbackUrl.trim().startsWith('/call') ) {
		
		var decodeString=unescape(feedbackUrl.replace('/call','') ).trim();
	var feedback="Entry not found";
	for (let i = 0; i < memoList.length; i++) {
	 
 	 if(memoList[i].user == decodeString)
	 {
		 feedback=memoList[i].text;
		 
	 }
 			}
 				res.writeHead(200,{"Content-Type" : "text/html"}); 
		    		    res.end(feedback); 

	}
	
	

     else if (fs.statSync(filename).isDirectory()){ filename += '/index.html';}//'/aikido_start.html';}

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
  });}
}).listen(parseInt(port, 10));