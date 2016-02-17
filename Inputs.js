// Mouse/keys inputs
function Inputs(keySettings)
{
	// Init key control default layout
	if(typeof keySettings === "undefined")
	{
		keySettings = "wasd";
	}

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

	// key events
	document.onkeypress = function(e)
	{
		var letter = String.fromCharCode(e.charCode);
		if(typeof inputs.keys[letter] !== "undefined")
		{
			inputs.keys[letter] = true;
		}
	}

	document.onkeyup = function(e)
	{
		var letter = String.fromCharCode(e.keyCode + 32);
		if(typeof inputs.keys[letter] !== "undefined")
		{
			inputs.keys[letter] = false;
		}
	}

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
