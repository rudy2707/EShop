var skybox;
var projection;
var view;
var reticle;

function start()
{
	initGL();

	camera = new Camera();
	skybox = new Skybox(36, 36);
	shop = new Shop();
	reticle = new Reticle();

	view = new Matrix4();
	projection = new Matrix4();
	projection.setPerspective(70, canvas.width / canvas.height, 0.1, 100);

	pixelValue = new Uint8Array(4);

	camera.setOrientation([-1, -0.4, 0]);
	camera.setPosition([-6.367749440946494, 1.2, 2.8850427570520005]);

	mainLoop();
}


// Main program
function mainLoop()
{
	gl.clear(gl.COLOR_BUFFER_BIT);

	//camera.displace();
	camera.lookAt();
	inputs.update();

	shop.preDraw(projection, view);

	gl.readPixels(inputs.mouseX, inputs.mouseY, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixelValue);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.depthMask(false);
	skybox.draw(projection, view);
	gl.depthMask(true);


	shop.draw(projection, view);

	angle += 0.02;

	requestAnimationFrame(mainLoop);
}

start();
