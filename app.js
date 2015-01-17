/*global  $*/

/* Generates play area with grid-unit divs that change to a random background color
 * on mouseenter. After initial mouseenter events, the grid-units will darken until
 * they are completely black. User can clear the play area and set a new size */


$(document).ready(function () {
    'use strict';
    var sketchpad = $('.sketchpad'), //container div for the play area
        gridSize = 50; //number of rows and collumns for the gridCreate function

//populates sketchpad with grid-units
    function gridCreate(size) {
        var i,
            j;

        for (i = 0; i < size; i += 1) {
            sketchpad.append('<div class="collumn"></div>');
        }
        for (j = 0; j < size; j += 1) {
            $('.collumn').append('<div class="grid-unit"></div>');
        }
    }

//removes the collumns and grid-units from DOM
    function gridDestroy() {
        $('.collumn, .grid-unit').remove();
    }

    gridCreate(gridSize); //initialize 50x50 grid

//event hander for mouseenter events on grid-units
    sketchpad.on('mouseenter', '.grid-unit', function () {
        var currentRbgString = '',
            rgbArr = [],
            darkerRed = '',
            darkerBlue = '',
            darkerGreen = '';

    //generates a number between 0 and 255 to use as a rgb value
        function randomRgb() {
            return Math.floor(Math.random() * 256);
        }

    // if the grid-unit has not been been moused over
        if ($(this).attr('class') !== 'grid-unit sketched') {
        //add sketched class
            $(this).addClass('sketched');
        //write in-line css to change the background to a random rgb color
            $(this).css('background-color', 'rgb(' + randomRgb() + ',' + randomRgb() + ',' + randomRgb() + ')');
    //if the grid-unit has been moused over
        } else {
        //grab the value of its background color property as a string, e.g. "rgb(255, 255, 255)"
            currentRbgString = $(this).css('background-color');
        //strip the rgb numbers from the and push them on to an array
            rgbArr = currentRbgString.match(/\d+/g, '');
        //darken the rgb values, 25.5 is 10% of the max rgb value of 255
            //TODO: use array.map here
            darkerRed = parseInt(rgbArr[0] - 25.5, 10);
            darkerBlue = parseInt(rgbArr[1] - 25.5, 10);
            darkerGreen = parseInt(rgbArr[2] - 25.5, 10);
        //write over the previous css background with the darker color
            $(this).css('background-color', 'rgb(' + darkerRed + ',' + darkerBlue + ',' + darkerGreen + ')');
        }
    });

//clears sketchpad and creatues a new one with a user-defined size
    $('main').on('click', 'button', function () {
    //prompts the user to for a new size, calls itself if it receives bad input
        function resizePrompt() {
            gridSize = window.prompt('How large to you want the grid to be?\n (1-50)');
            var gridSizeInt = parseInt(gridSize, 10);
        //allows user to cancel and keep current sketchpad uncleared
            if (gridSize === null) {
                console.log('Exit clear/resize dialog');
            } else if (gridSizeInt > 50) {
                gridSizeInt = window.alert('That\'s to big! Enter a number between 1-50 please!');
                resizePrompt();
            } else if (isNaN(gridSizeInt) || gridSizeInt < 1) {
                gridSizeInt = window.alert('That does not make sense! Enter a number between 1-50 please!');
                resizePrompt();
            } else {
            //if acceptable user input is recieved removes old grid from dom
                gridDestroy();
            //and creates a new one with the user-defined size
                gridCreate(gridSizeInt);
            }
        }
        resizePrompt();
    });
});
