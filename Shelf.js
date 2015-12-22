function Shelf(width, height, position)
{
	this.spots = new Array(width);

	for(var x = 0; x < width; x++)
	{
		this.spots[x] = new Array(height);

		for(var y = 0; y < height; y++)
		{
			this.spots[x][y] = null;
		}
	}


	this.position = position;
	console.log(position)

	// Place item at given position
	this.emplace = function(x, y, item)
	{
		this.spots[x][y] = item;	
	}

	// Place item at the first non-null position
	this.push = function(item)
	{
		for(var x = 0; this.spots.length; x++)
		{
			for(var y = 0; y < this.spots[x].length; y++)
			{
				if(this.spots[x][y] == null)
				{
					this.spots[x][y] = item;
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
		for(var x = 0; x < this.spots.length; x++)
		{
			for(var y = 0; y < this.spots[x].length; y++)
			{
				if(this.spots[x][y] == item)
				{
					this.spots[x][y] = null;
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
		this.spots[x][y] = null;
	}
	console.log(this.position)



	this.draw = function(projection, view)
	{
		var model = new Matrix4();

		for(var x = 0; x <this.spots.length; x++)
		{
			for(var y = 0; y < this.spots[x].length; y++)
			{
				model.setRotate(angle, 0, 1, 0);
				model.translate(x * 2, y * 2, 0.0);
				model.translate(this.position[0], this.position[1], this.position[2]);


				meshes["spot"].draw(projection, view, model);
				model = new Matrix4();

			}
		}
	}
}


