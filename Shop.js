function Shop()
{
	meshes["Xenomorph"] = new initMeshFromObj("Xenomorph");
	meshes["spot"] = new initMeshFromObj("Spot");
	meshes["Wall"] = new initMeshFromObj("Wall");
	meshes["ShowCase"] = new initMeshFromObj("ShowCase");
	meshes["Floor"] = new initMeshFromObj("Floor");
	meshes["Ceiling"] = new initMeshFromObj("Ceiling");
	meshes["Pepper"] = new initMeshFromObj("Pepper");
	meshes["Carrot"] = new initMeshFromObj("Carrot");
	meshes["BananaGroup"] = new initMeshFromObj("BananaGroup");
	meshes["Condom"] = new initMeshFromObj("Condom");
	meshes["ParisBiatch"] = new initMeshFromObj("ParisBiatch");

	this.shelf = new Shelf(10, 3, [-4.5, 0, -7.9]);

	this.shelf.push("Pepper");
	this.shelf.push("Carrot");
	this.shelf.push("BananaGroup");
	this.shelf.push("ParisBiatch");
	this.shelf.emplace(9, 1, "Condom");

	this.elements = [];
	
	//element = {meshName, position[], yAngle}
	this.elements.push({type : 0, meshName : "Floor", position : [0, 0, 0], yAngle : 90});
	this.elements.push({type : 0, meshName : "Ceiling", position : [0, 0, 0], yAngle : 90});

	this.elements.push({type : 0, meshName : "Wall", position : [-8, 0, -4], yAngle : 90});
	this.elements.push({type : 0, meshName : "Wall", position : [-8, 0, 0], yAngle : 90});
	this.elements.push({type : 0, meshName : "Wall", position : [-8, 0, 4], yAngle : 90});
	this.elements.push({type : 0, meshName : "Wall", position : [-8, 0, 8], yAngle : 90});

	this.elements.push({type : 0, meshName : "Wall", position : [8, 0, -4], yAngle : 90});
	this.elements.push({type : 0, meshName : "Wall", position : [8, 0, 0], yAngle : 90});
	this.elements.push({type : 0, meshName : "Wall", position : [8, 0, 4], yAngle : 90});
	this.elements.push({type : 0, meshName : "Wall", position : [8, 0, 8], yAngle : 90});

	this.elements.push({type : 0, meshName : "Wall", position : [-8, -2, 8], yAngle : 0});
	this.elements.push({type : 0, meshName : "Wall", position : [-4, -2, 8], yAngle : 0});
	this.elements.push({type : 0, meshName : "Wall", position : [-0, -2, 8], yAngle : 0});
	this.elements.push({type : 0, meshName : "Wall", position : [4, -2, 8], yAngle : 0});

	this.elements.push({type : 1, mesh : this.shelf, yAngle : 90});
	

	this.draw = function(projection, view)
	{
		var model = new Matrix4();

		for(var i = 0; i < this.elements.length; i++)
		{
			var model = new Matrix4();

			if(this.elements[i].type == 0)
			{
				model.translate(this.elements[i].position[0], this.elements[i].position[1], this.elements[i].position[2]);
				model.rotate(this.elements[i].yAngle, 0, 1, 0);
				meshes[this.elements[i].meshName].draw(projection, view, model);
			}
			else
			{
				model.rotate(this.elements[i].yAngle, 0, 1, 0);
				this.elements[i].mesh.draw(projection, view, model);
			}
		}
	}
}
