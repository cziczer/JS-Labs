const fs = require('fs');
var path = require('path');

const splitOperations = (argsGet) => {
  const operations = argsGet.split(' ');
  let tasks = [];
  operations.forEach((task) => {
    let [file, operation, args] = task.split(':');
    args = args.split(',');
    tasks.push({ file, operation, args });
  });
  return tasks;
};

const changePermission = async (file, permissions) => {
  fs.chmodSync(path.join(__dirname, file), parseInt(permissions), err => {
  if (err) return "Error";
  })
};

const moveToFolder = (direct, newDirectory, days) => {
  fs.readdir(path.join(__dirname, direct), function (err, files) {
    if(err){
      return "Error";
    }
    files.forEach((file) => {
      fs.stat(path.join(__dirname, direct, file), (err, stats) => {
        if(err) {
            throw err;
        }
        console.log((new Date().getDate() - stats.mtime.getDate()));
        if((new Date().getDate() - stats.mtime.getDate()) == days){
          fs.rename(path.join(__dirname, direct, file), path.join(__dirname, newDirectory, file), (err) =>{
            if(err){
              return "Error";
            }
            return;
          })
        }
      });
    });
  });
};

module.exports = { splitOperations, changePermission, moveToFolder };