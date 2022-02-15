const app = require("./app.js");

const port = 3000;

function start(){
    try{
        app.listen(port, () => { console.log("Server started, port: " + port); });
    }
    catch(exception){
        console.log(exception);
    }
}

start();