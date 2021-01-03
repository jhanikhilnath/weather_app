let apiKey = '9e9caaea918d4c59834100604201712';
let ipLink = 'https://api64.ipify.org/?format=json';
let weatherLink = 'https://api.weatherapi.com/v1/forecast.json?key=';
let astroLink = 'https://api.weatherapi.com/v1/astronomy.json?key=';
weatherLink += apiKey + '&q=';
astroLink += apiKey + '&q=';
let cel = '°C';


// Main Kickstarter
fetch(ipLink)
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		weatherLink += data.ip;
		astroLink += data.ip;
		console.log(astroLink);
		getWeather(weatherLink);
		getAstro();
	});

/// End of Main Kickstarter


console.log(weatherLink);

function getAstro() {
	// console.log(astroLink);
	fetch(astroLink)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			document.querySelector(
				'.sun p',
			).textContent = `${data.astronomy.astro.sunrise} / ${data.astronomy.astro.sunset}`;
			document.querySelector(
				'.moon p',
			).textContent = `${data.astronomy.astro.moonrise} / ${data.astronomy.astro.moonset}`;
			document.querySelector('.moon_il p').textContent = data.astronomy.astro.moon_phase;
		});
}

function getWeather(ipthingi) {
	fetch(ipthingi)
		.then(function (e) {
			return e.json();
		})
		.then(function (g) {
			let dateTime = g.location.localtime.split(' ').reverse();
			document.querySelector('.date_time .time').textContent = dateTime[0];
			document.querySelector('.date_time .date').textContent = dateTime[1];
			document.querySelector(
				'.temp p',
			).textContent = `${g.current.temp_c}${cel} / ${g.current.feelslike_c}${cel}`;
			if (g.current.is_day == 1) {
				document.querySelector('i').className = 'fas fa-sun yellow';
			} else if (g.current.is_day == 0) {
				document.querySelector('i').className = 'fas fa-moon';
			}
			document.querySelector('.vis p').textContent = `${g.current.vis_km} km`;
			document.querySelector('.city p').textContent = g.location.name;
			document.querySelector('.country p').textContent = g.location.country;
			document.querySelector('.tmz p').textContent = g.location.tz_id;
			document.querySelector(
				'.wind p',
			).textContent = `${g.current.wind_kph} km / ${g.current.wind_dir}`;
		});
}