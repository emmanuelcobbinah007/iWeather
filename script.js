//1. run a function to get weather data as soon as page loads and store it to an array
//2. set an interval to refresh the array every 15 minutes or something
//3. use the array to update the DOM and display the data the user whats

let weatherData = [];
const searchBtn = document.getElementById('searchBtn');
const searchBar = document.getElementById('searchBar');
let messageArea = document.getElementById('messageArea');

document.addEventListener("DOMContentLoaded", fetchData);

function test() {
    console.log('test was successful');
}

async function fetchData() {
    let res = await fetch ('https://freetestapi.com/api/v1/weathers');
    let data = await res.json();

    for(let i = 0; i < data.length; i++) {
        weatherData.push(data[i]);
    }
    
}

console.log(weatherData);

searchBtn.addEventListener('click', search);

function search() {
    let searchValue = searchBar.value;
    weatherData.forEach((area) => {
        if(area.city == searchValue) {
            console.log(area);

            let message = document.createElement('p');
            message.textContent = `In ${area.city}, it's ${area.temperature}°C or ${(area.temperature * 9/5) + 32}°F`;

            messageArea.appendChild(message);

        } 
    })
}












// let's take care of this after we are done with the basic concept
// searchBar.addEventListener("input", search);


// let mappedData = [];
// weatherData.forEach((area) => {
//     mappedData.push(area.city);
// })

// console.log(weatherData);