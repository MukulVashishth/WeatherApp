let weather = {
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        config.apikey
    )
      .then((response) => {
        if(response.ok) return response.json(); 
        else throw new Error("Status code error :" + response.status)
    })
      .then((data) => this.displayWeather(data))
      .catch(error => console.log(error));
  },

  displayWeather: function (data) {
    if (data.cod == "200") {
      showWeather(data);
    } else {
      noCityFound(data);
    }
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

//Making the search bar work
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Noida");

function showWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  // console.log(name, description, icon, temp, humidity, speed);
  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".temp").innerText = Math.floor(temp) + "°C";
  document.querySelector(".icon").src =
    "http://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".description").innerText = description;
  document.querySelector(".wind").innerText = "Wind Speed " + speed + " km/h";
  document.querySelector(".weather").classList.remove("loading");
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + description + "')";
  document.querySelector(".temp").style.position = "relative";
  document.querySelector(".temp").style.visibility = "visible";
  document.querySelector(".humidity").style.position = "relative";
  document.querySelector(".humidity").style.visibility = "visible";
  document.querySelector(".wind").style.position = "relative";
  document.querySelector(".wind").style.visibility = "visible";
  document.querySelector(".flex").style.visibility = "visible ";
}

function noCityFound(data) {
  document.querySelector(".city").innerHTML = "City not found";
  document.querySelector(".temp").style.position = "absolute";
  document.querySelector(".temp").style.visibility = "hidden";
  document.querySelector(".humidity").style.position = "absolute";
  document.querySelector(".humidity").style.visibility = "hidden";
  document.querySelector(".wind").style.position = "absolute";
  document.querySelector(".wind").style.visibility = "hidden";
  document.querySelector(".flex").style.visibility = "hidden";
}
