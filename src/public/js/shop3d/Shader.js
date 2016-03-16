function Shader(shaderName)
{
	// Get source codes from file name
	var vShaderSource = getFileContent("Shaders/" + shaderName + ".vert");
	var fShaderSource = getFileContent("Shaders/" + shaderName + ".frag");

	// Compile vertex shader
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, vShaderSource);
	gl.compileShader(vertexShader);

	if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
	{
		console.log("Failed to compile vertex shader");
		return;
	}

	// Compile fragment shader
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fShaderSource);
	gl.compileShader(fragmentShader);

	if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
	{
		console.log("Failed to compile fragment shader");
		return;
	}

	// Create program from both shaders
	this.shaderProgram = gl.createProgram();
	gl.attachShader(this.shaderProgram, vertexShader);
	gl.attachShader(this.shaderProgram, fragmentShader);
	gl.linkProgram(this.shaderProgram);

	if(!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS))
	{
		console.log("Failed to link shader program");
		return;
	}


	// Uniform linking method for 4D matrix
	this.sendMat4 = function(name, matrix)
	{
		var location = gl.getUniformLocation(this.shaderProgram, name);
		if(!location)
		{
			console.log("Failed to get the storage location of " + name);
			return;
		}

		gl.uniformMatrix4fv(location, false, matrix.elements);
	}

	// Uniform linking method for 3D vector
	this.sendVec3 = function(name, vector)
	{
		var location = gl.getUniformLocation(this.shaderProgram, name);
		if(!location)
		{
			console.log("Failed to get the storage location of " + name);
			return;
		}

		gl.uniform3fv(location, vector);
	}

	// Uniform linking method for float
	this.sendFloat = function(name, value)
	{
		var location = gl.getUniformLocation(this.shaderProgram, name);
		if(!location)
		{
			console.log("Failed to get the storage location of " + name);
			return;
		}

		gl.uniform1f(location, value);
	}

	// Uniform linking method for integer
	this.sendInt = function(name, value)
	{
		var location = gl.getUniformLocation(this.shaderProgram, name);
		if(!location)
		{
			console.log("Failed to get the storage location of " + name);
			return;
		}

		gl.uniform1i(location, value);
	}
}
