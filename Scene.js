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

	projection.setPerspective(70, canvas.width / canvas.height, 0.5, 100);

	gl.depthMask(false);
	skybox.draw(projection, view);
	gl.depthMask(true);


	//shelf.draw(projection, view);

	var model = new Matrix4();
	model.translate(-6, 0, 0);
	model.rotate(270, 0, 1, 0);
	model.scale(0.5, 0.5, 0.5);
	meshes["Xenomorph"].draw(projection, view, model);
	model = new Matrix4();

	shop.draw(projection, view);



	angle += 0.02;

	requestAnimationFrame(mainLoop);
}

var skybox;
var shelf;
var inputs;
var camera;
var shop;

function start()
{
	init();
	camera = new Camera();
	shop = new Shop();

	view = new Matrix4();
	inputs = new Inputs();

	shaders["Color3D"] = initShader("Color3D");
	shaders["Skybox"] = initShader("Skybox");
	shaders["Texture3D"] = initShader("Texture3D");


	skybox = new Skybox(36, 36);

	var test1 = new Vector3([10, 10, 10]);
	var test2 = new Vector3([2, 3, 4]);

	//var text3 = Matrix4.cross(test1, test2)

	mainLoop();
}
