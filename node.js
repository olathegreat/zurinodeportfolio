const fs = require('fs');
const http = require('http');
const path = require('path');

const server = http.createServer((req, res)=>{
    let filePath = path.join(__dirname, 'public', req.url === "/" ? 'index.html' : req.url);
    let contentType = getContentType(filePath) || 'text/html';
    let emptyPagePath = path.join(__dirname, 'public', "404.html");
    fs.readFile(filePath, 'utf8', (err, content)=>{
        if(err){
            if(err.code === "ENOENT"){
                     fs.readFile(emptyPagePath, 'utf8', (err, content)=>{
                        res.writeHead(200, {'content-Type': contentType})
                        res.end(content)
                     })
            }else{
                res.writeHead(500)
                res.end("a server error has occured")
            }
        }

        if(!err){
            res.writeHead(200, {'content-Type': contentType});
            res.end(content)
        }
    })
})



const getContentType = (filePath) =>{
    let extname = path.extname(filePath);
    if(extname === ".js"){
        return "text/javascript"
    }
    if(extname === ".css"){
        return "text/css"
    }
    if(extname === ".png"){
        return "image/png"
    }
    if(extname === ".jpg"){
        return "image/jpg"
    }
} 

const port = 3000;

server.listen(port, ()=>{
    console.log("server is runnning")
})