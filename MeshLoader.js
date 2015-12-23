var unhandledPatterns = /^($|#)/;

function getMaterials(meshName)
{
	var mtlFileName = "Meshes/" + meshName;
	var mtlFileLines = getFileContent(mtlFileName).split("\n");

	var materials = [];
	var currentName;

	materials["(null)"] = {Kd:[0.5, 0.5, 0.5, 1.0]};

	for(var i = 0; i < mtlFileLines.length; i++)
	{
		if(unhandledPatterns.exec(mtlFileLines[i]) == null)
		{
			var line = mtlFileLines[i].split(" ");

			if(line[0] == "newmtl")
			{
				currentName = line[1];

				materials[currentName] = {};

			}
			else if(line[0] == "Ns")
			{
				materials[currentName].Ns = parseFloat(line[1]);
			}
			else if(line[0] == "Ka")
			{
				materials[currentName].Ka = [];
				materials[currentName].Ka.push(parseFloat(line[1]));
				materials[currentName].Ka.push(parseFloat(line[2]));
				materials[currentName].Ka.push(parseFloat(line[3]));
			}
			else if(line[0] == "Kd")
			{
				materials[currentName].Kd = [];
				materials[currentName].Kd.push(parseFloat(line[1]));
				materials[currentName].Kd.push(parseFloat(line[2]));
				materials[currentName].Kd.push(parseFloat(line[3]));
				//materials[currentName].Kd.push(1.0);
			}
			else if(line[0] == "Ks")
			{
				materials[currentName].Ks = [];
				materials[currentName].Ks.push(parseFloat(line[1]));
				materials[currentName].Ks.push(parseFloat(line[2]));
				materials[currentName].Ks.push(parseFloat(line[3]));
			}
			else if(line[0] == "Ke")
			{
				materials[currentName].Ke = [];
				materials[currentName].Ke.push(parseFloat(line[1]));
				materials[currentName].Ke.push(parseFloat(line[2]));
				materials[currentName].Ke.push(parseFloat(line[3]));
			}
			else if(line[0] == "Ni")
			{
				materials[currentName].Ni = parseFloat(line[1]);
			}
			else if(line[0] == "d")
			{
				materials[currentName].d = parseFloat(line[1]);
			}
			else if(line[0] == "illum")
			{
				materials[currentName].illum = parseFloat(line[1]);
			}
			else if(line[0] == "map_Kd")
			{
				textures[line[1]] = initTexture(line[1]);
				materials.textureName = line[1];
			}
			else
			{
				console.log("Warning : unhandled parameter : \"" + line[0] + "\" in file \"" + meshName + ".mtl\" on line " + parseInt(i + 1));
			}
		}
	}

	// materials[Name : {Ns, Ka, Kd, Ks, Ke, Ni, d, illum, map_Kd}]
	return materials;
}

function initMeshFromObj(meshName)
{
	this.size = 0;

	var objFileName = "Meshes/" + meshName + ".obj";
	var objFileLines = getFileContent(objFileName).split("\n");

	var materials;

	var tmpVertices = [];
	var tmpUVs = [];
	var tmpNormals = [];

	var iVertices = [];
	var iUVs = [];
	var iNormals = [];

	var vertices = [];
	var colors = [];
	var UVs = [];
	var normals = [];

	var currentMaterial = {};

	for(var i = 0; i < objFileLines.length; i++)
	{

		if(unhandledPatterns.exec(objFileLines[i]) == null)
		{
			var line = objFileLines[i].split(" ");

			if(line[0] == "mtllib")
			{
				materials = getMaterials(line[1]);
			}
			else if(line[0] == "v")
			{
				tmpVertices.push([parseFloat(line[1]), parseFloat(line[2]), parseFloat(line[3])]);
			}
			else if(line[0] == "vn")
			{
				tmpNormals.push([parseFloat(line[1]), parseFloat(line[2]), parseFloat(line[3])]);
			}
			else if(line[0] == "vt")
			{
				tmpUVs.push([parseFloat(line[1]), parseFloat(line[2]), parseFloat(line[3])]);
			}
			else if(line[0] == "usemtl")
			{
				currentMaterial = materials[line[1]];

			}
			else if(line[0] == "f")
			{
				line.shift();

				nData = line.length;

				if(nData == 4)
				{
					var v0 = line[0].split("/");
					var v1 = line[1].split("/");
					var v2 = line[2].split("/");
					var v3 = line[3].split("/");

					vi0 = parseInt(v0[0]) - 1;
					vi1 = parseInt(v1[0]) - 1;
					vi2 = parseInt(v2[0]) - 1;
					vi3 = parseInt(v3[0]) - 1;

					if(tmpUVs.length > 0)
					{
						ui0 = (!isNaN(parseInt(v0[1]))) ? parseInt(v0[1]) - 1 : 0;
						ui1 = (!isNaN(parseInt(v1[1]))) ? parseInt(v1[1]) - 1 : 0;
						ui2 = (!isNaN(parseInt(v2[1]))) ? parseInt(v2[1]) - 1 : 0;
						ui3 = (!isNaN(parseInt(v3[1]))) ? parseInt(v3[1]) - 1 : 0;
						iUVs.push(ui0, ui1, ui2, ui0, ui3, ui2);
					}

					ni0 = parseInt(v0[2]) - 1;
					ni1 = parseInt(v1[2]) - 1;
					ni2 = parseInt(v2[2]) - 1;
					ni3 = parseInt(v3[2]) - 1;

					iVertices.push(vi0, vi1, vi2, vi0, vi3, vi2);
					iNormals.push(ni0, ni1, ni2, ni0, ni3, ni2);

					for(var j = 0; j < 6; j++)
					{
						//colors.push(currentMaterial.Kd[0], currentMaterial.Kd[1], currentMaterial.Kd[2], currentMaterial.Kd[3]);
						colors.push(currentMaterial.Kd[0], currentMaterial.Kd[1], currentMaterial.Kd[2], currentMaterial.d);
					}
				}
				else
				{
					var v0 = line[0].split("/");
					var v1 = line[1].split("/");
					var v2 = line[2].split("/");

					vi0 = parseInt(v0[0]) - 1;
					vi1 = parseInt(v1[0]) - 1;
					vi2 = parseInt(v2[0]) - 1;

					if(tmpUVs.length > 0)
					{
						ui0 = (!isNaN(parseInt(v0[1]))) ? parseInt(v0[1]) - 1 : 0;
						ui1 = (!isNaN(parseInt(v1[1]))) ? parseInt(v1[1]) - 1 : 0;
						ui2 = (!isNaN(parseInt(v2[1]))) ? parseInt(v2[1]) - 1 : 0;
						iUVs.push(ui0, ui1, ui2);
					}

					ni0 = parseInt(v0[2]) - 1;
					ni1 = parseInt(v1[2]) - 1;
					ni2 = parseInt(v2[2]) - 1;

					iVertices.push(vi0, vi1, vi2);
					iNormals.push(ni0, ni1, ni2);

					for(var j = 0; j < 3; j++)
					{	
						colors.push(currentMaterial.Kd[0], currentMaterial.Kd[1], currentMaterial.Kd[2], currentMaterial.Kd[3]);
					}
				}
			}
			else
			{
				console.log("Warning : unhandled parameter : \"" + line[0] + "\" in file \"" + meshName + ".obj\" on line " + parseInt(i + 1));
			}
		}
	}


	for(var i = 0; i < iVertices.length; i++)
	{
		vertices.push(tmpVertices[iVertices[i]][0]);
		vertices.push(tmpVertices[iVertices[i]][1]);
		vertices.push(tmpVertices[iVertices[i]][2]);
		this.size++;
	}

	for(var i = 0; i < iNormals.length; i++)
	{
		normals.push(tmpNormals[iNormals[i]][0]);
		normals.push(tmpNormals[iNormals[i]][1]);
		normals.push(tmpNormals[iNormals[i]][2]);
	}

	if(iUVs.length > 0)
	{
		for(var i = 0; i < iUVs.length; i++)
		{
			UVs.push(tmpUVs[iUVs[i]][0]);
			UVs.push(tmpUVs[iUVs[i]][1]);
		}

		this.shaderName = "Texture3D";
		this.textureName = materials.textureName;
	}
	else
	{
		this.shaderName = "Color3D";
	}

	this.verticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	this.colorsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.colorsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

	this.textureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(UVs), gl.STATIC_DRAW);

	this.normalsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);



	this.draw = function(projection, view, model)
	{

		//model.setRotate(angle, 0, 1, 0);

		/*if(angle %2)
		  model.translate(3.0, 0.0, 0.0);*/

		/*model.invert();
		  model.transpose();*/

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

		var in_Normal = gl.getAttribLocation(shaders[this.shaderName], "in_Normal");
		if(in_Normal >= 0)
		{	
			gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer);
			gl.enableVertexAttribArray(in_Normal);
			gl.vertexAttribPointer(in_Normal, 3, gl.FLOAT, false, 0, 0);
		}

		var in_Color = gl.getAttribLocation(shaders[this.shaderName], "in_Color");
		if(in_Color >= 0)
		{
			gl.bindBuffer(gl.ARRAY_BUFFER, this.colorsBuffer);
			gl.enableVertexAttribArray(in_Color);
			gl.vertexAttribPointer(in_Color, 4, gl.FLOAT, false, 0, 0);
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

		gl.drawArrays(gl.TRIANGLES, 0, this.size);
	}
} 
