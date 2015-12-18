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

	gl.useProgram(shaders[mesh.shaderName]);

	sendMat4(shaders[mesh.shaderName], "model", model);
	sendMat4(shaders[mesh.shaderName], "view", view);
	sendMat4(shaders[mesh.shaderName], "projection", projection);
	
	var in_Vertex = gl.getAttribLocation(shaders[mesh.shaderName], "in_Vertex");
	if(in_Vertex >= 0)
	{
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.verticesBuffer);
		gl.enableVertexAttribArray(in_Vertex);
		gl.vertexAttribPointer(in_Vertex, 3, gl.FLOAT, false, 0, 0);
	}

	var in_Normal = gl.getAttribLocation(shaders[mesh.shaderName], "in_Normal");
	if(in_Normal >= 0)
	{	
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalsBuffer);
		gl.enableVertexAttribArray(in_Normal);
		gl.vertexAttribPointer(in_Normal, 3, gl.FLOAT, false, 0, 0);
	}
	
	var in_Color = gl.getAttribLocation(shaders[mesh.shaderName], "in_Color");
	if(in_Color >= 0)
	{
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colorsBuffer);
		gl.enableVertexAttribArray(in_Color);
		gl.vertexAttribPointer(in_Color, 4, gl.FLOAT, false, 0, 0);
	}
		
	var in_TextureCoord = gl.getAttribLocation(shaders[mesh.shaderName], "in_TextureCoord");
	if(in_TextureCoord >=0)
	{
		var samplerUniform = gl.getUniformLocation(shaders[mesh.shaderName], "uSampler");

		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.textureCoordBuffer);
		gl.enableVertexAttribArray(in_TextureCoord);
		gl.vertexAttribPointer(in_TextureCoord, 2, gl.FLOAT, false, 0, 0);

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, textures["test.png"]);
		gl.uniform1i(samplerUniform, 0);
	}

	/*console.log(in_Vertex + "ver");
	console.log(in_Normal + "nor");
	console.log(in_Color + "col");
	console.log(in_TextureCoord + "tex");*/
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indicesBuffer);
	gl.drawElements(gl.TRIANGLES, mesh.size, gl.UNSIGNED_SHORT, 0);
}


function mainLoop()
{
	gl.clear(gl.COLOR_BUFFER_BIT);

	drawMesh(meshes[0]);

	angle++;

	requestAnimationFrame(mainLoop);
}

function start()
{
	init();

	shaders["Color3D"] = initShader("Color3D");
	shaders["Texture3D"] = initShader("Texture3D");

	textures["test.png"] = initTexture("test.png");

	//meshes.push(initMeshFromObj("Cube"));
	//meshes.push(initMeshFromObj("BananaGroup"));
	//meshes.push(initMeshFromObj("Suzanne"));
	//meshes.push(initMeshFromObj("Peperoni"));
	meshes.push(initMeshFromObj("TexturedCube"));
	//meshes.push(initMeshFromObj("Xenomorph"));
	//meshes.push(initTexturedCube());

	mainLoop();
}
