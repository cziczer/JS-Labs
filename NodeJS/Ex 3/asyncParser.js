const fs = require('fs');
const util = require('util');

async function asyncCheckIfFile(path){
  try {
    var stat = await util.promisify(fs.lstat)(path);
    if(stat.isFile()){
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            }      
            resolve(data.toString());
            });
        });
    }
    else if(stat.isDirectory())
        return `${path} this path is a directory`;
    return `${path} It's neither directory nor file...`;
  } catch (e) {
    return `${path} There's something wrong with your input...`;
  }
};

module.exports = { asyncCheckIfFile };