

fetch('https://swapi.co/api/people/1/')
	.then((res) => {
		console.log('Got Response', res.status);
		return res.json();
	})
	.then((body) => {
		console.log(body);
	});

// review
const getResource = async (url) => {
	const res = await fetch(url);
	console.log('Got Response', res.status);
	const body = await res.json();
	return body;
};

getResource('https://swapi.co/api/people/1/')
	.then((body) => {
		console.log(body);
	});