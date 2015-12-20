function Shelf(width, height)
{
	this.spot = new Array(width);

	for(var x = 0; x < width; x++)
	{
		this.spot[x] = new Array(height);

		for(var y = 0; y < height; y++)
		{
			this.spot[x][y] = null;
		}
	}

	// Place item at given position
	this.emplace = function(x, y, item)
	{
		this.spot[x][y] = item;	
	}

	// Place item at the first non-null position
	this.push = function(item)
	{
		for(var x = 0; this.spot.length; x++)
		{
			for(var y = 0; y < this.spot[x].length; y++)
			{
				if(this.spot[x][y] == null)
				{
					this.spot[x][y] = item;
					return true;
				}
			}
		}

		// Shelf is full
		return false;
	}

	// Remove given item
	this.removeItem = function(item)
	{
		for(var x = 0; this.spot.length; x++)
		{
			for(var y = 0; y < this.spot[x].length; y++)
			{
				if(this.spot[x][y] == item)
				{
					this.spot[x][y] = null;
					return true;
				}
			}
		}

		// item not found
		return false;
	}


	// Remove item at given position
	this.removeAt = function(x, y)
	{
		this.spot[x][y] = null;
	}
}


