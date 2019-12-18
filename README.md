# Handwritten-Equation-Detector-and-Solver-SPL3

## Installation
- Go to Frontend/math-planet
- open terminal or cmd
- Run `npm i`
- Run `ng serve`
- Go to Backend
- open new cmd or terminal
- Install python and pip in your computer or open a virtualenvironment in python
- run `pip install -r environmentCPU.txt`
- Go to Backend/MainClasses folder and open terminal and activate the installed virtualenvironment
- run `set FLASK_APP=flaskApp.py`
- run `python -m flask run`


## Run
- Open your browser in localhost://4200

## Features

### Upload Module
- Go to upload module by clicking the UPLOAD button on the sidenav. 
- Drag and drop a picture that contains a picture of equation or arithmetic expression. 
- You can also upload by clicking choose a file and browsing for a single picture
- Crop the selected picture and click UPLOAD to parse the text in the image.
- The text will show in the equation field along with solution if it exists.
- You can manually edit the equation if needed and click SOLVE to see different results
- Furthermore if you are registered you can save the image and solution by clicking SAVE which shows below.

 ### Draw Module
- Go to draw module by clicking the DRAW button on the sidenav.
- Draw on the CANVAS
- You can select ERASER to remove stroke. PENCIL to draw stroke. CLEAR to clean the canvas
- Click UPLOAD after finishing drawing on the canvas
- The rest is same as UPLOAD module
- You can manually edit the equation if needed and click SOLVE to see different results
- Furthermore if you are registered you can save the image and solution by clicking SAVE which shows below.

### Previous History
- If you are REGISTERED user you can see a HISTORY tab which will show your saved contents
- You can delete any content by clicking the TRASH icon on the right of the content 
  
  
### Math practice section
- You can practice solving equations and expressions in the PRACTICE tab.
- Choose QUESTION NUMBER and DIFFICULTY and click GENERATE questions
- You can DIRECTLY answer or select question number and DRAW on the right canvas.
- TURN IN answers if you are sure. Click FINISH quiz if you are done practicing.
- Click RIGHT and LEFT to see more questions


### What it Can Do 
- Parse image containing the following symbols x,y,=,-,+,0,1,2,3,4,5,6,7,8,9
- Identify multplication between two numbers only
- Auto Differentiate if x and y exists
- Solve x or y if equal sign exists
- Division is possible only by drawing denominator and nominator wise

### What it can not do
- Can not do integration
- Can not idenitfy most mathematical symbols
- Can not check for square if its already in a division format
- Can not identify dot or decimal point
- Can not parse noisy image