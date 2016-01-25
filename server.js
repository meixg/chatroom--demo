var http = require("http");
var url = require("url");

var start = function(route, handle){
    http.createServer(function(request, response){
        var pathname = url.parse(request.url).pathname;
        request.setEncoding("utf8");
        console.log("receive request for "+pathname);
        if(request.method == "POST"){
            var postData = "";
            request.addListener("data", function(postDataChunk){
                postData += postDataChunk;
            });
            request.addListener("end",function(){
                route(pathname, handle, response, postData);
            });
        }else{
            route(pathname, handle,response);
        }
    }).listen(8080);
};

exports.start = start;