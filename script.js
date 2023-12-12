function logingoogle()  {
  let oauth2endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
  let form = document.createElement('form')
  form.setAttribute('method', 'GET')
  form.setAttribute('action', oauth2endpoint)

  let params = {
      "client_id":"771721932538-tlb9a3ura54gkhgk14iuidfgjogm40af.apps.googleusercontent.com",
      "redirect_uri":"https://www.therealahmed.com/WeatherApp.html",
      "response_type": "token",
      "scope": "https://www.googleapis.com/auth/userinfo.profile",
      "included_granted_scopes":'true',
      'state': 'pass-through-value'
  }

  for(var p in params){
      let input = document.createElement('input')
      input.setAttribute('type','hidden')
      input.setAttribute('name', p)
      input.setAttribute('value', params[p])
      form.appendChild(input)
  }

  document.body.appendChild(form)

  form.submit()
}

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('clock').innerHTML =  h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};
  return i;
}

let weather = {
    apiKey: "4372882d160efff3d6ada47dd487b31e",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%"; 
        "Wind speed: " + speed + " km/h";
      document.body.style.backgroundImage = 
      document.querySelector(".weather").classList.remove("loading");

    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
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
  
  weather.fetchWeather("Leeds");
