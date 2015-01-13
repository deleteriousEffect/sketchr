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
    $('.sketchpad').on('mouseenter', '.grid-unit', function() {
        $(this).addClass('sketched');
    });
    gridCreate(100);
});
