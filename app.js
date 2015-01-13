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
    gridCreate(100);
    $('.sketchpad').on('mouseenter', '.grid-unit', function() {
        $(this).addClass('sketched');
    });
    $('.sketchpad').on('click', 'button', function() {
        $('.sketchpad').find('.grid-unit').removeClass('sketched');
        var userSize = window.prompt("How large to you want the grid to be?");
        gridDestory();
        gridCreate(userSize);
    });
});
