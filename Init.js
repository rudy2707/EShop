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


function init()
{
	canvas = document.getElementById('webgl');
	gl = getWebGLContext(canvas);

	if(!gl)
	{
		console.log('Failed to get the rendering context for WebGL');
		return;
	}


	gl.enable(gl.DEPTH_TEST);
	gl.clearColor(0.5, 0.5, 0.5, 1.0);
}
