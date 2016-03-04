var fs = require("fs");
var mime = require("mime");
var path = require("path");

var route = function(pathname, handle, response, postData){
    if(typeof handle[pathname] === "function"){
        handle[pathname](response, postData);
        return;
    }
    function send404(response){
        response.writeHead(404, {'Content-Type' : 'text/plain'});
        response.write('Error 404: Page Not Found');
        response.end();
    }
    function sendFile(response, filePath){
        response.writeHead(200, {'Content-Type' : mime.lookup(path.basename(filePath))});
        fs.createReadStream("./www"+filePath).pipe(response);
    }
    fs.stat("./www" + pathname,function(err, stats){
        if(err){
            send404(response);
            console.log(err);
            return;
        }
        if(stats.isFile()){
            sendFile(response, pathname);
            return;
        }
        if(stats.isDirectory()){
            if(pathname[pathname.length-1] != "/"){
                response.writeHead(302,{"Location" : pathname+"/"});
                response.end();
                return;
            }
            fs.stat("./www"+pathname+"/index.html", function(err,stats){
                if(err){
                    send404(response);
                    console.log(err);
                    return;
                }
                if(stats.isFile()){
                    sendFile(response, pathname+"/index.html");
                    return;
                }
            });
        }
    });
}

exports.route = route;