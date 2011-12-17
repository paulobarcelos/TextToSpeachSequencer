var domReady, smReady;

soundManager.url = "swf/";
soundManager.onready(function(){
  smReady = true;
  entryPoint();
});
soundManager.ontimeout(function(){
  console.log("timeout");
});

$(function(){
  domReady = true;
  entryPoint();
});

function entryPoint(){
  if(domReady && smReady){
    main = new TTSSEQUENCER.Main(16, 180, 'ttss', 600, 400);
    
    $('#playbtn').click(function(){main.play()});
    $('#pausebtn').click(function(){main.pause()});
  }
}

