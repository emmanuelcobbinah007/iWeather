//1. run a function to get weather data as soon as page loads and store it to an array
//2. set an interval to refresh the array every 15 minutes or something
//3. use the array to update the DOM and display the data the user whats

let weatherData = [];
const searchBtn = document.getElementById('searchBtn');
const searchBar = document.getElementById('searchBar');
const scrollArea = document.getElementById('scrollArea');
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

            // function to add favorites
            favBtn.addEventListener('click', () => {
                let li = document.createElement('li');
                li.className = "favLocay";
            
                // close button
                let iTag = document.createElement('i');
                iTag.className = "fa-solid fa-xmark closeBtn";

                iTag.addEventListener('click', (e) => {
                    e.target.parentElement.remove();
                })

                // city
                let h4 = document.createElement('h4');
                h4.textContent = area.city;
            
                // temperature
                let p = document.createElement('p');
                p.textContent = `${area.temperature}°C`;

                // quick tip

                switch(area.weather_description) {
                    case "Rain":
                    case "Rain Showers":
                    case "Rainy":
                        iclass = "fa-solid fa-cloud-rain";
                        tip2 = "Grab an umbrella <span>&#9730;</span>";
                        break;
                    case "Partly Cloudy": 
                    case "Cloudy":
                    case "Rainy":
                        iclass = "fa-solid fa-cloud";
                        tip2 = "You'd probably need a coat";
                        break;
                    default:
                        iclass = "fa-solid fa-sun";
                        tip2 = "Nothing to worry about";
                }

                let p2 = document.createElement('p');
                p2.textContent = tip2;

                // iTag
                let itag = document.createElement('i');
                itag.className = iclass;

                
                li.appendChild(iTag);
                li.appendChild(h4);
                li.appendChild(p);
                li.appendChild(p2);
                li.appendChild(itag);
            
                scrollArea.appendChild(li);
            });

            messageArea.appendChild(iTag);
            messageArea.appendChild(message);
            messageArea.appendChild(favBtn);
           

        } 

    })

    searchBar.value = "";
}

// search function
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

        } 
        else {
            messageArea.innerHTML = "";
            displaySearchResult();
        }
    }

}












// let's take care of this after we are done with the basic concept
// searchBar.addEventListener("input", search);


// let mappedData = [];
// weatherData.forEach((area) => {
//     mappedData.push(area.city);
// })

// console.log(weatherData);