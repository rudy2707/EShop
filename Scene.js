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

var skybox;
var camera;
var shop;
var projection;
var view;

function start()
{
	init();

	camera = new Camera();
	skybox = new Skybox(36, 36);
	shop = new Shop();

	view = new Matrix4();
	projection = new Matrix4();
	projection.setPerspective(70, canvas.width / canvas.height, 0.1, 100);

	mainLoop();
}


var angle = 0;

function mainLoop()
{
	gl.clear(gl.COLOR_BUFFER_BIT);

	camera.displace();
	camera.lookAt();
	inputs.update();

	gl.depthMask(false);
	skybox.draw(projection, view);
	gl.depthMask(true);

	var model = new Matrix4();
	model.translate(-6, 0, 0);
	model.rotate(270, 0, 1, 0);
	model.scale(0.5, 0.5, 0.5);
	meshes["Xenomorph"].draw(projection, view, model);

	shop.draw(projection, view);

	angle += 0.02;

	requestAnimationFrame(mainLoop);
}
