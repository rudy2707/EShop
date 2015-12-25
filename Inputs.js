function Inputs()
{
	this.relX = 0;
	this.relY = 0;

	this.keys = [];

	/*this.keys["w"] = false;
	this.keys["a"] = false;
	this.keys["s"] = false;
	this.keys["d"] = false;
	this.keys[" "] = false;*/

	this.keys[87] = false;
	this.keys[65] = false;
	this.keys[83] = false;
	this.keys[68] = false;
	this.keys[32] = false;

	document.onkeydown = function(e)
	{
		//console.log(inputs.keys[e.keyCode]);
		//if(typeof inputs.keys[e["key"]] != "undefined")
		if(typeof inputs.keys[e.keyCode] != "undefined")
		{
			inputs.keys[e.keyCode] = true;
		}
	}

	document.onkeyup = function(e)
	{
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
