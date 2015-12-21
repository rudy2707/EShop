function initTexture(imageName)
{
	var texture = {};
	texture.glTex = gl.createTexture();
	texture.image = new Image();
	
	texture.image.onload = function()
	{
		handleLoadedTexture(texture);
	}

	texture.image.onerror = function(e)
	{
		console.log("error happened while loading texture : \"" + texture.image.src + "\"");
	}

	texture.image.src = "Textures/" + imageName;

	return texture;
}

function handleLoadedTexture(texture)
{
	gl.bindTexture(gl.TEXTURE_2D, texture.glTex);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.bindTexture(gl.TEXTURE_2D, null);
}
