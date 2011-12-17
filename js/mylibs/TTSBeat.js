TTSSEQUENCER.Beat = function (position){
	this.id = this.makeid();
	this.audioUnits = [];
	this.createDomElement();
	this.position = position;
	this.updateTimmings(0);

	this.addButtonClicked = new signals.Signal();
	this.addButtonClicked.add(this.onAddButtonClicked, this);
}
TTSSEQUENCER.Beat.prototype = {
	constructor: TTSSEQUENCER.Beat,
	/////////////////////////////////////////////
	// makeid -----------------------------------
	/////////////////////////////////////////////
	makeid: function(){
		var text = "Beat";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for( var i=0; i < 5; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	},
	/////////////////////////////////////////////
	// createDomElement -------------------------
	/////////////////////////////////////////////
	createDomElement: function(){
		var self = this;
		self.domElement = $(document.createElement('div'))
						.attr("id",this.id)
						.attr("class","beat");
		self.domElement.append('<button class="addbtn">+</button>');
		self.domElement.find('.addbtn').click(function(e){
			e.preventDefault();
			self.addButtonClicked.dispatch();
		});
		self.domElement.append('<div class="audiounits"></div>');
	},
	/////////////////////////////////////////////
	// onAddButtonClicked -----------------------
	/////////////////////////////////////////////
	onAddButtonClicked: function(){
		var audioUnit = new TTSSEQUENCER.AudioUnit(this);
		this.addAudioUnit(audioUnit);	
	},
	/////////////////////////////////////////////
	// addAudioUnit -----------------------------
	/////////////////////////////////////////////
	addAudioUnit: function(audioUnit){
		this.audioUnits.push(audioUnit);
		this.domElement.find('.audiounits').append(audioUnit.domElement);
		audioUnit.deleteButtonClicked.add(this.onAudioUnitDeleteButtonClicked, this);	
	},
	/////////////////////////////////////////////
	// onAudioUnitDeleteButtonClicked -----------
	/////////////////////////////////////////////
	onAudioUnitDeleteButtonClicked: function(audioUnit){
		this.removeAudioUnit(audioUnit);
	},
	/////////////////////////////////////////////
	// removeAudioUnit --------------------------
	/////////////////////////////////////////////
	removeAudioUnit: function(audioUnit){
		for(var i = 0; i < this.audioUnits.length; i++){
			if(this.audioUnits[i].id == audioUnit.id){
				this.audioUnits.splice(i,1);
				this.domElement.find('.audiounits').find("#"+audioUnit.id).remove();
				break;	
			}
		}
	},
	/////////////////////////////////////////////
	// updateTimmings ---------------------------
	/////////////////////////////////////////////
	updateTimmings: function(duration){
		this.duration = duration;
		this.timePosition = this.position * this.duration;		
		for(var i = 0; i < this.audioUnits.length; i++){
			this.audioUnits[i].updateTimmings();
		}
	},
	/////////////////////////////////////////////
	// play -------------------------------------
	/////////////////////////////////////////////
	play: function(){
		for(i = 0; i < this.audioUnits.length; i++){
			this.audioUnits[i].play();
		}
	}
}