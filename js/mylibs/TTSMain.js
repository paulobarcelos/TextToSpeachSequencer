TTSSEQUENCER.Main = function (){
	this.bpm = null;
	this.size = null;
	this.beats = [];
	this.progress = 0;
	
}
TTSSEQUENCER.Main.prototype = {
	constructor: TTSSEQUENCER.Main,
	/////////////////////////////////////////////
	// setup ------------------------------------
	/////////////////////////////////////////////
	setup: function(size, bpm){
		this.setLoopSize(size);
		this.setBPM(bpm);
	},
	/////////////////////////////////////////////
	// setBPM -----------------------------------
	/////////////////////////////////////////////
	setBPM: function(bpm){
		this.bpm;
	},
	/////////////////////////////////////////////
	// setLoopSize ------------------------------
	/////////////////////////////////////////////
	setLoopSize: function(size){
		this.size = size;
		this.beats = [];
		for(i = 0; i < size; i++){
			this.beats[i] = new TTSSEQUENCER.Beat(i);
		}
	},
	/////////////////////////////////////////////
	// createAudioUnit --------------------------
	/////////////////////////////////////////////
	createAudioUnit: function(text, position){
		var audioUnit = new TTSSEQUENCER.AudioUnit(text); 
		this.addAudioUnit(audioUnit, position);
	},
	/////////////////////////////////////////////
	// addAudioUnit -----------------------------
	/////////////////////////////////////////////
	addAudioUnit: function(audioUnit, position){
		if(this.beats.indexOf(position)){
			audioUnit.id = (this.beats[position].audioUnits.push(audioUnit) - 1);
			this.beats[position].isEmpty = false;
		}
	},
	/////////////////////////////////////////////
	// removeAudioUnit --------------------------
	/////////////////////////////////////////////
	removeAudioUnit: function(audioUnit, position){
		if(this.beats.indexOf(position)){
			if(this.beats[position].audioUnits.indexOf(audioUnit.id)){
				this.beats[position].audioUnits.splice(audioUnit.id,1);
				if(this.beats[position].audioUnits.length == 0)
					this.beats[position].isEmpty = true;
			}
		}
	},
	/////////////////////////////////////////////
	// update -----------------------------------
	/////////////////////////////////////////////
	update:function(deltaTime){}
	
}