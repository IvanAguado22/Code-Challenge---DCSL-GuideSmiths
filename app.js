const { exit } = require('process');

//Class for robots with their respective attributes
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

//Class for the grid with its respective attributes
class Grid {
    constructor(x, y){
        this.x = x;
        this.y = y;

        let arrAux1 = new Array();
        arrAux1.length = x; //x coordinate
        let arrAux2 = new Array();
        arrAux2.length = y; //y coordinate
        let arrAux3 = new Array();
        arrAux3.length = 4; // Corresponds to the different orientations within a box. 0: North, 1: South, 2: East, 3: West
        
        //In this array will be noted the edges in which, according to the orientation of a robot, if it takes a step, it will be lost
        this.edge = new Array(arrAux1, arrAux2, arrAux3); 
    }
}

// VARIABLES //
const robots = [];
let id = 0;
let instLength = 0;
let dataInput = [];
let grid = readInput();

// MAIN CODE
createRobots();
move();
printOutput();

// FUNCTIONS //

//Reads the input file
function readInput(){
    var fs = require('fs');
    var input = fs.readFileSync('correctInput.txt', 'utf-8');

    let toChar = function(str) {
        return [...str]
    };

    let dataInputAux = toChar(input);

    //Informs the user of possible errors and stores the read data
    for(let i = 0; i < dataInputAux.length; i++){
        if(isNumeric(dataInputAux[i]) && isNumeric(dataInputAux[i+1])){
            if(isNumeric(dataInputAux[i + 2])){
                console.log('The maximum value for any coordinate is 50') //Checks that a coordinate has a valid value
                exit();
            }
            var strNumber = dataInputAux[i] + dataInputAux[i+1]; //Put the two-digit numbers together into a single number 
            if(parseInt(strNumber) > 50){
                console.log('The maximum value for any coordinate is 50') //Checks that a coordinate has a valid value
                exit();
            }
            dataInput.push(strNumber);
            i++;
        }
        else if(dataInputAux[i] == '-' && isNumeric(dataInputAux[i+1])){
            console.log('No coordinate can be a negative number'); //Checks that a coordinate has a valid value
            exit();
        }
        else if(dataInputAux[i] == '\r' || dataInputAux[i] == '\n' || dataInputAux[i] == 'R' || dataInputAux[i] == 'L' || dataInputAux[i] == 'F' 
        || dataInputAux[i] == 'N' || dataInputAux[i] == 'S' || dataInputAux[i] == 'W' || dataInputAux[i] == 'E' || isNumeric(dataInputAux[i]) 
        || dataInputAux[i] == ' '){
            dataInput.push(dataInputAux[i]);
        }
        else{
            console.log(dataInputAux[i] + " is an invalid input character") //Informs the user that a character in the input is invalid
            exit();
        }
    }

    //Checks the valid length of the instruction strings
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
    //The coordinates read are assigned to the grid and the edge array is initialized
    const grid1 = new Grid(dataInput[0], dataInput[2]);

    return grid1;
    
}

//Creates robots based on the input data and assigns values to their attributes
function createRobots(){

    let robot = new Robot();
    
    for(let j = 3; j < dataInput.length; j++){
        if(isNumeric(dataInput[j])){
            robot.x = parseInt(dataInput[j]); //Coordinate x
            j += 2;
            robot.y = parseInt(dataInput[j]); //Coordinate y
        }
        else if(dataInput[j] == 'N' || dataInput[j] == 'S' || dataInput[j] == 'E' || dataInput[j] == 'W' ){
            robot.orien = dataInput[j]; //Orientation
        }
        else if(dataInput[j] == 'L' || dataInput[j] == 'R' || dataInput[j] == 'F' ){
            robot.inst.push(dataInput[j]); //Instructions
            if(dataInput[j + 1] == '\r'){
                robot.id = id; //Id to make it unique
                robots.push(robot); //Adds the created robot to the robot array
                robot = new Robot();
                id++;
            }
        }
    }
}

//Moves the robots around the board according to the instructions read.
function move(){
    for (let i = 0; i < robots.length; i++ ){
        for (let j = 0; j < robots[i].inst.length; j++){
            if(robots[i].inst[j] == 'R'){ //Orientates the robot to its right
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
            else if(robots[i].inst[j] == 'L'){ //Orientates the robot to its left
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
            else if(robots[i].inst[j] == 'F'){ //Moves the robot one square in the direction of its orientation
                switch(robots[i].orien){
                    case 'N':
                        //Robot lost scent in north movements
                        if(grid.edge[0][robots[i].x] == true && grid.edge[1][robots[i].y] == true && grid.edge[2][0] == true && (robots[i].y + 1) > grid.y){
                            break;
                        }
                        robots[i].y += 1;
                        if(robots[i].y > grid.y){ 
                            robots[i].isLost = true; //Robot lost in the north
                            //Indicates the coordinates and orientation of the robot when lost
                            grid.edge[0][robots[i].x] = true;
                            grid.edge[1][robots[i].y - 1] = true;
                            grid.edge[2][0] = true;
                        }
                        break;
                    case 'S':
                        //Robot lost scent in south movements
                        if(grid.edge[0][robots[i].x] == true && grid.edge[1][robots[i].y] == true && grid.edge[2][1] == true && (robots[i].y - 1) < 0){
                            break;
                        }
                        robots[i].y -= 1;
                        if(robots[i].y < 0){
                            robots[i].isLost = true; //Robot lost in the south
                            //Indicates the coordinates and orientation of the robot when lost
                            grid.edge[0][robots[i].x] = true;
                            grid.edge[1][robots[i].y + 1] = true;
                            grid.edge[2][1] = true;
                        } 
                        break;
                    case 'E':
                        //Robot lost scent in east movements
                        if(grid.edge[0][robots[i].x] == true && grid.edge[1][robots[i].y] == true && grid.edge[2][2] == true && (robots[i].x + 1) > grid.x){
                            break;
                        }
                        robots[i].x += 1;
                        if(robots[i].x > grid.x){
                            robots[i].isLost = true; //Robot lost in the east
                            //Indicates the coordinates and orientation of the robot when lost
                            grid.edge[0][robots[i].x - 1] = true;
                            grid.edge[1][robots[i].y] = true;
                            grid.edge[2][2] = true;
                        } 
                        break;
                    case 'W':
                        //Robot lost scent in west movements
                        if(grid.edge[0][robots[i].x] == true && grid.edge[1][robots[i].y] == true && grid.edge[2][3] == true && (robots[i].x - 1) < 0){
                            break;
                        }
                        robots[i].x -= 1;
                        if(robots[i].x < 0){
                            robots[i].isLost = true; //Robot lost in the west
                            //Indicates the coordinates and orientation of the robot when lost
                            grid.edge[0][robots[i].x + 1] = true;
                            grid.edge[1][robots[i].y] = true;
                            grid.edge[2][3] = true;
                        } 
                        break;
                }           
            }
        }        
    }
}

//Print on screen the layout of the robots after execution and if they are lost or not
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

//Checks if a string is numeric
function isNumeric(str) {
    if (typeof str != "string") return false   
    return !isNaN(str) && !isNaN(parseFloat(str)) 
}




