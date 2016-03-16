function getFileContent(filePath)
{
	var request = new XMLHttpRequest();
	request.open("GET", EShop.baseUrl + 'public/js/shop3d/' + filePath, false);  // `false` makes the request synchronous
	request.send(null);

	if (request.status === 200)
	{
		return request.responseText;
	}
}
