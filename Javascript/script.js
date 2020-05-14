$(document).ready(function(){

    var apiKey = "e6fa0c5b42fe538073be8986ef03ec51";
    var cityID = ""
    // Created an Empty Array for Favorite Cities
    var favArray = [];
    // Set todays date for Current Weather 
    var todaysDate = moment().format("LLLL");
    $("#todaysDate").text(todaysDate);



  //var queryURL= "https://api.openweathermap.org/data/2.5/forecast?id" + cityID + "&appid=" + apiKey;

  //Creating a button
    $('.button').on("Click", function(){
        var citySearch = JSON.parse(localStorage.getItem("searchCities"))
        $('#Fav-City').empty()

        if(citySearch === null){
        return
        }else{
            citySearch.forEach(function(City, Index){
            var buttonInfo = $("<input>").attr({
                type: "button",
                value: city,
                idenfifier: index,
                class: "row col-md-10 city-btn btn btn-dark"
            })
        })
    
    
    
    } 
    
    //5 Day Weather Forecast

    function fiveDay(){
        var forecast = $('#fiveDayForecast')
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + apiKey;
        $('#fiveDayForecast').empty()

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response){
            for (var i = 7; i <= 40; i+=8)  {
                var futureDates = moment(responseFF.list[i].dt_txt).format("MM/DD/YYYY");;
                    console.log(futureDates)
                    cardDiv = $("<div>");
                    cardDiv.addClass("col col-5-day mx-1")
                    cardBody = $("<div>");
                    cardBody.addClass("card-body forecast-card");
                    cardTitle = $("<h5>").text(futureDates)
                    
                    cardDiv.append(cardBody);
                    cardBody.append(cardTitle);
            }
                })

    //Current Weather
    function currentWeather(){
     var queryURL="https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response){

        })
    
    };
    //UV Index
    function uvIndex(){
    var uvQueryURL="https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;
    
    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response){

        })
    
    };

    function renderCity(){
    var queryURL

    $.ajax({
        url: queryURL,
        method: "GET"
    
    })
    
    }

})