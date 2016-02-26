var skybox;
var shop;
var projection;
var view;
var lightSource

function start()
{
	initGL();

	camera = new Camera();
	skybox = new Skybox(36, 36);
	shop = new Shop();

	view = new Matrix4();
	projection = new Matrix4();
	projection.setPerspective(70, canvas.width / canvas.height, 0.1, 100);

	mainLoop();
}


// Main program
function mainLoop()
{
	gl.clear(gl.COLOR_BUFFER_BIT);

	camera.displace();
	camera.lookAt();
	inputs.update();

	gl.depthMask(false);
	skybox.draw(projection, view);
	gl.depthMask(true);

	shop.draw(projection, view);

	angle += 0.02;

	requestAnimationFrame(mainLoop);
}
