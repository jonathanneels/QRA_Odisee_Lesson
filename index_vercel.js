var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
  port = process.env.PORT || 8010;
console.log("Server launched => 127.0.0.1:" + port);

const directoryPath = path.join(__dirname, 'movelists');

 var memoNote = {user:"",text:"",date:dateTimeNow()};
 var memoList=[];

function dateTimeNow() 
{
	
	let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
 let minutes = date_ob.getMinutes();
 let seconds = date_ob.getSeconds();

 return(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

}

function getStream(stream) {
  return new Promise(resolve => {
    const chunks = [];

     stream.on("data", chunk => chunks.push(Buffer.from(chunk)));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString()));
  });
}

http.createServer(function(request, res) {
  var uri = url.parse(request.url).pathname
    , filename =decodeURI( path.join(process.cwd(), uri));

var feedbackUrl = request.url;
   if (feedbackUrl.trim() === '/') { 
       //  res.writeHead(200, {'Content-Type': 'text/html' , 'Accept-Ranges': 'bytes',  'Cache-Control': 'no-cache'});
                   //       fs.createReadStream('iframe.html').pipe(res);//  fs.createReadStream('default_arjs_test.html').pipe(res); 
						  
						   	fs.readFile(__dirname + "/iframe.html", function (err,data) {     
    res.writeHead(200);
    res.end(data);
  }); 

    }
			else  if	(feedbackUrl.trim().startsWith('/combine') )   {
  	fs.readFile(__dirname + "/index.html", function (err,data) {     
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
  else{  
    fs.readFile(filename, "binary", function(err, data) {
      if(err) {        
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write(err + "\n");
        res.end();
			  console.log(err); 
        return;
      }

      res.writeHead(200);
    res.end(data);
    });
	}
 }).listen(parseInt(port, 10));