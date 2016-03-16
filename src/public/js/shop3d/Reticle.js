function Reticle()
{
	this.shader = new Shader("Reticle");
	this.textureName = "Reticle.png";
	textures[this.textureName] = initTexture(this.textureName);

	var vertices = [
		-1.0, -1.0,
		1.0, -1.0,
		1.0,  1.0,
		-1.0,  1.0
			];

	var textureCoords = [
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0
		];

	var indices = [0, 1, 2, 0, 3, 2];
	this.size = indices.length;

	this.textureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);

	this.verticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	this.indicesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

	this.draw = function()
	{


		gl.useProgram(this.shader.shaderProgram);

		var model = new Matrix4();


		model.scale((canvas.height / 40) / canvas.width, 0.025, 1);

		this.shader.sendMat4("model", model);

		var in_Vertex = gl.getAttribLocation(this.shader.shaderProgram, "in_Vertex");
		if(in_Vertex >= 0)
		{
			gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
			gl.enableVertexAttribArray(in_Vertex);
			gl.vertexAttribPointer(in_Vertex, 2, gl.FLOAT, false, 0, 0);
		}


		var in_TextureCoord = gl.getAttribLocation(this.shader.shaderProgram, "in_TextureCoord");
		if(in_TextureCoord >= 0)
		{
			var samplerUniform = gl.getUniformLocation(this.shader.shaderProgram, "uSampler");

			gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
			gl.enableVertexAttribArray(in_TextureCoord);
			gl.vertexAttribPointer(in_TextureCoord, 2, gl.FLOAT, false, 0, 0);

			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, textures[this.textureName].glTex);
			gl.uniform1i(samplerUniform, 0);
		}

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);

		gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
		gl.enable(gl.BLEND);
		gl.disable(gl.DEPTH_TEST);
		gl.drawElements(gl.TRIANGLES, this.size, gl.UNSIGNED_SHORT, 0);
		gl.disable(gl.BLEND);
		gl.enable(gl.DEPTH_TEST);
	}
}
