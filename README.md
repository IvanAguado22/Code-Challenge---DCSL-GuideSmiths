# Code-Challenge---DCSL-GuideSmiths

This code has been developed as an access test to DCSL GuideSmiths by Iván Aguado, during his last year of Computer Engineering.

The main goal is to move a series of robots sequentially through a grid, return their final positions and orientation, as well as informing if one of them has gone out of the grid and therefore, has been lost. 
A txt file has been used for the input, where the coordinates of the grid, those of the robots, their orientations and their respective instructions must be included. The format used must be the one shown in the pdf file called "NODE_-_Martian_Robots_code-challenge", included in the project. In case any input character is invalid, the user will be informed on screen to change it.

The secondary functionality of robot scent has also been added, which prohibits a robot from getting lost by the same grid edge that another robot has lost.

The aforementioned pdf also includes specifications about the rest of the objectives of this test. At the same time, the project is commented in a way that makes it easy to relate the requirements of the statement to the code.

In order to test the code, different input txt files have been included, with identifying names for each test case. These are located in the folder called "Tests".

HOW TO RUN THE PROJECT

To run the project you just need to have nodejs installed, access from the terminal to the directory where the main code is located and run "node app.js". Previously you must have detailed in the file app.js, line 41, the name of the input txt. It should be noted that this txt must be in the same directory as app.js.

*** It is important that the input txt has a line break at the end, otherwise it will not work. ***
