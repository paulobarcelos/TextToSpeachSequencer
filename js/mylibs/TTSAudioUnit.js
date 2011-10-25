TTSSEQUENCER.AudioUnit = function (){
	this.id = null;
	this.text = "Audio Unit";
	this.loaded = false;
	this.sound = null;
}
TTSSEQUENCER.AudioUnit.prototype = {
	constructor: TTSSEQUENCER.AudioUnit,
	/////////////////////////////////////////////
	// setText ----------------------------------
	/////////////////////////////////////////////
	setText: function(text){
		this.text = text
	}
	/////////////////////////////////////////////
	// play -------------------------------------
	/////////////////////////////////////////////
	play: function(){
		console.log(this, this.id, this.text);
	}
}