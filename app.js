/*jslint browser: true*/ /*global  $*/
$(document).ready(function() {
    function gridRows (rows) {
    var i;
        for (i = 0; i <= rows; i += 1) {
            $('.sketchpad').append('<div class="row"></div>');
        }
    }
    function gridCreate (size) {
    var i;
        gridRows (size);
        for (i = 0; i <= size; i += 1) {
            $('.row').append('<div class="grid-unit"></div>');
        }
    }
    function gridDestory () {
        $('.row, .grid-unit').remove();
    }
    function randomRgb () {
        return Math.floor(Math.random() * 256);
    }
    gridCreate(100);
    $('.sketchpad').on('mouseenter', '.grid-unit', function() {
        var currentRbgString = '',
            rgbArr = [],
            darkerRed = '',
            darkerBlue = '',
            darkerGreen = '';
        if ($(this).attr('class') !== 'grid-unit sketched') {
            $(this).addClass('sketched');
            console.log($(this).attr('class'));
            $(this).css('background-color', 'rgb(' + randomRgb() + ',' + randomRgb() + ',' + randomRgb() + ')');
        } else {
           console.log( $(this).css('background-color'));
           currentRbgString = $(this).css('background-color');
           console.log(currentRbgString);
           rgbArr = currentRbgString.match(/\d+/g, '');
           console.log(rgbArr);
           darkerRed = parseInt(rgbArr[0] - 25.5, 10); 
           darkerBlue = parseInt(rgbArr[1] - 25.5, 10); 
           darkerGreen = parseInt(rgbArr[2] - 25.5, 10); 
           console.log(darkerRed, darkerBlue, darkerGreen);
           $(this).css('background-color', 'rgb(' + darkerRed + ',' + darkerBlue + ',' + darkerGreen + ')');
        }
    });
    $('.sketchpad').on('click', 'button', function() {
        $('.sketchpad').find('.grid-unit').removeClass('sketched');
        var userSize = window.prompt('How large to you want the grid to be?');
        gridDestory();
        gridCreate(userSize);
    });
});
