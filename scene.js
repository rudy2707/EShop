function initShader(shaderName)
{
	var vShaderSource = getFileContent("Shaders/" + shaderName + ".vert");
	var fShaderSource = getFileContent("Shaders/" + shaderName + ".frag");
	
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, vShaderSource);
	gl.compileShader(vertexShader);

	if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
	{
		console.log("Failed to compile vertex shader");
		return;
	}

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fShaderSource);
	gl.compileShader(fragmentShader);

	if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
	{
		console.log("Failed to compile fragment shader");
		return;
	}

	var shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
	{
		console.log("Failed to link shader program");
		return;
	}

	return shaderProgram;
}

var cube;
function init()
{
	canvas = document.getElementById('webgl');
	gl = getWebGLContext(canvas);

	if(!gl)
	{
		console.log('Failed to get the rendering context for WebGL');
		return;
	}

	shaders["Color3D"] = initShader("Color3D");
	shaders["Texture3D"] = initShader("Texture3D");

	textures["test.png"] = initTexture("test.png");

	
	//meshes.push(initMeshFromObj("Cube"));
	//meshes.push(initMeshFromObj("BananaGroup"));
	//meshes.push(initMeshFromObj("Suzanne"));
	meshes.push(initMeshFromObj("Peperoni"));
	//meshes.push(initMeshFromObj("TexturedCube"));
	//meshes.push(initMeshFromObj("Xenomorph"));
	//meshes.push(initCube());
	//meshes.push(initSphere());
	//cube = initTexturedCube();
	

	gl.enable(gl.DEPTH_TEST);
	gl.clearColor(0, 0, 0.0, 1.0);
}

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
function drawMesh(mesh)
{

	var model = new Matrix4();
	var view = new Matrix4();
	var projection = new Matrix4(); 

	view.setLookAt(5, 2, 0, 0, 0, 0, 0, 1, 0);
	projection.setPerspective(95, canvas.width / canvas.height, 1, 100);
	
	model.setRotate(angle, 0, 1, 0);

	/*if(angle %2)
	model.translate(3.0, 0.0, 0.0);*/

	/*model.invert();
	model.transpose();*/

	gl.useProgram(shaders["Color3D"]);

	sendMat4(shaders["Color3D"], "model", model);
	sendMat4(shaders["Color3D"], "view", view);
	sendMat4(shaders["Color3D"], "projection", projection);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.verticesBuffer);
	var in_Vertex = gl.getAttribLocation(shaders["Color3D"], "in_Vertex");
	gl.enableVertexAttribArray(0);
	gl.vertexAttribPointer(in_Vertex, 3, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colorsBuffer);
	var in_Color = gl.getAttribLocation(shaders["Color3D"], "in_Color");
	gl.enableVertexAttribArray(1);
	gl.vertexAttribPointer(in_Color, 4, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalsBuffer);
	var in_Normal = gl.getAttribLocation(shaders["Color3D"], "in_Normal");
	gl.enableVertexAttribArray(2);
	gl.vertexAttribPointer(in_Normal, 3, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indicesBuffer);

	gl.drawElements(gl.TRIANGLES, mesh.size, gl.UNSIGNED_SHORT, 0);

	angle++;
}

function drawTexturedCube(mesh)
{
	var model = new Matrix4();
	var view = new Matrix4();
	var projection = new Matrix4(); 

	view.setLookAt(5, 2, 0, 0, 0, 0, 0, 1, 0);
	projection.setPerspective(95, canvas.width / canvas.height, 1, 100);
	
	model.setRotate(angle, 0, 1, 0);

	gl.useProgram(shaders["Texture3D"]);

	sendMat4(shaders["Texture3D"], "model", model);
	sendMat4(shaders["Texture3D"], "view", view);
	sendMat4(shaders["Texture3D"], "projection", projection);

	var samplerUniform = gl.getUniformLocation(shaders["Texture3D"], "uSampler");
	console.log(samplerUniform);

	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.verticesBuffer);
	var in_Vertex = gl.getAttribLocation(shaders["Texture3D"], "aVertexPosition");
	gl.enableVertexAttribArray(0);
	gl.vertexAttribPointer(in_Vertex, 3, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.verticesBuffer);
	var in_textureCoordinate = gl.getAttribLocation(shaders["Texture3D"], "aTextureCoord");
	gl.enableVertexAttribArray(1);
	gl.vertexAttribPointer(in_textureCoordinate, 2, gl.FLOAT, false, 0, 0);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, textures["test.png"]);
	gl.uniform1i(samplerUniform, 0);
	

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indicesBuffer);

	gl.drawElements(gl.TRIANGLES, mesh.size, gl.UNSIGNED_SHORT, 0);

}

function mainLoop()
{
	gl.clear(gl.COLOR_BUFFER_BIT);

	//drawTexturedCube(cube);
	drawMesh(meshes[0]);
	//drawMesh(meshes[1]);
	//drawMesh(meshes[2]);

	requestAnimationFrame(mainLoop);
}

function start()
{
	init();


	mainLoop();
}
