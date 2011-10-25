TTSSEQUENCER.Main = function (){
	this.bpm = null;
	this.beats = [];
	this.beatSize = 0;
	this.progress = 0;
	this.isPaused = true;
	this.totalTime = 0;
	this.currentTime = 0;
	this.relativeTime = 0;
	this.nextPlayableBeat = null;
	this.intervalID = 0;	
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
		this.bpm = bpm;
		this.beatSize = 60000/this.bpm;
		this.updateTimmings();
	},
	/////////////////////////////////////////////
	// setLoopSize ------------------------------
	/////////////////////////////////////////////
	setLoopSize: function(size){
		this.beats = [];
		for(i = 0; i < size; i++){
			this.beats[i] = new TTSSEQUENCER.Beat(i);
		}
		this.updateTimmings();
	},
	/////////////////////////////////////////////
	// updateTimmings ---------------------------
	/////////////////////////////////////////////
	updateTimmings: function(){
		this.totalTime = this.beatSize * this.beats.length;
		for(i = 0; i < this.beats.length; i++){
			this.beats[i].timePosition = (i+1) * this.beatSize;
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
				if(this.beats[position].audioUnits.length == 0){
					this.beats[position].isEmpty = true;
					this.beats[position].isWaitingPlay = true;
				}					
			}
		}
	},
	/////////////////////////////////////////////
	// tooglePause ------------------------------
	/////////////////////////////////////////////
	tooglePause: function(){
		if(this.isPaused)this.play();
		else this.pause();
	},
	/////////////////////////////////////////////
	// play -------------------------------------
	/////////////////////////////////////////////
	play: function(){
		if(this.isPaused){
			this.isPaused = false;
			var d = new Date;
			this.currentTime = d.getTime();
			this.defineNextPlayableBeat(); 
			var self = this;
     		this.intervalID = setInterval(function(){self.update();},33);  
			this.update();
		}
	},
	/////////////////////////////////////////////
	// pause ------------------------------------
	/////////////////////////////////////////////
	pause: function(){
		if(!this.isPaused){
			this.isPaused = true;
			clearInterval(this.intervalID);
		}		
	},
	/////////////////////////////////////////////
	// getProgress ------------------------------
	/////////////////////////////////////////////
	getProgress: function(){
		return this.progress;		
	},
	/////////////////////////////////////////////
	// defineNextPlayableBeat -------------------
	/////////////////////////////////////////////
	defineNextPlayableBeat: function(){
		for(i = 0; i < this.beats.length; i++){
			if(this.beats[i].timePosition > this.relativeTime){
				if(!this.beats[i].isEmpty){
					this.nextPlayableBeat = this.beats[i];
					this.nextPlayableBeat.isWaitingPlay = true;
					break;
				}
			} 
		}
	},
	/////////////////////////////////////////////
	// update -----------------------------------
	/////////////////////////////////////////////
	update:function(){
		if(!this.isPaused){
			var d = new Date;
			var time = d.getTime();
			this.relativeTime += time - this.currentTime;
				
			this.currentTime = time;
			this.progress = this.relativeTime / this.totalTime;
				if(this.nextPlayableBeat.isWaitingPlay){
					if(this.relativeTime > this.nextPlayableBeat.timePosition){
						this.nextPlayableBeat.play();
						this.defineNextPlayableBeat();
					}
				}

			if(this.relativeTime >= this.totalTime){
				this.relativeTime = this.totalTime - this.relativeTime;
				this.defineNextPlayableBeat();
			}
		}
	}	
}