function getFileContent(filePath)
{
	console.log(filePath);
	var request = new XMLHttpRequest();
	request.open("GET", EShop.baseUrl + 'public/js/shop3d/' + filePath, false);  // `false` makes the request synchronous
	request.send(null);

	if (request.status === 200)
	{
		console.log(request.responseText);
		return request.responseText;
	}
}
