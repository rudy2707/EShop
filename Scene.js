

var skybox;
var shop;
var projection;
var view;
var lightSource

function start()
{
	init();

	camera = new Camera();
	skybox = new Skybox(36, 36);
	shop = new Shop();
	meshes["Xenomorph"] = new initMeshFromObj("Xenomorph");
	meshes["Cube"] = new initMeshFromObj("Cube");
	meshes["TexturedCube"] = new initMeshFromObj("TexturedCube");

	var light1 = new LightSource([3.0, 10.0, 3.0]);
	light1.color = [0.0, 1.0, 1.0];
	light1.intensity = 10.0;

	light2 = new LightSource([-5.0, 3.0, 0.0]);
	light2.color = [1.0, 1.0, 0.5];

	lightSources.push(light1);
	lightSources.push(light2);

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
	//model.translate(-6, 0, 0);
	model.translate(0, 0, 0);
	model.rotate(270, 0, 1, 0);
	model.scale(0.5, 0.5, 0.5);
	meshes["Xenomorph"].draw(projection, view, model);
	//meshes["Cube"].draw(projection, view, model);
	model.rotate(angle, 0, 1, 0);
	meshes["Cube"].draw(projection, view, model);
	//meshes["TexturedCube"].draw(projection, view, model);
	

	shop.draw(projection, view);

	angle += 0.02;

	requestAnimationFrame(mainLoop);
}
