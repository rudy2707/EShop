function Skybox(slices, stacks)
{
	var vertices = [];
	var uvs = [];
	var indices = [];

	var mesh = {};

	textures["Skybox.png"] = initTexture("Skybox.png");
	mesh.textureName = "Skybox.png";
	mesh.shaderName = "Skybox";

	var vector = new Vector3();


	for(var i = 0; i <= slices; i++)
	{
		for(var j = 0; j <= stacks; j++)
		{
			vertex = {};
			var phi = (j / stacks) * Math.PI;
			var theta = (i / slices) * 2 * Math.PI;

			var x = Math.sin(phi) * Math.cos(theta);
			var y = -Math.cos(phi);
			var z = Math.sin(phi) * Math.sin(theta);

			vector.elements = [x, y, z];
			vector.normalize();

			vertices.push(x);
			vertices.push(y);
			vertices.push(z);

			uvs.push(i / slices);
			uvs.push(-j / stacks);
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

	mesh.textureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.textureCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
	
	mesh.verticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	mesh.indicesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indicesBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

	mesh.size = indices.length;

	return mesh;
}



