$(function(){
  main = new TTSSEQUENCER.Main();
  main.setup(60, 400);
  main.createAudioUnit("Hello World!", 0);
  main.createAudioUnit("Hello World!", 0);
  main.createAudioUnit("Hello World!", 0);
  main.createAudioUnit("Hello World!", 2);
  main.createAudioUnit("Hello World!", 10);
  main.play();
});

