 $(document).ready(function(){
   
     
    });
  var socket = io();
var dataR;
socket.on('alexacommand', function(msg){
dataR = msg;
    processData();
    console.log(msg);
  });
    
  socket.on('getoverallsales', function(msg){

       console.log(msg);
  });
    
    function processData(){
    
    
    }
    
    
    
//    socket.on('getoverallsales', function(msg){
////    io.emit('alexacommand', msg);
//        if(msg == 'overallsales'){
//            socket.emit('getoveralltradesales',  'overallsales' )
//     $(".stage1").fadeIn(1000);
//    $(".stage2").hide(1000);
//    console.log(msg);
//  });
//});