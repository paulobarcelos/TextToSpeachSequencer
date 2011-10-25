TTSSEQUENCER.Beat = function (id){
	this.id = id;
	this.timePosition = 0;
	this.audioUnits = [];
	this.isEmpty = true;
	this.isWaitingPlay = true;
}
TTSSEQUENCER.Beat.prototype = {
	constructor: TTSSEQUENCER.Beat,
	/////////////////////////////////////////////
	// play -------------------------------------
	/////////////////////////////////////////////
	play: function(){
		this.isWaitingPlay = false;
		console.log(this, this.id);
		for(i = 0; i < this.audioUnits.length; i++){
			this.audioUnits[i].play();
		}
	}
}