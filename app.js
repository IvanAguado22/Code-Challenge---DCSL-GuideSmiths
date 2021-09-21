
// VARIABLES //
const robotsCoor = [];
const robotsOrien = [];
const robotsInst = [];
var numRobots = 0;
var gridX;
var gridY;
let j = 0;
let k = 0;
let n = 0;
let coorIndex = 0;
let orienIndex = 0;

// MAIN CODE

storeData();
move();
output();

// FUNCTIONS //
function readInput(){
    var fs = require('fs');
    var input = fs.readFileSync('input.txt', 'utf-8');

    let toChar = function(str) {
        return [...str]
    };

    var dataInput = toChar(input);
    return dataInput;
}

function storeData(){
    var dataInput = readInput();
    gridX = parseInt(dataInput[0]);
    gridY = parseInt(dataInput[2]);

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
            if(dataInput[i+1] == '\r'){
                robotsInst.push('$');
            }
        }
    }
}

function output(){
    for(let i = 0; i < numRobots; i++){
        console.log(robotsCoor[coorIndex] + " " + robotsCoor[coorIndex + 1] + " " + robotsOrien[orienIndex]);
        coorIndex += 2;
        orienIndex++;
    }    
}

function move (){
    for (let i = 0; i < numRobots; i++ ){
        while(robotsInst[j] != '$'){
            if(robotsInst[j] == 'R'){
                switch(robotsOrien[n]){
                    case 'N':
                        robotsOrien[n] = 'E';
                        break;
                    case 'S':
                        robotsOrien[n] = 'W';
                        break;
                    case 'E':
                        robotsOrien[n] = 'S';
                        break;
                    case 'W':
                        robotsOrien[n] = 'N';
                        break;
                }                   
            }          
            else if(robotsInst[j] == 'L'){
                switch(robotsOrien[n]){
                    case 'N':
                        robotsOrien[n] = 'W';
                        break;
                    case 'S':
                        robotsOrien[n] = 'E';
                        break;
                    case 'E':
                        robotsOrien[n] = 'N';
                        break;
                    case 'W':
                        robotsOrien[n] = 'S';
                        break;
                }                                 
            }
            else if(robotsInst[j] == 'F'){
                switch(robotsOrien[n]){
                    case 'N':
                        robotsCoor[k + 1] += 1;
                        break;
                    case 'S':
                        robotsCoor[k + 1] -= 1;
                        break;
                    case 'E':
                        robotsCoor[k] += 1;
                        break;
                    case 'W':
                        robotsCoor[k] -= 1;
                        break;
                }           
            }
        j++;       
        }
    j++;
    n++;
    k += 2;
    }
}

function isNumeric(str) {
    if (typeof str != "string") return false   
    return !isNaN(str) && !isNaN(parseFloat(str)) 
}




