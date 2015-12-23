function Shop()
{
	this.elements = []

	//element = {meshName, position[], yAngle}

	this.elements.push({meshName : "Wall", position : [-8, 0, -4], yAngle : 90});
	this.elements.push({meshName : "Wall", position : [-8, 0, 0], yAngle : 90});
	this.elements.push({meshName : "Wall", position : [-8, 0, 4], yAngle : 90});
	this.elements.push({meshName : "Wall", position : [-8, 0, 8], yAngle : 90});

	this.elements.push({meshName : "Wall", position : [8, 0, -4], yAngle : 90});
	this.elements.push({meshName : "Wall", position : [8, 0, 0], yAngle : 90});
	this.elements.push({meshName : "Wall", position : [8, 0, 4], yAngle : 90});
	this.elements.push({meshName : "Wall", position : [8, 0, 8], yAngle : 90});

	this.elements.push({meshName : "ShowCase", position : [2, 0, 1], yAngle : 90, alpha : true});

	

	this.draw = function(projection, view)
	{
		var model = new Matrix4();

		for(var i = 0; i < this.elements.length; i++)
		{
			if(this.elements[i].alpha === true)
			{
				gl.disable(gl.DEPTH_TEST);
				gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
				gl.enable(gl.BLEND);
			}


			var model = new Matrix4();
			model.translate(this.elements[i].position[0], this.elements[i].position[1], this.elements[i].position[2]);
			model.rotate(this.elements[i].yAngle, 0, 1, 0);
			meshes[this.elements[i].meshName].draw(projection, view, model);
			//console.log(meshes[this.elements[i].meshName]);
			gl.enable(gl.DEPTH_TEST);
			gl.disable(gl.BLEND);
		}
		
	}
}
