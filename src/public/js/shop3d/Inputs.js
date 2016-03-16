// Mouse/keys inputs
function Inputs(keySettings)
{
	// Init key control default layout
	if(typeof keySettings === "undefined")
	{
		keySettings = "wasd";
	}
	var that = this;
	this.mouseX = 1;
	this.mouseY = 1;

	this.relX = 0;
	this.relY = 0;

	this.keys = [];

	this.keyCodes = [];
	this.keyCodes["forward"] = keySettings[0];
	this.keyCodes["left"] = keySettings[1];
	this.keyCodes["backward"] = keySettings[2];
	this.keyCodes["right"] = keySettings[3];


	this.keys[this.keyCodes["forward"]] = false;
	this.keys[this.keyCodes["left"]] = false;
	this.keys[this.keyCodes["backward"]] = false;
	this.keys[this.keyCodes["right"]] = false;

	this.downColor = new Uint8Array(3);
	this.upColor = new Uint8Array(3);

	this.checkColor = function()
	{
		for(var i = 0; i < 3; i++)
		{
			if(this.downColor[i] != this.upColor[i])
			{
				this.upColor[0] = -1;
				this.upColor[1] = -1;
				this.upColor[2] = -1;

				return;
			}
		}

		if(this.downColor[0] + this.downColor[1] + this.downColor[2] > 0)
		{
			var itemName = shop.shelves[this.downColor[0]].getItemAt(this.downColor[1]);
			console.log(itemName);
		}
	}

	// DOM Events
	document.addEventListener('keypress', function(e) {
		var letter = String.fromCharCode(e.charCode);
		if(typeof inputs.keys[letter] !== "undefined")
		{
			inputs.keys[letter] = true;
		}
	});

	document.addEventListener('keyup', function(e) {
		var letter = String.fromCharCode(e.keyCode + 32);
		if(typeof inputs.keys[letter] !== "undefined")
		{
			inputs.keys[letter] = false;
		}
	});

	canvas.addEventListener('mousemove', function(e) {
		that.mouseX = e.clientX - canvas.offsetLeft;
		that.mouseY = e.clientY - canvas.offsetTop;
	});

	canvas.addEventListener('click', function(e) {
		var itemName = shop.shelves[pixelValue[0]].getItemAt(pixelValue[1]);
		console.log(itemName);
	});
	/*
	canvas.addEventListener('mousedown', function(e) {
		if(e.buttons == 1)
		{
			alert('down');
			inputs.downColor[0] = pixelValue[0];
			inputs.downColor[1] = pixelValue[1];
			inputs.downColor[2] = pixelValue[2];
		}
	});

	canvas.addEventListener('mouseup', function(e) {
		console.log(e);
		if(e.buttons == 1)
		{
			inputs.upColor[0] = pixelValue[0];
			inputs.upColor[1] = pixelValue[1];
			inputs.upColor[2] = pixelValue[2];

			inputs.checkColor();
		}
	});
	*/

	// Compute mouse moves
	this.mouseMoves = function()
	{
		return (this.relX != 0 || this.relY != 0)
	}

	this.updateMouse = function(relX, relY)
	{
		this.relX = relX;
		this.relY = relY;
	}	

	this.update = function()
	{
		this.relX = 0;	
		this.relY = 0;
	}



}
