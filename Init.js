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

function initWindowCapture()
{
	canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;

	document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock; 

	canvas.onclick = function()
	{
		canvas.requestPointerLock()
	}
	
	document.addEventListener('pointerlockchange', lockChangeAlert, false);
	document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
	document.addEventListener('webkitpointerlockchange', lockChangeAlert, false);

	function getMouseMoves(mouse)
	{
		inputs.updateMouse(mouse);
	}
	
	function lockChangeAlert()
	{
		if(document.pointerLockElement === canvas || document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas)
		{
			console.log('The pointer lock status is now locked');
			document.addEventListener("mousemove", mouseFunction, false);
		}
		else
		{
			document.removeEventListener("mousemove", mouseFunction, false);
			console.log('The pointer lock status is now unlocked');
		}
	}
	
	mouseFunction = function(e)
	{
		var relX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
		var relY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

		inputs.updateMouse(relX, relY);
	}
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


	initWindowCapture();



	gl.enable(gl.DEPTH_TEST);
	gl.clearColor(0.5, 0.5, 0.5, 1.0);
}
