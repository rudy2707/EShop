function Skybox(slices, stacks)
{
	var vertices = [];
	var uvs = [];
	var indices = [];

	var mesh = {};

	textures["Skybox.png"] = initTexture("Skybox.png");
	this.textureName = "Skybox.png";
	this.shaderName = "Skybox";

	var vector = new Vector3();


	for(var i = 0; i <= slices; i++)
	{
		for(var j = 0; j <= stacks; j++)
		{
			vertex = {};
			var phi = (j / stacks) * Math.PI;
			var theta = (i / slices) * 2 * Math.PI;

			var x = Math.sin(phi) * Math.cos(theta) * 5;
			var y = -Math.cos(phi) * 5;
			var z = Math.sin(phi) * Math.sin(theta) * 5;

			vector.elements = [x, y, z];
			vector.normalize();

			vertices.push(x);
			vertices.push(y);
			vertices.push(z);

			uvs.push(i / slices);
			uvs.push(j / stacks);
		}
	}

	for(var i = 0; i < slices; i++)
	{
		for(var j = 0; j < stacks; j++)
		{
			var bottomRight = i * (stacks + 1) + j;
			var topRight = bottomRight + 1;
			var topLeft = topRight + stacks + 1;
			var bottomLeft = bottomRight + stacks + 1;

			indices.push(bottomRight);
			indices.push(topRight);
			indices.push(topLeft);

			indices.push(topLeft);
			indices.push(bottomLeft);
			indices.push(bottomRight);
		}
	}

	this.textureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);

	this.verticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	this.indicesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

	this.size = indices.length;


	this.draw = function(projection, view)
	{
		var model = new Matrix4();
	
		model.translate(0, -3, -15);
		model.setRotate(angle, 0, 1, 0);


		gl.useProgram(shaders[this.shaderName]);
		sendMat4(shaders[this.shaderName], "model", model);
		sendMat4(shaders[this.shaderName], "view", view);
		sendMat4(shaders[this.shaderName], "projection", projection);

		var in_Vertex = gl.getAttribLocation(shaders[this.shaderName], "in_Vertex");
		if(in_Vertex >= 0)
		{
			gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
			gl.enableVertexAttribArray(in_Vertex);
			gl.vertexAttribPointer(in_Vertex, 3, gl.FLOAT, false, 0, 0);
		}


		var in_TextureCoord = gl.getAttribLocation(shaders[this.shaderName], "in_TextureCoord");
		if(in_TextureCoord >=0)
		{
			var samplerUniform = gl.getUniformLocation(shaders[this.shaderName], "uSampler");

			gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
			gl.enableVertexAttribArray(in_TextureCoord);
			gl.vertexAttribPointer(in_TextureCoord, 2, gl.FLOAT, false, 0, 0);

			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, textures[this.textureName].glTex);
			gl.uniform1i(samplerUniform, 0);
		}


		if(typeof this.indicesBuffer !== "undefined")
		{
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
			gl.drawElements(gl.TRIANGLES, this.size, gl.UNSIGNED_SHORT, 0);
		}
	}
}



