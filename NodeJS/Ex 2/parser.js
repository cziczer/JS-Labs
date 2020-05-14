const fs = require('fs');

module.exports =  function checkIfFile(path){
    const stat = fs.lstatSync(path);
    if (stat.isFile()) {
        var content = fs.readFileSync(path).toString();
        return `${path} is a file with content:\n${content}`
    } else if (stat.isDirectory()) {
        return `${path} is a directory!`
    }
    return "It's neither file nor direcory :/";
};