var fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf-8');

let toChar = function(str) {
    return [...str]
};

var dataInput = toChar(input);
console.log(dataInput);

var gridX = parseInt(dataInput[0]);
var gridY = parseInt(dataInput[2]);
const robotsCoor = [];
const robotsOrien = [];
const robotsInst = [];
var numRobots = 0;

for ( let i = 3; i < dataInput.length; i++) {
    if(isNumeric(dataInput[i])){
        robotsCoor.push(parseInt(dataInput[i]));
    }
    if(dataInput[i] == 'N' || dataInput[i] == 'S' || dataInput[i] == 'E' || dataInput[i] == 'W' ){
        robotsOrien.push(dataInput[i]);
        numRobots++;
    }
    if(dataInput[i] == 'L' || dataInput[i] == 'R' || dataInput[i] == 'F' ){
        robotsInst.push(dataInput[i]);
    }
    if(dataInput[i] == '\n'){
        robotsInst.push('$');
    }
}

console.log(robotsCoor);
console.log(robotsOrien);
console.log(robotsInst);
console.log(numRobots);

/*function move (coor, orien, inst, num){
    for (let i = 0; i < num; i++ ){

    }
    return console.log("holi");
}*/

 function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}



