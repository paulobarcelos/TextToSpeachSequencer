TTSSEQUENCER.AudioUnit = function (parentBeat){
	this.parentBeat = parentBeat;
	this.id = this.makeid();
	this.duration = 0;
	this.createDomElement();
	this.text = "Audio Unit";
	this.language = "en";
	this.loaded = false;
	this.sound = null;	
	this.saveButtonClicked = new signals.Signal();
	this.saveButtonClicked.add(this.onSaveButtonClicked, this);
	this.deleteButtonClicked = new signals.Signal();	
	
}
TTSSEQUENCER.AudioUnit.prototype = {
	constructor: TTSSEQUENCER.AudioUnit,
	/////////////////////////////////////////////
	// makeid -----------------------------------
	/////////////////////////////////////////////
	makeid: function(){
		var text = "AudioUnit";
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
						.attr("class","audiounit");
		self.domElement.append('<div class="duration"></div>');
		self.domElement.append('<button class="editbtn">edit</button>');
		self.domElement.append('<div class="edit"><button class="closebtn">close</button><form><select><option value="en">English</option><option value="sv">Swedish</option></select><input /><button class="savebtn">save</button><button class="deletebtn">delete</button></form></div>');
		
		self.domElement.find('.editbtn').click(function(e){
			e.preventDefault();
			self.domElement.css('z-index', 1000);
			self.domElement.find(".edit").show(500);
			
		});
		self.domElement.find('.closebtn').click(function(e){
			e.preventDefault();
			self.domElement.find(".edit").hide(500, function(){self.domElement.css('z-index', 0);});
			
		});
		self.domElement.find('.savebtn').click(function(e){
			e.preventDefault();
			self.saveButtonClicked.dispatch();
		});
		self.domElement.find('.deletebtn').click(function(e){
			e.preventDefault();
			self.deleteButtonClicked.dispatch(self);
		});

		self.domElement.find(".edit").hide();
		self.domElement.hide(0, function(){self.domElement.css('z-index', 0);});
		self.updateTimmings();
	},
	/////////////////////////////////////////////
	// onSaveButtonClicked ----------------------
	/////////////////////////////////////////////
	onSaveButtonClicked: function(){
		var language = this.domElement.find('select').val();
		var text = this.domElement.find('input').val();
		this.loadAudio(language, text);
	},
	/////////////////////////////////////////////
	// loadAudio --------------------------------
	/////////////////////////////////////////////
	loadAudio: function(language, text){
		this.loaded = false;
		this.text = text;
		var self = this;
		this.sound = soundManager.createSound({
		    id: self.id,
		    url: 'googletts.php?l='+self.language+'&n='+self.text,
		    onload: function(){
		    	self.loaded = true;
		    	self.duration = self.sound.duration;
		    	self.updateTimmings();
		    }
		  });
		  this.sound.load();
	},
	/////////////////////////////////////////////
	// updateTimmings ---------------------------
	/////////////////////////////////////////////
	updateTimmings: function(){
		var durationPercent = (this.duration*100)/this.parentBeat.duration;
		this.domElement.find('.duration').width(durationPercent+'%');		
	},
	/////////////////////////////////////////////
	// play -------------------------------------
	/////////////////////////////////////////////
	play: function(){
		if(this.loaded) this.sound.play();
	}
}