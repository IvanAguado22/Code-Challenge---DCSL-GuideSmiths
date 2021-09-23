const { exit } = require('process');

class Robot {
    constructor(){
        this.id = 0;
        this.x = 0;
        this.y = 0;
        this.orien = '';
        this.inst = [];
        this.isLost = false;
    }
}
class Grid {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

// VARIABLES //
const robots = [];
let id = 0;
let instLength = 0;
let dataInput = [];
const grid = new Grid(0, 0);

// MAIN CODE
readInput();
createRobots();
move();
printOutput();

// FUNCTIONS //
function readInput(){
    var fs = require('fs');
    var input = fs.readFileSync('input.txt', 'utf-8');

    let toChar = function(str) {
        return [...str]
    };

    dataInput = toChar(input);

    for(let i = 0; i < dataInput.length; i++){
        if(dataInput[i] == 'L' || dataInput[i] == 'R' || dataInput[i] == 'F'){
            instLength++;
            if(dataInput[i+1] == '\r'){
                if(instLength >= 100){
                    console.log('All instruction strings must be less than 100 characters in length');
                    exit();
                }
                else{
                    instLength = 0;
                }
            }
        }
    }

    if(dataInput[0] > 50){
        console.log('The x-coordinate of the grid must be at most 50');
        exit();
    }
    else if(dataInput[2] > 50){
        console.log('The y-coordinate of the grid must be at most 50');
        exit();
    }
    else{
        grid.x = dataInput[0];
        grid.y = dataInput[2];
    }
}

function createRobots(){

    let robot = new Robot();
    
    for(let j = 3; j < dataInput.length; j++){
        if(isNumeric(dataInput[j])){
            if (dataInput[j] > 50){
                console.log('The x-coordinate of the robot must be at most 50');
                exit();
            }
            robot.x = parseInt(dataInput[j]);
            j += 2;
            if (dataInput[j] > 50){
                console.log('The y-coordinate of the robot must be at most 50');
                exit();
            }
            robot.y = parseInt(dataInput[j]);
        }
        else if(dataInput[j] == 'N' || dataInput[j] == 'S' || dataInput[j] == 'E' || dataInput[j] == 'W' ){
            robot.orien = dataInput[j];
        }
        else if(dataInput[j] == 'L' || dataInput[j] == 'R' || dataInput[j] == 'F' ){
            robot.inst.push(dataInput[j]);
            if(dataInput[j + 1] == '\r'){
                robot.id = id;
                robots.push(robot);
                robot = new Robot();
                id++;
            }
        }
    }
}

function move(){
    for (let i = 0; i < robots.length; i++ ){
        for (let j = 0; j < robots[i].inst.length; j++){
            if(robots[i].inst[j] == 'R'){
                switch(robots[i].orien){
                    case 'N':
                        robots[i].orien = 'E';
                        break;
                    case 'S':
                        robots[i].orien = 'W';
                        break;
                    case 'E':
                        robots[i].orien = 'S';
                        break;
                    case 'W':
                        robots[i].orien = 'N';
                        break;
                }                   
            }          
            else if(robots[i].inst[j] == 'L'){
                switch(robots[i].orien){
                    case 'N':
                        robots[i].orien = 'W';
                        break;
                    case 'S':
                        robots[i].orien = 'E';
                        break;
                    case 'E':
                        robots[i].orien = 'N';
                        break;
                    case 'W':
                        robots[i].orien = 'S';
                        break;
                }                                 
            }
            else if(robots[i].inst[j] == 'F'){
                switch(robots[i].orien){
                    case 'N':
                        robots[i].y += 1;
                        if(robots[i].y > grid.y) robots[i].isLost = true; 
                        break;
                    case 'S':
                        robots[i].y -= 1;
                        break;
                    case 'E':
                        robots[i].x += 1;
                        break;
                    case 'W':
                        robots[i].x -= 1;
                        break;
                }           
            }
        }        
    }
}


function printOutput(){
    for(let i = 0; i < robots.length; i++){
        if(robots[i].isLost == false){
            console.log(robots[i].x + " " + robots[i].y + " " + robots[i].orien);
        }
        else{
            console.log(robots[i].x + " " + robots[i].y + " " + robots[i].orien + " LOST"); 
        }
    }    
}

function isNumeric(str) {
    if (typeof str != "string") return false   
    return !isNaN(str) && !isNaN(parseFloat(str)) 
}




