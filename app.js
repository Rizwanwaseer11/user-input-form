const http = require("http");

const userRequestHandler = require("./parsingRequest"); //create module import of routings

const server = http.createServer(userRequestHandler);

server.listen(3000, console.log("Server is running on https://localhost3000"));
