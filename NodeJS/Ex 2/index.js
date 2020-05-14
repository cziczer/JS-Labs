const checkIfFile = require('./parser');

try{
    if(process.argv.length < 3)
        console.log("You haven't passed path")
    else
        console.log(checkIfFile(process.argv[2]))   
}
catch (e){
    console.log("Error occur:  " + e.message);
}