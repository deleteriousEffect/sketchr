/*jslint browser: true*/ /*global  $*/
$(document).ready(function() {
    function gridCollumns (collumns) {
    var i;
        for (i = 0; i <= collumns; i += 1) {
            $('.sketchpad').append('<div class="collumn"></div>');
        }
    }
    function gridCreate (size) {
    var i;
        gridCollumns (size);
        for (i = 0; i <= size; i += 1) {
            $('.collumn').append('<div class="grid-unit"></div>');
        }
    }
    $('.sketchpad').on('mouseenter', '.grid-unit', function() {
        $(this).addClass('sketched');
    });
    gridCreate(100);
});