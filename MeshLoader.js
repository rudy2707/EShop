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
				materials[currentName].Kd.push(1.0);
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
	console.log(materials)
	return materials;
}

function initMeshFromObj(meshName)
{
	var mesh = {};
	mesh.size = 0;

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
	//var indices = [];

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
						colors.push(currentMaterial.Kd[0], currentMaterial.Kd[1], currentMaterial.Kd[2], currentMaterial.Kd[3]);
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
		//indices.push(i);
		mesh.size++;
	}

	for(var i = 0; i < iNormals.length; i++)
	{
		normals.push(tmpNormals[iNormals[i]][0]);
		normals.push(tmpNormals[iNormals[i]][1]);
		normals.push(tmpNormals[iNormals[i]][2]);
	}

	if(iUVs.length > 0)
	{
		//console.log(iUVs.length)
		for(var i = 0; i < iUVs.length; i++)
		{
			UVs.push(tmpUVs[iUVs[i]][0]);
			UVs.push(tmpUVs[iUVs[i]][1]);
		}

		mesh.shaderName = "Texture3D";
		mesh.textureName = materials.textureName;
		console.log(materials)
	}
	else
	{
		mesh.shaderName = "Color3D";
	}

	mesh.verticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	mesh.colorsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colorsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

	mesh.textureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.textureCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(UVs), gl.STATIC_DRAW);

	mesh.normalsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

	/*mesh.indicesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indicesBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	console.log(new Uint16Array(indices));*/


	//mesh.size = indices.length;

	return mesh;
} 
