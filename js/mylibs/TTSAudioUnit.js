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
		self.domElement.append('<div class="edit"><button class="closebtn">close</button><form><select><option value=af>Afrikaans</option><option value=sq>Albanian</option><option value=ar>Arabic</option><option value=hy>Armenian</option><option value=az>Azerbaijani</option><option value=eu>Basque</option><option value=be>Belarusian</option><option value=bn>Bengali</option><option value=bg>Bulgarian</option><option value=ca>Catalan</option><option value=zh-CN>Chinese</option><option value=hr>Croatian</option><option value=cs>Czech</option><option value=da>Danish</option><option value=nl>Dutch</option><option value=en>English</option><option value=et>Estonian</option><option value=tl>Filipino</option><option value=fi>Finnish</option><option value=fr>French</option><option value=gl>Galician</option><option value=ka>Georgian</option><option value=de>German</option><option value=el>Greek</option><option value=gu>Gujarati</option><option value=ht>Haitian Creole</option><option value=iw>Hebrew</option><option value=hi>Hindi</option><option value=hu>Hungarian</option><option value=is>Icelandic</option><option value=id>Indonesian</option><option value=ga>Irish</option><option value=it>Italian</option><option value=ja>Japanese</option><option value=kn>Kannada</option><option value=ko>Korean</option><option value=la>Latin</option><option value=lv>Latvian</option><option value=lt>Lithuanian</option><option value=mk>Macedonian</option><option value=ms>Malay</option><option value=mt>Maltese</option><option value=no>Norwegian</option><option value=fa>Persian</option><option value=pl>Polish</option><option value=pt>Portuguese</option><option value=ro>Romanian</option><option value=ru>Russian</option><option value=sr>Serbian</option><option value=sk>Slovak</option><option value=sl>Slovenian</option><option value=es>Spanish</option><option value=sw>Swahili</option><option value=sv>Swedish</option><option value=ta>Tamil</option><option value=te>Telugu</option><option value=th>Thai</option><option value=tr>Turkish</option><option value=uk>Ukrainian</option><option value=ur>Urdu</option><option value=vi>Vietnamese</option><option value=cy>Welsh</option><option value=yi>Yiddish</option></select><input /><button class="savebtn">save</button><button class="deletebtn">delete</button></form></div>');
		
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
			self.domElement.find(".edit").hide(500, function(){self.domElement.css('z-index', 0);});
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