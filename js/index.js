let navbarBtn = document.querySelector(".navbarBtn");
let boxes = document.querySelector(".boxes");
let search = document.querySelector(".search");
let submitBtn = document.querySelector(".submitBtn");

window.addEventListener("load", function () {
    getData("cairo");
});

var response = {};
search.addEventListener("keyup", function (e) {
    getData(this.value)
});

async function getData(city) {
    let api = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=af7c88a830884a8c9b9131936232102&q=${city}&days=3`);
    let response = await api.json();
    console.log(response);
    display(response);
}

function display(response) {
    const date= new Date(response.forecast.forecastday[0].date);
    const month= date.toString().split(" ")[1];
    const dateNumber= Number(date.toString().split(" ")[2]);
    var box = "";
    box = `
    <div class="weather-box col-lg-4">
    <div class="box-header d-flex justify-content-between align-items-center">
        <div class="today">${response.forecast.forecastday[0].astro.sunrise}</div>
        <div class="date">${dateNumber} ${month}</div>
    </div>
    <div class="box-body p-4 h-100">
        <div class="location fs-5">${response.location.name}</div>
        <div class="temp-degree">
            <div class="degree-num text-white fw-bold mb-3">${response.current.temp_c}°c</div>
            <img src="https:${response.current.condition.icon}" class="ms-3" alt="">
        </div>
        <p class="mb-4 mt-3">${response.current.condition.text}</p>
        <div class="info">
            <span class="me-2">
                <img src="image/icon-umberella.png" class="me-1" alt="">${response.current.pressure_in}
            </span>
            <span class="me-2">
                <img src="image/icon-wind.png" class="me-1" alt="">${response.current.temp_c}
            </span>
            <span class="me-2">
                <img src="image/icon-compass.png" class="me-1" alt="">${response.current.temp_f}
            </span>
        </div>
    </div>
</div>
</div>
    `
    for (let i = 1; i < response.forecast.forecastday.length; i++) {
        box += `
        <div class="weather-box col-lg-4">
            <div class="box-header mx-auto d-flex justify-content-end">
                <div class="date">${dateNumber + i} ${month}</div>
            </div>
            <div class="box-body py-5 mx-auto">
                <div class="icon text-center mt-2 mb-4">
                    <img src="https:${response.forecast.forecastday[i].day.condition.icon}" alt="">
                </div>
                <div class="temp-degree">
                    <div class="min-degree text-center text-white fw-bold">${response.forecast.forecastday[i].day.maxtemp_c}°c</div>
                    <div class="max-degree text-center">${response.forecast.forecastday[i].day.mintemp_c}°c</div>
                </div>
                <p class="text-center mt-3"></p>
            </div>
        </div>
        `
    }
    boxes.innerHTML = box;
}

(function () {
    navbarBtn.addEventListener("click", function () {
        navbarBtn.style.csstext = `
        color: var(--secondary-color) !important;
        border: 1px solid var(--secondary-color);
        padding: 2px 25px !important;
        `
    })
})();
document.forms[0].addEventListener("click", function (eventInfo) {
    eventInfo.preventDefault();
})

