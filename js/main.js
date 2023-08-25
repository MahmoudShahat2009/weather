let toDayName = document.getElementById("dayName")
let toNumberDay = document.getElementById("numDay")
let toDayMonth = document.getElementById("month")
let toLocation = document.getElementById("location")
let toTemperature = document.getElementById("temp")
let toCondationImg = document.getElementById("condation-img")
let toCondationText = document.getElementById("condation-text")
let toHumidity = document.getElementById("humidity")
let toWind = document.getElementById("wind")
let toWindDiraction = document.getElementById("wind-diraction")

// next days data 

let nextDay =document.getElementsByClassName("next-day")
let imgcondation =document.getElementsByClassName("img-condation")
let tempUp =document.getElementsByClassName("temp-up")
let tempDown =document.getElementsByClassName("temp-down")
let textCondation =document.getElementsByClassName("text-condation")

let searchCity =document.getElementById("search-input")


 async function getCurntWeather(cityName) 
{
   let weatherResponse= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6d321aef36134c0b91a201741231508&q=${cityName}&days=3`) 
   let weatherData = await weatherResponse.json()
   return weatherData
}
 



// dispaly function today
function displyToDayData(data) 
{
    let toDayDate = new Date()
    toDayName.innerHTML= toDayDate.toLocaleDateString("en-us",{weekday:"long"})
    toNumberDay.innerHTML = toDayDate.getDate()
    toDayMonth.innerHTML = toDayDate.toLocaleDateString("en-us",{month:"long"}  )
    toLocation.innerHTML = data.location.name
    toTemperature.innerHTML = data.current.temp_c
    const icon = data.current.condition.icon;
    toCondationImg.setAttribute("src" ,icon)
    toCondationText.innerHTML = data.current.condition.text
    toHumidity.innerHTML = data.current.humidity
    toWind.innerHTML = data.current.wind_kph
    toWindDiraction.innerHTML = data.current.wind_dir   
}


// dispaly function next day 
function displayNextDays(data)
{
    let forecastData = data.forecast.forecastday 
console.log(forecastData);
    for (let i = 0; i < 2; i++) {
        let nextdate = new Date(forecastData[i+1].date)
        console.log(nextdate);
        nextDay[i].innerHTML =nextdate.toLocaleDateString("en-us",{ weekday:"long"})
        tempUp[i].innerHTML=forecastData[i+1].day.maxtemp_c
        tempDown[i].innerHTML=forecastData[i+1].day.mintemp_c
        imgcondation[i].setAttribute("src", forecastData[i+1].day.condition.icon)
        textCondation[i].innerHTML=forecastData[i+1].day.condition.text
        
    }
}
// 
// function alldays(data) {


//     data.forecast.forecastday.forEach(element => {
//         console.log(element);
//     const date = new Date(element.date )
//     let curd = `
//     <div class="col-lg-4 p-2  ">
//                     <div class="h-100 contant-box">
//                         <div class=" d-flex justify-content-between text-white ">
//                             <h3 id="dayName">${date.toLocaleDateString("en-us",{ weekday:"long"})}</h3>
//                             <div>
//                                 <span id="numDay">${date.getDate()}</span>
//                                 <span id="month">${date.toLocaleDateString("en-us",{month:"long"})}</span>
//                             </div>
//                         </div>
//                         <div class="  p-3 ">
//                             <h3 id="location" class="text-white">${data.location.name}</h3>
//                             <div class="d-flex justify-content-between align-items-center">
//                                 <span class="fs-1 fw-bolder text-white">
//                                     <span id="temp">${element.day.avgtemp_c}</span>
//                                     <span><sup>o</sup> C</span>
//                                 </span>
//                                 <img id="condation-img" src=${element.day.condition.icon} alt="" />
//                             </div>
//                             <p id="condation-text" class="text-white"></p>
//                             <div class="item-footer d-flex text-light p-3">
//                                 <div class="d-flex me-3">
//                                     <img src="images/icon-umberella.png" class="footer-icons me-2" alt="" />
//                                     <p id="humidity">${data.current.humidity}</p>
//                                 </div>
//                                 <div class="d-flex me-3">
//                                     <img src="images/icon-wind.png" class="footer-icons mx-2" alt="" />
//                                     <p id="wind">30 km/h</p>
//                                 </div>
//                                 <div class="d-flex">
//                                     <img src="images/icon-compass.png" class="footer-icons mx-2" alt="" />
//                                     <p id="wind-diraction">NNE</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                 </div>

//                 `
//                 document.getElementById("wraper").innerHTML +=curd
//                 curd = ""
// });   

// }




// start app 
async function startApp(city= "cairo") 
{
     let weatherData = await getCurntWeather(city)
     
     displyToDayData(weatherData)    
     displayNextDays(weatherData)
    //  alldays(weatherData)

}
startApp() 

searchCity.addEventListener("input", function () {
    startApp(searchCity.value) 
} )

