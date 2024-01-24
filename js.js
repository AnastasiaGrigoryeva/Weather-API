const apiKey = '6fa27a974ef00b1354fcc815c71ba423';
const cities = ['Oslo', 'Paris', 'London']

function getFormattedDate(date) {
  let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let dayOfWeek = daysOfWeek[date.getDay()];
  let day = date.getDate();
  let month = date.getMonth() + 1; // Месяцы начинаются с 0
  let year = date.getFullYear();
  day = day < 10 ? '0' + day : day;
  month = month < 10 ? '0' + month : month;
  return dayOfWeek + ' / ' + day + '.' + month + '.' + year ;
}
function getNextThreeDates() {
  let today = new Date();
  let nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);
  let dayAfterNext = new Date(today);
  dayAfterNext.setDate(today.getDate() + 2);
  let thirdDay = new Date(today);
  thirdDay.setDate(today.getDate() + 3);

  let formattedToday = getFormattedDate(today);
  let formattedNextDay = getFormattedDate(nextDay);
  let formattedDayAfterNext = getFormattedDate(dayAfterNext);
  let formattedThirdDay = getFormattedDate(thirdDay);

  document.querySelector('.label.today').innerHTML = formattedToday;
  document.querySelector('.label.tomorrow').innerHTML = formattedNextDay;
  document.querySelector('.label.after-tomorrow').innerHTML = formattedDayAfterNext;
  document.querySelector('.label.after-after-tomorrow').innerHTML = formattedThirdDay;
}

getNextThreeDates();
function success (position) {
    let latitude  = position.coords.latitude;
    let longitude = position.coords.longitude;
    let coords = [Math.round(latitude),Math.round(longitude)]

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    .then(function(resp) { return resp.json() })
    .then(function (data){
      document.querySelector('.param.city-weather.now').textContent=data.name;
      document.querySelector('.param.land-weather.now').textContent= ',  ' + data.sys.country;
      document.querySelector('.param.degree-weather.now').innerHTML= Math.round(data.main.temp - 273)+'&deg';
      document.querySelector('.param.cloud-weather.now').innerHTML= Math.round(data.wind.speed)+' m/s';
      document.querySelector('.param.type.now').innerHTML= data.weather[0]['main'].toLowerCase();
      document.querySelector('.param.humidity.now').innerHTML= Math.round(data.main.humidity)+'%';
      document.querySelector('.param.pressure.now').innerHTML= Math.round(data.main.pressure);
    })
    .catch(function (e) {
     console.error(e)
    })

    fetch(`https:/api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    .then(function(resp) { return resp.json(); })
    .then(data => {
      document.querySelector(`.future-param.tomorrow.temp`).innerHTML = Math.round(data.list[0]['main']['temp'] - 273) +'&deg';
      document.querySelector(`.future-param.tomorrow.condition`).textContent = data.list[0]['weather'][0]['main'].toLowerCase();
      document.querySelector(`.future-param.after-tomorrow.temp`).innerHTML = Math.round(data.list[1]['main']['temp'] - 273) +'&deg';
      document.querySelector(`.future-param.after-tomorrow.condition`).textContent = data.list[1]['weather'][0]['main'].toLowerCase();
      document.querySelector(`.future-param.after-after-tomorrow.temp`).innerHTML = Math.round(data.list[2]['main']['temp'] - 273) +'&deg';
      document.querySelector(`.future-param.after-after-tomorrow.condition`).textContent = data.list[2]['weather'][0]['main'].toLowerCase();
    })
    .catch(function (e) {
      console.error(e)
     })
}

cities.forEach(city => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const cityClass = city.toLowerCase();
      document.querySelector(`.param.city-weather.${cityClass}`).textContent = data.city.name;
      document.querySelector(`.param.degree-weather.${cityClass}`).innerHTML = Math.round(data.list[0].main.temp - 273) + '&deg';
      document.querySelector(`.param.cloud-weather.${cityClass}`).innerHTML = data.list[0].weather[0].description;
      document.querySelector(`.param.wind.${cityClass}`).innerHTML = Math.round(data.list[0].wind.speed)+' m/s';
      document.querySelector(`.param.humidity.${cityClass}`).innerHTML = data.list[0].main.humidity +'%';
      document.querySelector(`.param.pressure.${cityClass}`).innerHTML = data.list[0].main.pressure;
    })
    .catch(error => console.error(error));
});
window.addEventListener('load', () => {
    
    if (!navigator.geolocation) {
      console.log('ошибка')
    } else {
        console.log(success)
        navigator.geolocation.getCurrentPosition(success)
    }
});
getNextThreeDates()

const toggleButtons = document.querySelectorAll('.s5-btn');

toggleButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const targetId = event.currentTarget.getAttribute('data-target');
    const targetElement = document.querySelector(targetId);
    targetElement.classList.toggle('active');
    button.classList.toggle('clicked');t
  });
});
