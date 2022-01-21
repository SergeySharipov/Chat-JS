var socket = io();

$(document).ready(function () {
    $("button").click(function () {
        var text = $('#initials').val() + " says: " + $('#message').val();
        socket.emit('message', text);
        $('#message').val('');
    });
});

socket.on('message', function (msg) {
    $('<li>').text(msg).appendTo('#history');
});

socket.on('clean-history', function () {
    $('#history').empty();
});