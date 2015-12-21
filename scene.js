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


function mainLoop()
{
	gl.clear(gl.COLOR_BUFFER_BIT);

	var view = new Matrix4();
	var projection = new Matrix4();

	view.setLookAt(3, 0, 0, 0, 0, 0, 0, 1, 0);
	projection.setPerspective(70, canvas.width / canvas.height, 1, 100);

	gl.depthMask(false);
	//skyBox.setPosition(camera.position());
	//skyBox.display(projection, view);
	skybox.draw(projection, view);
	gl.depthMask(true);


	spot.draw(projection, view);


	angle += 0.1;

	requestAnimationFrame(mainLoop);
}

var skybox;
var spot;
function start()
{
	init();

	shaders["Color3D"] = initShader("Color3D");
	shaders["Skybox"] = initShader("Skybox");
	shaders["Texture3D"] = initShader("Texture3D");

	//meshes.push(initMeshFromObj("Peperoni"));
	//meshes.push(initMeshFromObj("TexturedCube"));
	//meshes.push(initMeshFromObj("Xenomorph"));
	meshes.push(initMeshFromObj("Spot"));
	//meshes.push(initTexturedCube());

	spot = new initMeshFromObj("Spot");

	skybox = new Skybox(36, 36);
	var shelf = new Shelf(10, 3);

	mainLoop();
}
