/* Global Variables */

//Weather App Url
const WAppUrl = "https://api.openweathermap.org/data/2.5/weather";

// Personal API Key for OpenWeatherMap API
const apiKey = "72132fbf3b18daf64ff9e03dc31d71e7";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Adding Event listener  to the DOM element
document.getElementById("generate").addEventListener("click", (e) => {
  e.preventDefault();
  //getting user Data
  const zipCode = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;
  if (zipCode == "") {
    alert("The zip code is invalid. Try again");
  } else {
    //calling weatherData function
    weatherData(WAppUrl, zipCode, apiKey)
      .then((newUserData) => {
        // add data to POST request
        postData("/add", {
          date: newDate,
          temp: newUserData.main.temp,
          content,
        });
      })
      .then(
        (updateUI = async () => {
          // call updateUI to update browser content
          const request = await fetch("/all");
          try {
            const newData = await request.json();

            // update new user entry values
            document.getElementById("date").innerHTML = newData.date;
            document.getElementById("temp").innerHTML = newData.temp;
            document.getElementById("content").innerHTML = newData.content;
          } catch (e) {
            console.error("error", e);
          }
        })
      );
  }
});

/* Function to GET Web API information*/
const weatherData = async (WAppUrl, zipCode, apiKey) => {
  // res equals to the result of fetch function
  const res = await fetch(
    `${WAppUrl}?q=${zipCode}&appid=${apiKey}&units=metric`
  );
  try {
    // newUserData equals to the result of fetch function
    const newUserData = await res.json();
    return newUserData;
  } catch (e) {
    console.error("error", e);
  }
};

/* Function to POST data */
const postData = async (url, data) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content,
    }),
  });

  try {
    const newData = await req.json();
    return newData;
  } catch (e) {
    console.error(e);
  }
};
