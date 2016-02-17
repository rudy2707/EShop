function Shop()
{
	// Meshes declaration
	meshes["spot"] = new initMeshFromObj("Spot");
	meshes["Wall"] = new initMeshFromObj("Wall");
	meshes["ShowCase"] = new initMeshFromObj("ShowCase");
	meshes["Floor"] = new initMeshFromObj("Floor");
	meshes["Ceiling"] = new initMeshFromObj("Ceiling");
	meshes["Pepper"] = new initMeshFromObj("Pepper");
	meshes["Carrot"] = new initMeshFromObj("Carrot");
	meshes["Apple"] = new initMeshFromObj("Apple");
	meshes["Chocolate"] = new initMeshFromObj("Chocolate");
	meshes["BananaGroup"] = new initMeshFromObj("BananaGroup");
	meshes["Condom"] = new initMeshFromObj("Condom");
	meshes["Steak"] = new initMeshFromObj("Steak");
	meshes["ParisBiatch"] = new initMeshFromObj("ParisBiatch");
	meshes["CashDesk"] = new initMeshFromObj("CashDesk");

	this.shelf = new Shelf(4, 3, [-4.5, 0, -7.9]);

	this.shelf.push("Pepper");
	this.shelf.push("Carrot");
	this.shelf.push("BananaGroup");
	this.shelf.push("ParisBiatch");
	this.shelf.push("Apple");
	this.shelf.push("Chocolate");
	this.shelf.push("Steak");


	this.elements = [];
	
	//element = {meshName, position[], yAngle}
	this.elements.push({type : 0, meshName : "Floor", position : [0, 0, 0], yAngle : 90});
	this.elements.push({type : 0, meshName : "Ceiling", position : [0, 0, 0], yAngle : 90});

	//this.elements.push({type : 0, meshName : "Wall", position : [-8, 0, -4], yAngle : 90});
	this.elements.push({type : 0, meshName : "ShowCase", position : [-8, 0, -4], yAngle : 90});
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

	this.elements.push({type : 0, meshName : "CashDesk", position : [3, 0, -6], yAngle : 90});
	this.elements.push({type : 0, meshName : "CashDesk", position : [0, 0, -6], yAngle : 90});

	this.elements.push({type : 1, mesh : this.shelf, yAngle : 90});
	
	var light1 = new LightSource([3.0, 3.0, 3.0]);
	light1.setColor(1.0, 1.0, 0.8);
	light1.intensity = 5.0;

	var light2 = new LightSource([-5.0, 3.0, 0.0]);
	light2.setColor(1.0, 1.0, 0.8);
    light2.setIntensity(5.0);

	lightSources.push(light1);
	lightSources.push(light2);


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
