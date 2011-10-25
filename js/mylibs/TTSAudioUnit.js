TTSSEQUENCER.AudioUnit = function (text){
	this.id = null;
	this.text = text || "Audio Unit";
}
TTSSEQUENCER.AudioUnit.prototype = {
	constructor: TTSSEQUENCER.AudioUnit,
	/////////////////////////////////////////////
	// play -------------------------------------
	/////////////////////////////////////////////
	play: function(){
		console.log(this, this.id, this.text);
	}
}