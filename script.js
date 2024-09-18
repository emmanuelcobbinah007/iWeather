//1. run a function to get weather data as soon as page loads and store it to an array
//2. set an interval to refresh the array every 15 minutes or something
//3. use the array to update the DOM and display the data the user whats

let weatherData = [];
const searchBtn = document.getElementById('searchBtn');
const searchBar = document.getElementById('searchBar');
let messageArea = document.getElementById('messageArea');

document.addEventListener("DOMContentLoaded", fetchData);
// test function
function test() {
    console.log('test was successful');
}

// function to fetch data
async function fetchData() {
    let res = await fetch ('https://freetestapi.com/api/v1/weathers');
    let data = await res.json();

    for(let i = 0; i < data.length; i++) {
        weatherData.push(data[i]);
    }
    
}

searchBtn.addEventListener('click', search);

//function to display search results
function displaySearchResult () {
    let searchValue = searchBar.value;

    weatherData.forEach((area) => {
        if(area.city == searchValue) {
            let tip;
            let iClass;
            console.log(area.weather_description);

            switch(area.weather_description) {
                case "Rain":
                case "Rain Showers":
                case "Rainy":
                    iClass = "fa-solid fa-cloud-rain icon";
                    tip = "In English, it means grab an umbrella <span>&#9730;</span>";
                    break;
                case "Partly Cloudy": 
                case "Cloudy":
                case "Rainy":
                    iClass = "fa-solid fa-cloud icon";
                    tip = "I'd probably grab a coat if I were you.";
                    break;
                default:
                    iClass = "fa-solid fa-sun icon";
                    tip = "It's nothing serious, you're good to go!";
            }

            let iTag = document.createElement('i');
            iTag.className = iClass;

            let message = document.createElement('p');
            message.textContent = `In ${area.city}, it's ${area.temperature}°C or ${(area.temperature * 9/5) + 32}°F. ${tip}`;

            let favBtn = document.createElement('span');
            favBtn.className = "fa-solid fa-star faveBtn";

            messageArea.appendChild(iTag);
            messageArea.appendChild(message);
            messageArea.appendChild(favBtn);
           

        } 

    })
}

function search() {
    
    if(searchBar.value == "") {
        let message = document.createElement('p');
        message.textContent = `Please fill in the field...`

        messageArea.appendChild(message);

        setTimeout(() => {
            messageArea.textContent = "";
        }, 3000);

    } else {
        if (messageArea.childElementCount == 0) {
            displaySearchResult();

            searchBar.value = "";
        } 
        else {
            messageArea.innerHTML = "";
            displaySearchResult();
        }
    }

    // console.log(weatherData);


    // let comments = [];

    // weatherData.forEach((area) => {
    //     comments.push(area.weather_description);
    //     });

    // console.log(comments);

}












// let's take care of this after we are done with the basic concept
// searchBar.addEventListener("input", search);


// let mappedData = [];
// weatherData.forEach((area) => {
//     mappedData.push(area.city);
// })

// console.log(weatherData);