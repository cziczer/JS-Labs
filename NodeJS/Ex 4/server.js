const http = require('http');
const url = require('url');
const { splitOperations, changePermission, moveToFolder } = require('./helpers');

const server = http.createServer().listen(5000);

server.on('request', async (request, response) => {
  var url_parts = url.parse(request.url, true); //parsing (relative) URL

  if (url_parts.pathname === '/submit') {
    //Processing the form content, if the relative URL is '/ submit'
    var operations = url_parts.query['args']; 
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); //Creating an answer header - we inform the browser that the body of the answer will be plain text
    var tasks = splitOperations(operations);
    tasks.forEach(({file, operation, args}) => {
        if(operation == "changepermission"){
            if(changePermission(file, args[0]) == "Error")
                response.write(`<h1> Error occured</h1>`);
            else
                response.write(`<h1>Change permissions ${file} to ${args[0]}</h1>`);
        }
        else if(operation == "move"){
            if(moveToFolder(file, args[0], args[1]) == "Error")
                response.write(`<h1> Error occured</h1>`);
            else
                response.write(`<h1> Moved ${file} to ${args[0]}</h1>`);
        }
    });

    response.end(); //The end of the response - send it to the browser
  } 

  else {
    //Generating the form
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); //Creating a repsonse header - we inform the browser that the body of the response will be HTML text
    //and now we put an HTML form in the body of the answer
    response.write('<form method="GET" action="/submit">');
    response.write('<label for="name">Provide dir1:operation:args dir2:operation:args ...</label>');
    response.write('<input name="args">');
    response.write('<br>');
    response.write('<input type="submit">');
    response.write('</form>');
    response.write('<p> If you want move files from directory provide: </p>');
    response.write('<p>oldDirecotry:move:newDirectory, days from last modification</p>');
    response.write('<p>If you want to change permissions provide: </p>');
    response.write('<p>fileName:changepermission:permissionMask</p>');
    response.write('<p>Permission mask shoud looks like: 0oxxx, where x is specified permissions:</p>');
    response.write('<p> 0 - No permissions</p>');
    response.write('<p> 1 - Excecution only</p>');
    response.write('<p> 2 - Write only</p>');
    response.write('<p> 3 - Write + Execution</p>');
    response.write('<p> 4 - Read only</p>');
    response.write('<p> 5 - Read + Execution</p>');
    response.write('<p> 6 - Read + Write</p>');
    response.write('<p> 7 - All permissions given</p>');
    response.write('<p>For owner, group and other users each </p>');
    response.end(); //The end of the response - send it to the browser
  }
});
console.log('The server was started on port 5000');