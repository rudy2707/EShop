function Shop()
{
	// Meshes declaration
	meshes["spot"] = new initMeshFromObj("Spot");
	meshes["Wall"] = new initMeshFromObj("Wall");
	meshes["ShowCase"] = new initMeshFromObj("ShowCase");
	meshes["Floor"] = new initMeshFromObj("Floor");
	meshes["Ceiling"] = new initMeshFromObj("Ceiling");
	meshes["Pepper"] = new initMeshFromObj("Pepper");
	meshes["CashDesk"] = new initMeshFromObj("CashDesk");

	meshes["Carrot"] = new initMeshFromObj("Carrot");
	meshes["Apple"] = new initMeshFromObj("Apple");
	meshes["Pumpkin"] = new initMeshFromObj("Pumpkin");
	meshes["Ham"] = new initMeshFromObj("Ham");
	meshes["Fish"] = new initMeshFromObj("Fish");
	meshes["Chocolate"] = new initMeshFromObj("Chocolate");
	meshes["BananaGroup"] = new initMeshFromObj("BananaGroup");
	meshes["Condom"] = new initMeshFromObj("Condom");
	meshes["Steak"] = new initMeshFromObj("Steak");
	meshes["ParisBiatch"] = new initMeshFromObj("ParisBiatch");

	this.shelf = [];
	this.shelf.push(new Shelf(3, 2, [-4, 0, -7.9]));	//Fruits
	this.shelf.push(new Shelf(3, 2, [-1, 0, -7.9]));	// Vegetables
	this.shelf.push(new Shelf(3, 2, [2, 0, -7.9]));	// Meat
	this.shelf.push(new Shelf(3, 2, [6, 0, -7.9]));	// Sweets 

	this.shelf[0].push("BananaGroup");
	this.shelf[0].push("Apple");
	this.shelf[1].push("Pepper");
	this.shelf[1].push("Carrot");
	this.shelf[1].push("Pumpkin");
	this.shelf[2].push("Steak");
	this.shelf[2].push("Ham");
	this.shelf[2].push("Fish");

	this.shelf[3].push("Chocolate");

	//this.shelf.push("ParisBiatch");


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

	this.elements.push({type : 0, meshName : "CashDesk", position : [6, 0, -6], yAngle : 90});
	this.elements.push({type : 0, meshName : "CashDesk", position : [3, 0, -6], yAngle : 90});
	this.elements.push({type : 0, meshName : "CashDesk", position : [0, 0, -6], yAngle : 90});
	this.elements.push({type : 0, meshName : "CashDesk", position : [-3, 0, -6], yAngle : 90});

	this.elements.push({type : 1, mesh : this.shelf[0], yAngle : 90});
	this.elements.push({type : 1, mesh : this.shelf[1], yAngle : 90});
	this.elements.push({type : 1, mesh : this.shelf[2], yAngle : 90});
	this.elements.push({type : 1, mesh : this.shelf[3], yAngle : 180});
	
	var light1 = new LightSource([5.0, 3.0, 5.0]);
	light1.setColor(1.0, 1.0, 0.8);
	light1.intensity = 5.0;

	var light2 = new LightSource([-5.0, 3.0, 5.0]);
	light2.setColor(1.0, 1.0, 0.8);
    light2.setIntensity(5.0);

	var light3 = new LightSource([5.0, 3.0, -5.0]);
	light3.setColor(1.0, 1.0, 0.8);
    light3.setIntensity(5.0);

	var light4 = new LightSource([-5.0, 3.0, -5.0]);
	light4.setColor(1.0, 1.0, 0.8);
    light4.setIntensity(5.0);	
	
	lightSources.push(light1);
	lightSources.push(light2);
	lightSources.push(light3);
	lightSources.push(light4);


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
