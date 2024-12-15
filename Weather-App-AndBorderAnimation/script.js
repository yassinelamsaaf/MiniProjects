const apiKey = "7392f267f6bd35d85e35b80f3e277143";
const apiURL ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkweather(city){
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    var data = await response.json();

    /*displaying the error msg */

    if(response.status == 404){
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "block"
        document.querySelector(".search input").style.borderColor = "red";

    }
    else{
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + `°C`;
        document.querySelector(".humidity").innerHTML = data.main.humidity + `%`;
        document.querySelector(".wind").innerHTML = data.wind.speed + `km/h`;
    /* changing weather icon */
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src= "images/clouds.png"
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src= "images/clear.png"
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src= "images/rain.png"
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src= "images/drizzle.png"
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src= "images/mist.png"
        }

    /* showing the .weather section when entering a name*/
        document.querySelector(".weather").style.display = "block";
         
        document.querySelector(".error").style.display = "none";
        searchBox.style.borderColor= "transparent";

    }
}

/* adding enter key as a click*/

searchBox.addEventListener("keydown", function(event) {
    // Check if the key pressed is Enter (keyCode 13 or key === 'Enter')
    if (event.key === 'Enter') {
        console.log('Enter key was pressed!');
        // You can add your custom logic here, like submitting a form or triggering a function
        searchBtn.click();  // Simulate button click when Enter is pressed

        /*or just checkweather(searchBox.value); instead */
    }
});


searchBtn.addEventListener("click",() =>{
    checkweather(searchBox.value);
})
    /*Key Features of async Functions:
async Keyword:

Declares a function as asynchronous.
Always returns a Promise, even if the function does not explicitly return one.
await Keyword:

Can only be used inside an async function.
Pauses the execution of the function until the Promise is resolved or rejected.
Makes the code appear synchronous but does not block the main thread.
Parse JSON: Use .json() on the Response object to convert the JSON text
 into a usable JavaScript object. and save it in the data variable
*/


