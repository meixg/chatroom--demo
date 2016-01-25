var fs = require("fs")
var route = function(pathname, handle, response, postData){
    if(typeof handle[pathname] === "function"){
        handle[pathname](response, postData);
    }else{
        fs.stat("./www" + pathname,function(err, stats){
            if(err){
                return;
            }
            if(stats.isFile()){
                response.writeHead(200);
                fs.createReadStream("./www" + pathname).pipe(response);
            }else if(stats.isDirectory()){
                if(pathname[pathname.length-1] != "/"){
                    response.writeHead(302,{"Location" : "http://localhost:8080"+pathname+"/"});
                    response.end();
                    return;
                }
                fs.stat("./www"+pathname+"/index.html", function(err,stats){
                    if(stats.isFile()){
                        response.writeHead(200);
                        fs.createReadStream("./www"+pathname+"/index.html").pipe(response);
                    }else{
                        response.writeHead(200);
                        response.write("404 Page Not Found");
                    }
                });
            }else{
                response.writeHead(200);
                response.write("404 Page Not Found");
            }
        });
    }
}

exports.route = route;