function Inputs(keySettings = "wasd")
{
	console.log(keySettings);

	this.relX = 0;
	this.relY = 0;

	this.keys = [];

	this.setKeys = function(keySettings)
	{
		this.keyCodes = [];
		this.keyCodes["forward"] = keySettings[0];
		this.keyCodes["left"] = keySettings[1];
		this.keyCodes["backward"] = keySettings[2];
		this.keyCodes["right"] = keySettings[3];
	}

	this.setKeys(keySettings);

	console.log(this.keyCodes);

	this.keys[87] = false;
	this.keys[65] = false;
	this.keys[83] = false;
	this.keys[68] = false;
	this.keys[32] = false;

	document.onkeypress = function(e)
	{
		//console.log(e)
	}

	document.onkeydown = function(e)
	{
		//console.log(e);
		//console.log(inputs.keys[e.keyCode]);
		//if(typeof inputs.keys[e["key"]] != "undefined")
		if(typeof inputs.keys[e.keyCode] != "undefined")
		{
			inputs.keys[e.keyCode] = true;
		}
	}

	document.onkeyup = function(e)
	{
		//console.log(e)
		//console.log(e["key"].toLowerCase());
		//console.log(inputs.keys[e.keyCode]);
		if(typeof inputs.keys[e.keyCode] != "undefined")
		{
			inputs.keys[e.keyCode] = false;
		}
	}

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
