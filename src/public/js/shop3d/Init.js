// Initialization of browserproof mouse-grabbing 
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

	function lockChangeAlert()
	{
		if(document.pointerLockElement === canvas || document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas)
		{
			document.addEventListener("mousemove", mouseFunction, false);
		}
		else
		{
			document.removeEventListener("mousemove", mouseFunction, false);
		}
	}
	
	mouseFunction = function(e)
	{
		var relX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
		var relY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

		inputs.relX = relX
		inputs.relY = relY;
	}
}

// Parsing URL parameters
function getParameters()
{
	var query = window.location.search.substring(1);
	var parameters = {};
	
	if(query != "")
	{
		var params = query.split("&");

		for(var i = 0; i < params.length; i++)
		{
			var pair = params[i].split('=');
			parameters[pair[0]] = pair[1];		
		}
	}

	return parameters;
}

// Init 3D context from canvas
function initGL()
{
	canvas = document.getElementById('webgl');
	gl = getWebGLContext(canvas);
	httpParams = getParameters();

	if(!gl)
	{
		console.log('Failed to get the rendering context for WebGL');
		return;
	}

	// Init shaders
	shaders["Skybox"] = new Shader("Skybox");
	shaders["Color3D"] = new Shader("Color3D");
	shaders["Texture3D"] = new Shader("Texture3D");
	shaders["ColorPicking"] = new Shader("ColorPicking");

	// Init controls
	//initWindowCapture();
	inputs = new Inputs(httpParams["keys"]);

	// Define GL options
	gl.enable(gl.DEPTH_TEST);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
}
