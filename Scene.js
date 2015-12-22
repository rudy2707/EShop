function sendMat4(shaderProgram, name, matrix)
{
	var location = gl.getUniformLocation(shaderProgram, name);
	if(!location)
	{
		console.log("Failed to get the storage location of " + name);
		return;
	}

	gl.uniformMatrix4fv(location, false, matrix.elements);
}

var angle = 0;
var view;

function mainLoop()
{
	gl.clear(gl.COLOR_BUFFER_BIT);

	var projection = new Matrix4();

	camera.displace(inputs);
	camera.lookAt();
	inputs.update();


	//view.setLookAt(0, 3, 15, 0, 0, 0, 0, 1, 0);
	projection.setPerspective(70, canvas.width / canvas.height, 1, 100);

	gl.depthMask(false);
	//skyBox.setPosition(camera.position());
	//skyBox.display(projection, view);
	skybox.draw(projection, view);
	gl.depthMask(true);


	shelf.draw(projection, view);

	//angle += 0.1;

	requestAnimationFrame(mainLoop);
}

var skybox;
var shelf;
var inputs;
var camera;

function start()
{
	init();
	camera = new Camera();

	view = new Matrix4();
	inputs = new Inputs();
	console.log(inputs)

	shaders["Color3D"] = initShader("Color3D");
	shaders["Skybox"] = initShader("Skybox");
	shaders["Texture3D"] = initShader("Texture3D");

	//meshes.push(initMeshFromObj("Peperoni"));
	//meshes.push(initMeshFromObj("TexturedCube"));
	//meshes.push(initMeshFromObj("Xenomorph"));
	//meshes.push(initTexturedCube());

	meshes["spot"] = new initMeshFromObj("Spot");

	skybox = new Skybox(36, 36);
	shelf = new Shelf(10, 3, [5, 5, 5]);

	var test1 = new Vector3([10, 10, 10]);
	var test2 = new Vector3([2, 3, 4]);

	//var text3 = Matrix4.cross(test1, test2)

	mainLoop();
}
