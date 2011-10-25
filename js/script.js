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
    main = new TTSSEQUENCER.Main();
    main.setup(60, 400);
    main.createAudioUnit("Hello World!", 0);
    main.createAudioUnit("Hello World!", 0);
    main.createAudioUnit("Hello World!", 0);
    main.createAudioUnit("Hello World!", 2);
    main.createAudioUnit("Hello World!", 10);
    main.play();
  }
}

