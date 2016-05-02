$(function() {
    var $window = $(window);
    var socket = io();


    socket.on('new message', function (data) {

        $('<li><span id="span">'+data.username+"</span> mes:"+data.message+'</li>').appendTo('#log');
    });

    socket.on('input', function (data) {
        $('#hint').html('');
        if(data.username && data.message)
        $('#hint').html( "<span id='span'>"+data.username+"</span> : "+data.message );
    });

    socket.on('num', function (data) {

        $('#num').html('<h1>count user '+data.num+" data:"+data.date+'</h1>');
    });

    function sendMessage () {
        socket.emit('new message', $('#message').val() );
    }

    //----------------------------------
    /*$window.keydown(function (event) {
        if (event.which === 13)
                sendMessage();
    });*/

    $('#mes').on('submit',function( e){
        sendMessage();
        // свой ввод
        $("<li><span id='spanyou'>You</span> mes:"+$('#message').val()+'</li>').appendTo('#log');
        $('#message').val('');
        $('#hint').html('');
    });
    //----------------------------------



    $('#message').on('input',function( e){
         socket.emit('input', $('#message').val() );
        $('#hint').html('');
       // console.log(String.fromCharCode(e.keyCode));
    });

    $('#form').on('submit',function( e){
        socket.emit('rename', $('#rename').val() );
        $('#rename').val('');
    });


});
