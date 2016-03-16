function initSphere()
{
	var slices = 36;
	var stacks = 36;

	var vertices = [];
	var colors = [];
	var normals = [];
	var indices = [];

	var mesh = {};

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

			normals.push(vector.elements[0]);
			normals.push(vector.elements[1]);
			normals.push(vector.elements[2]);

			//if((i + j) %2)
			if(j % 2)
			{
				colors.push(1.0);
				colors.push(1.0);
				colors.push(1.0);
			}
			else
			{
				colors.push(0.0);
				colors.push(0.0);
				colors.push(0.0);
			}

			colors.push(1.0);
		}
	}

	mesh.verticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	mesh.colorsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colorsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

	mesh.normalsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

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

	mesh.indicesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indicesBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

	mesh.shaderName = "Color3D";
	mesh.size = indices.length;

	return mesh;
}


function initCube()
{
	var mesh = {};

	var vertices = [
		// Front face
		-1.0, -1.0,  1.0,
		1.0, -1.0,  1.0,
		1.0,  1.0,  1.0,
		-1.0,  1.0,  1.0,

		// Back face
		-1.0, -1.0, -1.0,
		-1.0,  1.0, -1.0,
		1.0,  1.0, -1.0,
		1.0, -1.0, -1.0,

		// Top face
		-1.0,  1.0, -1.0,
		-1.0,  1.0,  1.0,
		1.0,  1.0,  1.0,
		1.0,  1.0, -1.0,

		// Bottom face
		-1.0, -1.0, -1.0,
		1.0, -1.0, -1.0,
		1.0, -1.0,  1.0,
		-1.0, -1.0,  1.0,

		// Right face
		1.0, -1.0, -1.0,
		1.0,  1.0, -1.0,
		1.0,  1.0,  1.0,
		1.0, -1.0,  1.0,

		// Left face
		-1.0, -1.0, -1.0,
		-1.0, -1.0,  1.0,
		-1.0,  1.0,  1.0,
		-1.0,  1.0, -1.0
			];

	var normals = [	0, 0, 1,
	0, 0, 1,
	0, 0, 1,
	0, 0, 1,

	0, 0, -1,
	0, 0, -1,
	0, 0, -1,
	0, 0, -1,

	0, 1, 0,
	0, 1, 0,
	0, 1, 0,
	0, 1, 0,

	0, -1, 0,
	0, -1, 0,
	0, -1, 0,
	0, -1, 0,

	1, 0, 0,
	1, 0, 0,
	1, 0, 0,
	1, 0, 0,

	-1, 0, 0,
	-1, 0, 0,
	-1, 0, 0,
	-1, 0, 0
		];

	mesh.verticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	mesh.normalsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

	var colors = [
		[1.0,  1.0,  1.0,  1.0],    // Front face: white
		[1.0,  0.0,  0.0,  1.0],    // Back face: red
		[0.0,  1.0,  0.0,  1.0],    // Top face: green
		[0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
		[1.0,  1.0,  0.0,  1.0],    // Right face: yellow
		[1.0,  0.0,  1.0,  1.0]     // Left face: purple
	];

	var generatedColors = [];

	for(j = 0; j < 6; j++)
	{
		var c = colors[j];

		for (var i = 0; i < 4; i++)
		{
			generatedColors = generatedColors.concat(c);
		}
	}

	mesh.colorsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colorsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);

	var indices = [
		0,  1,  2,      0,  2,  3,    // front
		4,  5,  6,      4,  6,  7,    // back
		8,  9,  10,     8,  10, 11,   // top
		12, 13, 14,     12, 14, 15,   // bottom
		16, 17, 18,     16, 18, 19,   // right
		20, 21, 22,     20, 22, 23    // left
	]

	mesh.indicesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indicesBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

	mesh.shaderName = "Color3D";
	mesh.size = 36;

	return mesh;
}



function initTexturedCube()
{
	var mesh = {};

	mesh.verticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.verticesBuffer);
	var vertices = [
		// Front face
		-1.0, -1.0,  1.0,
		1.0, -1.0,  1.0,
		1.0,  1.0,  1.0,
		-1.0,  1.0,  1.0,

		// Back face
		-1.0, -1.0, -1.0,
		-1.0,  1.0, -1.0,
		1.0,  1.0, -1.0,
		1.0, -1.0, -1.0,

		// Top face
		-1.0,  1.0, -1.0,
		-1.0,  1.0,  1.0,
		1.0,  1.0,  1.0,
		1.0,  1.0, -1.0,

		// Bottom face
		-1.0, -1.0, -1.0,
		1.0, -1.0, -1.0,
		1.0, -1.0,  1.0,
		-1.0, -1.0,  1.0,

		// Right face
		1.0, -1.0, -1.0,
		1.0,  1.0, -1.0,
		1.0,  1.0,  1.0,
		1.0, -1.0,  1.0,

		// Left face
		-1.0, -1.0, -1.0,
		-1.0, -1.0,  1.0,
		-1.0,  1.0,  1.0,
		-1.0,  1.0, -1.0
			];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	mesh.textureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.textureCoordBuffer);
	var textureCoords = [
		// Front face
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,

		// Back face
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,
		0.0, 0.0,

		// Top face
		0.0, 1.0,
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,

		// Bottom face
		1.0, 1.0,
		0.0, 1.0,
		0.0, 0.0,
		1.0, 0.0,

		// Right face
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,
		0.0, 0.0,

		// Left face
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,
		];

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);


	var normals = [	0, 0, 1,
	0, 0, 1,
	0, 0, 1,
	0, 0, 1,

	0, 0, -1,
	0, 0, -1,
	0, 0, -1,
	0, 0, -1,

	0, 1, 0,
	0, 1, 0,
	0, 1, 0,
	0, 1, 0,

	0, -1, 0,
	0, -1, 0,
	0, -1, 0,
	0, -1, 0,

	1, 0, 0,
	1, 0, 0,
	1, 0, 0,
	1, 0, 0,

	-1, 0, 0,
	-1, 0, 0,
	-1, 0, 0,
	-1, 0, 0
		];

	var colors = [
		[1.0,  1.0,  1.0,  1.0],    // Front face: white
		[1.0,  0.0,  0.0,  1.0],    // Back face: red
		[0.0,  1.0,  0.0,  1.0],    // Top face: green
		[0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
		[1.0,  1.0,  0.0,  1.0],    // Right face: yellow
		[1.0,  0.0,  1.0,  1.0]     // Left face: purple
	];

	var generatedColors = [];

	for(j = 0; j < 6; j++)
	{
		var c = colors[j];

		for (var i = 0; i < 4; i++)
		{
			generatedColors = generatedColors.concat(c);
		}
	}

	mesh.colorsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colorsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);

	mesh.verticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	mesh.normalsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

	mesh.indicesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indicesBuffer);
	var indices = [
		0, 1, 2,      0, 2, 3,    // Front face
		4, 5, 6,      4, 6, 7,    // Back face
		8, 9, 10,     8, 10, 11,  // Top face
		12, 13, 14,   12, 14, 15, // Bottom face
		16, 17, 18,   16, 18, 19, // Right face
		20, 21, 22,   20, 22, 23  // Left face
	];
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	
	mesh.shaderName = "Texture3D";
	mesh.textureName = "test.png";
	mesh.size = indices.length;

	return mesh;
}
