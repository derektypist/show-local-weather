let tempUnit = 'C';
let currentTempInCelsius;

$(document).ready(function()
{
  navigator.geolocation.getCurrentPosition(getWeatherInfo);

// Function to Get Weather Information
function getWeatherInfo(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  
  $.ajax(
  {
    url: `https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`,
    success: function(weather) {
      $('#city').text(weather.name + ', ');
      $('#country').text(weather.sys.country);
      currentTempInCelsius = Math.round(weather.main.temp * 10) / 10;
      $('#temperature').html(currentTempInCelsius + ' &deg;');
      $('#tempunit').text(tempUnit);
      $('.weather-icon').html('<img src=' + weather.weather[0].icon + 'alt="Your local weather icon">');
      let sunrise = new Date(weather.sys.sunrise * 1000);
      $('#sunrise').text(sunrise.toTimeString().substring(0,5) + ' am');
      let sunset = new Date(weather.sys.sunset * 1000);
                  $('#sunset').text(sunset.toTimeString().substring(0,5) + ' pm');
      console.log(latitude,longitude);
      console.log(weather);    
    }
  });
  
  // Toggle between deg C and deg F
  $('.temp-toggle').click(function() {
    let currentTemperatureUnit = $('#tempunit').text();
    let myNewTemperatureUnit = currentTemperatureUnit === 'C' ? 'F' : 'C';
      $('#tempunit').text(myNewTemperatureUnit);
    if (myNewTemperatureUnit==='F') {
      $('#temperature').html(Math.round(currentTempInCelsius * 1.8 + 32) + ' &deg;');
    } else {
      $('#temperature').html(currentTempInCelsius + '&deg;');
    }
  });
}
});