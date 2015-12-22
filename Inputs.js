function Inputs()
{
	this.relX = 0;
	this.relY = 0;

	this.keys = [];

	this.keys["w"] = false;
	this.keys["a"] = false;
	this.keys["s"] = false;
	this.keys["d"] = false;
	this.keys[" "] = false;

	document.onkeydown = function(e)
	{
		if(typeof inputs.keys[e["key"]] != "undefined")
		{
			inputs.keys[e["key"].toLowerCase()] = true;
		}
	}

	document.onkeyup = function(e)
	{
		if(typeof inputs.keys[e["key"]] != "undefined")
		{
			inputs.keys[e["key"].toLowerCase()] = false;
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
