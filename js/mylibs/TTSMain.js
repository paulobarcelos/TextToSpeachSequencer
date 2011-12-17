TTSSEQUENCER.Main = function (size, bpm, domID, width, height){
	var div = domID || 'ttss';
	this.domElement = $('#'+div);
	this.domElement.attr("class","ttss");
	this.domElement.append('<div class="beatsbg"></div>');
	this.domElement.find('.beatsbg').append('<div class="position"></div>');
	this.positionDomElement = this.domElement.find('.position');// cache for speed
	this.domElement.append('<div class="beats"></div>');

	this.setLoopSize(size || 60);
	this.setBPM(bpm || 128);
	
	this.resize(width || '100%', height || '100%');

	this.progress = 0;
	this.isPaused = true;
	this.currentTime = 0;
	this.relativeTime = 0;
	this.nextPlayableBeat = null;
	this.wrapToNextPlayableBeat = false;
	this.intervalID = 0;
}
TTSSEQUENCER.Main.prototype = {
	constructor: TTSSEQUENCER.Main,
	/////////////////////////////////////////////
	// setBPM -----------------------------------
	/////////////////////////////////////////////
	setBPM: function(bpm){
		this.bpm = bpm;
		this.beatSize = 60000/this.bpm;
		this.updateTimmings();
	},
	/////////////////////////////////////////////
	// getBPM -----------------------------------
	/////////////////////////////////////////////
	getBPM: function(){
		return this.bpm;
	},
	/////////////////////////////////////////////
	// setLoopSize ------------------------------
	/////////////////////////////////////////////
	setLoopSize: function(size){
		this.domElement.find(".beats").empty();
		this.beats = [];
		for(i = 0; i < size; i++){
			this.beats[i] = new TTSSEQUENCER.Beat(i);
			this.domElement.find(".beats").append(this.beats[i].domElement);
			this.beats[i].domElement.width(100/size+"%");
			this.beats[i].domElement.css('left', (i/size*100)+"%");
		}
		this.updateTimmings();
	},
	/////////////////////////////////////////////
	// getLoopSize ------------------------------
	/////////////////////////////////////////////
	getLoopSize: function(){
		return this.beats.length;
	},
	/////////////////////////////////////////////
	// updateTimmings ---------------------------
	/////////////////////////////////////////////
	updateTimmings: function(){
		this.totalTime = this.beatSize * this.beats.length;
		for(i = 0; i < this.beats.length; i++){
			this.beats[i].updateTimmings(this.beatSize);
		}
	},
	/////////////////////////////////////////////
	// resize -----------------------------------
	/////////////////////////////////////////////
	resize: function(width, height){
		this.width = width;
		this.height = height;
		
		this.domElement.width(width).height(height);
	},
	/////////////////////////////////////////////
	// createAudioUnit --------------------------
	/////////////////////////////////////////////
	createAudioUnit: function(language, text, position){
		var audioUnit = new TTSSEQUENCER.AudioUnit();
		audioUnit.loadAudio(language, text);
		this.addAudioUnit(audioUnit, position);
	},
	/////////////////////////////////////////////
	// addAudioUnit -----------------------------
	/////////////////////////////////////////////
	addAudioUnit: function(audioUnit, position){
		if(this.beats.indexOf(position)){
			this.beats[position].addAudioUnit(audioUnit);
		}
	},
	/////////////////////////////////////////////
	// removeAudioUnit --------------------------
	/////////////////////////////////////////////
	removeAudioUnit: function(audioUnit, position){
		if(this.beats.indexOf(position)){
			this.beats[position].removeAudioUnit(audioUnit.id);
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
			if(this.beats[i].timePosition >= this.relativeTime){
				if(this.beats[i].audioUnits.length){
					this.nextPlayableBeat = this.beats[i];
					return;
				}
			} 
		}
		// if we got here, wrap around 
		for(i = 0; i < this.beats.length; i++){
			if(this.beats[i].timePosition >= 0){
				if(this.beats[i].audioUnits.length){
					this.nextPlayableBeat = this.beats[i];
					this.wrapToNextPlayableBeat = true;
					return;
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

			if(this.nextPlayableBeat){
				if(!this.wrapToNextPlayableBeat){
					if(this.relativeTime >= this.nextPlayableBeat.timePosition){
						this.nextPlayableBeat.play();
						this.defineNextPlayableBeat();
					}
				}
			}
						
			if(this.relativeTime >= this.totalTime){
				this.relativeTime = this.relativeTime - this.totalTime;
				this.wrapToNextPlayableBeat = false;
				//this.defineNextPlayableBeat();
			}

			this.positionDomElement.css('left', (this.progress*100)+'%');
		}
	}	
}