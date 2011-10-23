$(function(){
  main = new TTSSEQUENCER.Main();
  main.setup(60, 180);
  main.createAudioUnit("Hello World!", 0);
  main.createAudioUnit("Hello World!", 0);
  main.createAudioUnit("Hello World!", 0);
  main.createAudioUnit("Hello World!", 2);
  main.createAudioUnit("Hello World!", 4);
  main.removeAudioUnit(0,4);
  console.log(main);
});

