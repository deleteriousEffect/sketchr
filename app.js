/*jslint browser: true*/
/*global  $*/
$(document).ready(function () {
    'use strict';
    var sketchpad = $('.sketchpad'),
        gridSize = 50;

    function gridRows(rows) {
        var i;
        for (i = 0; i < rows; i += 1) {
            sketchpad.append('<div class="row"></div>');
        }
    }

    function gridCreate(size) {
        var i;
        gridRows(size);
        for (i = 0; i < size; i += 1) {
            $('.row').append('<div class="grid-unit"></div>');
        }
    }

    function gridDestory() {
        $('.row, .grid-unit').remove();
    }

    function randomRgb() {
        return Math.floor(Math.random() * 256);
    }

    gridCreate(gridSize);
    sketchpad.on('mouseenter', '.grid-unit', function () {
        var currentRbgString = '',
            rgbArr = [],
            darkerRed = '',
            darkerBlue = '',
            darkerGreen = '';
        if ($(this).attr('class') !== 'grid-unit sketched') {
            $(this).addClass('sketched');
            $(this).css('background-color', 'rgb(' + randomRgb() + ',' + randomRgb() + ',' + randomRgb() + ')');
        } else {
            currentRbgString = $(this).css('background-color');
            rgbArr = currentRbgString.match(/\d+/g, '');
            darkerRed = parseInt(rgbArr[0] - 25.5, 10);
            darkerBlue = parseInt(rgbArr[1] - 25.5, 10);
            darkerGreen = parseInt(rgbArr[2] - 25.5, 10);
            $(this).css('background-color', 'rgb(' + darkerRed + ',' + darkerBlue + ',' + darkerGreen + ')');
        }
    });
    $('main').on('click', 'button', function () {
        function resizePrompt() {
            gridSize = window.prompt('How large to you want the grid to be?\n (1-50)');
            var gridSizeInt = parseInt(gridSize, 10);
            if (gridSize === null) {
                console.log('Exit clear/resize dialog');
            } else if (gridSizeInt > 50) {
                gridSizeInt = window.alert('That\'s to big! Enter a number between 1-50 please!');
                resizePrompt();
            } else if (isNaN(gridSizeInt) || gridSizeInt < 1) {
                gridSizeInt = window.alert('That does not make sense! Enter a number between 1-50 please!');
                resizePrompt();
            } else {
                gridDestory();
                gridCreate(gridSizeInt);
            }
        }
        sketchpad.find('.grid-unit').removeClass('sketched');
        resizePrompt();
    });
});
