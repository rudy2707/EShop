function Shelf(width, height, position = [0, 0, 0])
{
	this.position = position;

	this.spots = new Array(width);

	for(var x = 0; x < width; x++)
	{
		this.spots[x] = new Array(height);

		for(var y = 0; y < height; y++)
		{
			this.spots[x][y] = null;
		}
	}

	this.setPosition = function(position)
	{
		this.position = position;
	}
	

	// Place item at given position
	this.emplace = function(x, y, item)
	{
		this.spots[x][y] = item;	
	}

	// Place item at the first non-null position
	this.push = function(item)
	{
		var x = 0;
		for(var y = this.spots[x].length -1; y > 0; y--)
		{
			while(x < this.spots.length -1)
			{
				if(this.spots[x][y] == null)
				{
					this.spots[x][y] = item;
					return true;
				}
				x++
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

	this.draw = function(projection, view, model)
	{
		var modelBak = new Matrix4();
		modelBak.set(model);

		var floatingHeight = Math.sin(angle) / 30;
		var floatingAngle = angle * 10;

		for(var x = 0; x <this.spots.length; x++)
		{
			for(var y = 0; y < this.spots[x].length; y++)
			{
				model.set(modelBak);

				model.translate(this.position[0] + x * 0.5, this.position[1] + y * 0.5, this.position[2]);

				meshes["spot"].draw(projection, view, model);

				if(this.spots[x][y] != null)
				{
					model.translate(0.25, 0.10 + floatingHeight, 0.25);
					model.rotate(floatingAngle, 0, 1, 0);
					meshes[this.spots[x][y]].draw(projection, view, model);
				}
			}
		}
	}
}


