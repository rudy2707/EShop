function LightSource(position)
{
	this.position = position;
	this.color = [];
	this.intensity = 10;

	this.setPosition = function(x, y, z)
	{
		this.position[0] = x;
		this.position[1] = y;
		this.position[2] = z;
	}

	this.setColor = function(r, g, b)
	{
		this.color[0] = r;
		this.color[1] = g;
		this.color[2] = b;
	}

	this.setIntensity = function(intensity)
	{
		this.intensity = intensity;
	}
}

