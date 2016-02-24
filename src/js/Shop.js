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
	meshes["Lolipop"] = new initMeshFromObj("Lolipop");
	meshes["Toblerone"] = new initMeshFromObj("Toblerone");
	meshes["ChocolateDoughnut"] = new initMeshFromObj("ChocolateDoughnut");
	meshes["CaramelDoughnut"] = new initMeshFromObj("CaramelDoughnut");
	meshes["JamDoughnut"] = new initMeshFromObj("JamDoughnut");
	meshes["YoghurtApple"] = new initMeshFromObj("YoghurtApple");
	meshes["YoghurtStrawberry"] = new initMeshFromObj("YoghurtStrawberry");
	meshes["YoghurtVanilla"] = new initMeshFromObj("YoghurtVanilla");
	meshes["YoghurtNature"] = new initMeshFromObj("YoghurtNature");
	meshes["Gruyere"] = new initMeshFromObj("Gruyere");
	meshes["Emmental"] = new initMeshFromObj("Emmental");
	meshes["GreenMilk"] = new initMeshFromObj("GreenMilk");
	meshes["RedMilk"] = new initMeshFromObj("RedMilk");
	meshes["BlueMilk"] = new initMeshFromObj("BlueMilk");
	meshes["BrownEgg"] = new initMeshFromObj("BrownEgg");
	meshes["WhiteEgg"] = new initMeshFromObj("WhiteEgg");
	meshes["Scotch"] = new initMeshFromObj("Scotch");
	meshes["PaperTowel"] = new initMeshFromObj("PaperTowel");
	meshes["ToiletPaper"] = new initMeshFromObj("ToiletPaper");

	this.shelves = [];
	this.shelves.push(new Shelf(3, 2, [-4, 0, -7.9]));	//Fruits
	this.shelves.push(new Shelf(3, 2, [-1, 0, -7.9]));	// Vegetables
	this.shelves.push(new Shelf(2, 2, [2, 0, -7.9]));	// Meat
	this.shelves.push(new Shelf(3, 2, [6, 0, -7.9]));	// Sweets 
	this.shelves.push(new Shelf(6, 2, [1, 0, -7.9]));	// Milk Products
	this.shelves.push(new Shelf(4, 2, [-3, 0, -7.9]));	// paper products

	this.shelves[0].push("BananaGroup");
	this.shelves[0].push("Apple");

	this.shelves[1].push("Pepper");
	this.shelves[1].push("Carrot");
	this.shelves[1].push("Pumpkin");
	
	this.shelves[2].push("Steak");
	this.shelves[2].push("Ham");
	this.shelves[2].push("Fish");


	this.shelves[3].push("Toblerone");
	this.shelves[3].push("ChocolateDoughnut");
	this.shelves[3].push("JamDoughnut");
	this.shelves[3].push("CaramelDoughnut");
	this.shelves[3].push("Chocolate");
	this.shelves[3].push("Lolipop");

	this.shelves[4].push("Emmental");
	this.shelves[4].push("Gruyere");
	this.shelves[4].push("YoghurtApple");
	this.shelves[4].push("YoghurtStrawberry");
	this.shelves[4].push("YoghurtVanilla");
	this.shelves[4].push("YoghurtNature");
	this.shelves[4].push("GreenMilk");
	this.shelves[4].push("RedMilk");
	this.shelves[4].push("BlueMilk");
	this.shelves[4].push("BrownEgg");
	this.shelves[4].push("WhiteEgg");

	this.shelves[5].push("PaperTowel");
	this.shelves[5].push("ToiletPaper");
	this.shelves[5].push("Scotch");

	//this.shelves.push("ParisBiatch");


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

	//Back
	this.elements.push({type : 0, meshName : "Wall", position : [-8, 0, 8], yAngle : 0});
	this.elements.push({type : 0, meshName : "Wall", position : [-4, -2.5, 8], yAngle : 0});
	this.elements.push({type : 0, meshName : "Wall", position : [-4, 3.5, 8], yAngle : 0});
	this.elements.push({type : 0, meshName : "Wall", position : [0, -2.5, 8], yAngle : 0});
	this.elements.push({type : 0, meshName : "Wall", position : [0, 3.5, 8], yAngle : 0});
	this.elements.push({type : 0, meshName : "Wall", position : [4, 0, 8], yAngle : 0});

	//Front
	this.elements.push({type : 0, meshName : "Wall", position : [-8, 0, -8], yAngle : 0});
	this.elements.push({type : 0, meshName : "Wall", position : [-4, 3.5, -8], yAngle : 0});
	this.elements.push({type : 0, meshName : "Wall", position : [0, 3.5, -8], yAngle : 0});
	this.elements.push({type : 0, meshName : "Wall", position : [4, 0, -8], yAngle : 0});

	this.elements.push({type : 0, meshName : "CashDesk", position : [6, 0, -5], yAngle : 90});
	this.elements.push({type : 0, meshName : "CashDesk", position : [3, 0, -5], yAngle : 90});
	this.elements.push({type : 0, meshName : "CashDesk", position : [0, 0, -5], yAngle : 90});
	this.elements.push({type : 0, meshName : "CashDesk", position : [-3, 0, -5], yAngle : 90})
	this.elements.push({type : 0, meshName : "CashDesk", position : [-6, 0, -5], yAngle : 90})

	this.elements.push({type : 1, mesh : this.shelves[0], yAngle : 90});
	this.elements.push({type : 1, mesh : this.shelves[1], yAngle : 90});
	this.elements.push({type : 1, mesh : this.shelves[2], yAngle : 90});
	this.elements.push({type : 1, mesh : this.shelves[3], yAngle : 180});
	this.elements.push({type : 1, mesh : this.shelves[4], yAngle : 180});
	this.elements.push({type : 1, mesh : this.shelves[5], yAngle : 180});
	
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
