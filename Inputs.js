function Inputs()
{
	this.x = 0;
	this.y = 0;

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

	document.onkeyup= function(e)
	{
		if(typeof inputs.keys[e["key"]] != "undefined")
		{
			inputs.keys[e["key"].toLowerCase()] = false;
		}
	}
	
	canvas.onmousemove = function(e)
	{
		//console.log(e);
		inputs.relX = e.layerX - inputs.x;
		inputs.relY = (e.layerY - inputs.y);

		inputs.x = e.layerX;
		inputs.y = e.layerY;
	}

	this.mouseMoves = function()
	{
		return (this.relX != 0 || this.relY != 0)
	}

	this.update = function()
	{
		this.relX = 0;	
		this.relY = 0;
	}

}
